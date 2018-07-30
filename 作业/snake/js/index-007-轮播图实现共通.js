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

	/*轮播图代码共通开始*/
	function totalCarousel($elem,thisClass){
		$elem.item = {};
		$elem.totalItemNum =  $elem.find(thisClass).length;
		$elem.loadedItemNum = 0;
		$elem.on('carousel-show',$elem.loadFn = function(ev,index,elem){
			console.log('carousel-show loading...');
			if($elem.item[index] != 'loaded'){
				$elem.trigger('carousel-loadItem',[index,elem])
			}
		});
		$elem.on('carousel-loadItem',function(ev,index,elem){
			console.log(index,'loading...');
			var $imgs = $(elem).find(thisClass);
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
	/*轮播图代码共通结束*/

	/*轮播图开始*/
	var $focusCarousel = $('.focus .carousel-container');

	/*$focusCarousel.on('carousel-show carousel-shown carousel-hide carousel-hidden',function(ev,index,elem){
		console.log(index,ev.type);
	})*/

	/*按需加载的步骤
		1. 确定什么时候加载
		2. 具体的加载
		3. 加载完成的善后
	*/

	/*$focusCarousel.item = {};
	$focusCarousel.totalItemNum =  $focusCarousel.find('img').length;
	$focusCarousel.loadedItemNum = 0;
	
	$focusCarousel.on('carousel-show',$focusCarousel.loadFn = function(ev,index,elem){
		console.log('carousel-show loading...');
		if($focusCarousel.item[index] != 'loaded'){
			$focusCarousel.trigger('carousel-loadItem',[index,elem])
		}
	});

	$focusCarousel.on('carousel-loadItem',function(ev,index,elem){
		console.log(index,'loading...');
		var $img = $(elem).find('img');
		var imgUrl = $img.data('src');
		loadImage(imgUrl,function(url){
			$img.attr('src',url);
		},function(url){
			$img.attr('src','images/focusCarousel/placeholder.png');
		});
		$focusCarousel.item[index] = 'loaded';
		$focusCarousel.loadedItemNum++;
		if($focusCarousel.loadedItemNum == $focusCarousel.totalItemNum){
			$focusCarousel.trigger('carousel-loadedItems')
		}
	});
	
	$focusCarousel.on('carousel-loadedItems',function(){
		$focusCarousel.off('carousel-show',$focusCarousel.loadFn)
	});*/
	totalCarousel($focusCarousel,'img');
	$focusCarousel.carousel({
		mode:'slide',
		activeIndex:0,
		interval:2000
	})
	/*轮播图结束*/

	/*今日商品轮播图开始*/
	var $todaysCarousel = $('.todays .carousel-container');

	/*$todaysCarousel.item = {};
	$todaysCarousel.totalItemNum =  $todaysCarousel.find('.carousel-img').length;
	$todaysCarousel.loadedItemNum = 0;
	
	$todaysCarousel.on('carousel-show',$focusCarousel.loadFn = function(ev,index,elem){
		console.log('carousel-show loading...');
		if($todaysCarousel.item[index] != 'loaded'){
			$todaysCarousel.trigger('carousel-loadItem',[index,elem])
		}
	});

	$todaysCarousel.on('carousel-loadItem',function(ev,index,elem){
		console.log(index,'loading...');
		var $imgs = $(elem).find('.carousel-img');
		$imgs.each(function(){
			var $img = $(this);
			var imgUrl = $img.data('src');
			loadImage(imgUrl,function(url){
				$img.attr('src',url);
			},function(url){
				$img.attr('src','images/todaysCarousel/placeholder.png');
			});
			$todaysCarousel.item[index] = 'loaded';
			$todaysCarousel.loadedItemNum++;
			if($todaysCarousel.loadedItemNum == $todaysCarousel.totalItemNum){
				$todaysCarousel.trigger('carousel-loadedItems')
			}
		})

		$todaysCarousel.on('carousel-loadedItems',function(){
			$todaysCarousel.off('carousel-show',$todaysCarousel.loadFn)
		});
	});*/

	totalCarousel($todaysCarousel,'.carousel-img');

	$todaysCarousel.carousel({
		mode:'slide',
		activeIndex:0,
		// interval:0
	})
	/*今日商品轮播图结束*/

})(jQuery)
