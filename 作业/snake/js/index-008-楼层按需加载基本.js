;(function($){
	function loadHtmlOnce($elem,callback){
		//获取需要请求的地址
		var loadUrl = $elem.data('load');
		//如果页面上没有设置请求地址直接返回
		if(!loadUrl) return;

		var isLoaded = $elem.data('isLoaded');
		//如果已经加载过数据了直接返回
		if(isLoaded) return;
		
		//如果有请求地址,发送请求获取数据
		$.getJSON(loadUrl,function(data){
			console.log('get data ...',data);
			callback($elem,data);
		});
	}

	function loadImage(url,success,error){
		var image = new Image();
		// 当图片加载的时候去网络上获取图片
		image.onload = function(){
			//如果加载成功，就获取轮播图片地址
			if (typeof success == 'function') success(url);
		}

		image.onerror = function(){
			//如果加载不成功，就获取加载不成功显示的图片地址
			if (typeof error == 'function') error(url);
		}

		// 将要轮播的图片的地址
		image.src = url;
	}

	var $menu = $('.nav-site .dropdown');

	$menu.on('dropdown-show',function(ev){
		loadHtmlOnce($(this),buildMenuItem);
	});
	// 构建菜单并加重
	function buildMenuItem($elem,data){
		var html = '';
		for(var i = 0;i<data.length;i++){
			html += '<li><a href="'+data[i].url+'" class="menu-item">'+data[i].name+'</a></li>';
		}
		//模拟网络延时
		setTimeout(function(){ 
			$elem.find('.dropdown-layer').html(html);
			$elem.data('isLoaded',true);
		},1000);
	}

	//传option，用js
	$menu.dropdown({
		css3:false,
		js:true,
		mode:'slideUpDown'
	});
	/*顶部下拉菜单结束*/
	
	/*搜索框*/
	var $search = $('.search');
	$search.search({
		autocomplete:true
	});

	$search
	.on('getData',function(ev,data){
			var $this = $(this);
			var html = createSearchLayer(data,10);	
			// $this.search('appendLayer',html).search('showLayer');
			$this.search('appendLayer',html);
			if (html) {
				$this.search('showLayer')
			}else{
				$this.search('hideLayer')
			}
	})
	.on('getNoData',function(){
		$search.search('appendLayer','').search('hideLayer');
	})
	.on('click','.search-item',function(){
		$search.search('setInputVal',$(this).html());
		$search.search('submit');

	});

	function createSearchLayer(data,maxNum){
		if(data.result.length == 0){
			return '';
		}		
		var html = '';
		for(var i = 0;i<data.result.length;i++){
			if(i>=maxNum) break;
			html += '<li class="search-item">'+data.result[i][0]+'</li>'
		}
		return html;
	}
	/*搜索框结束*/


	/*分类导航开始*/
	var $category = $('.category .dropdown');

	$category.on('dropdown-show',function(ev){
		loadHtmlOnce($(this),buildCategoryItem);
	});
	function buildCategoryItem($elem,data){
		var html = '';
		for(var i = 0; i < data.length; i++){
			html += '<dl class="category-details clearfix"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">';
			for(var j = 0;j<data[i].items.length;j++){
				html += '<a href="#" class="link">'+data[i].items[j]+'</a>'
			}
			html += '</dd></dl>';
		}
		//模拟网络延时
		setTimeout(function(){
			$elem.find('.dropdown-layer').html(html);
			$elem.data('isLoaded',true);
		},1000);
	}

	$category.dropdown({
		css3:false,
		js:true,
		mode:'slideLeftRight'
	});
	/*分类导航结束*/

	/*轮播图按需加载代码共通开始*/
	function carouselImgLoad($elem,imgClass){
		$elem.item = {};
		$elem.totalItemNum =  $elem.find(imgClass).length;
		$elem.loadedItemNum = 0;

		$elem.on('carousel-show',$elem.loadFn = function(ev,index,elem){
			// console.log('carousel-show loading...');
			if($elem.item[index] != 'loaded'){
				$elem.trigger('carousel-loadItem',[index,elem])
			}
		});

		$elem.on('carousel-loadItem',function(ev,index,elem){
			// console.log(index,'loading...');
			var $imgs = $(elem).find(imgClass);
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImage(imgUrl,function(url){
					$img.attr('src',url);
				},function(url){
					$img.attr('src','images/focusCarousel/placeholder.png');
				});
				$elem.item[index] = 'loaded';
				$elem.loadedItemNum++;
				if($elem.loadedItemNum == $elem.totalItemNum){
					$elem.trigger('carousel-loadedItems')
				}
			})
		});

		$elem.on('carousel-loadedItems',function(){
			$elem.off('carousel-show',$elem.loadFn)
		});
	}
	/*轮播图按需加载代码共通结束*/

	/*轮播图开始*/
	var $focusCarousel = $('.focus .carousel-container');
	carouselImgLoad($focusCarousel,'img');
	$focusCarousel.carousel({
		mode:'slide',
		activeIndex:0,
		interval:2000
	})
	/*轮播图结束*/

	/*今日商品轮播图开始*/
	var $todaysCarousel = $('.todays .carousel-container');
	carouselImgLoad($todaysCarousel,'.carousel-img');
	$todaysCarousel.carousel({
		mode:'slide',
		activeIndex:0
		// interval:0
	})
	/*今日商品轮播图结束*/

	/*楼层一开始*/
	var $floor = $('.floor .container');
	//接收 tab.js 函数中的事件 function 中接收三个参数，第一个为系统自带的 ev 事件，第二个为对应面板下标，第三个为对应面板
	$floor.on('tab-show tab-shown tab-hide tab-hidden',function(ev,index,elem){
		// console.log(index,elem,ev.type);
	})

	/*楼层图按需加载代码共通开始*/
	function floorImgLoad($elem,imgClass){
		$elem.item = {};
		$elem.totalItemNum =  $elem.find(imgClass).length;
		$elem.loadedItemNum = 0;

		$elem.on('tab-show',$elem.loadFn = function(ev,index,elem){
			// console.log('tab-show loading...');
			if($elem.item[index] != 'loaded'){
				$elem.trigger('tab-loadItem',[index,elem])
			}
		});

		$elem.on('tab-loadItem',function(ev,index,elem){
			// console.log(index,'loading...');
			var $imgs = $(elem).find(imgClass);
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImage(imgUrl,function(url){
					$img.attr('src',url);
				},function(url){
					$img.attr('src','images/focusCarousel/placeholder.png');
				});
				$elem.item[index] = 'loaded';
				$elem.loadedItemNum++;
				if($elem.loadedItemNum == $elem.totalItemNum){
					$elem.trigger('tab-loadedItems')
				}
			})
		});

		$elem.on('tab-loadedItems',function(){
			$elem.off('tab-show',$elem.loadFn)
		});
	}
	/*楼层图按需加载代码共通结束*/

	floorImgLoad($floor,'.floor-img');
	// 楼层选项卡
	$floor.tab({
		css3:false,
		js:false,
		mode:'fade',
		activeIndex:0,
		eventName:'mouseenter',
		interval:0,
		delay:0
	})
	/*楼层一结束*/

})(jQuery)
