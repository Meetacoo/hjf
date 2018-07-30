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
	};

	//获取数据一次
	function getDataOnce($elem,url,callBack){
		var data = $elem.data(url);
		if(!data){
			$.getJSON(url,function(resData){
				$elem.data(url,resData);
				callBack(resData);
			})
		}else{
			callBack(data);
		}
	};

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
	//加载多张图片
	function loadImages($imgs,success,error){
		$imgs.each(function(){
			var $img = $(this);
			var imgUrl = $img.data('src');
			loadImage(imgUrl,function(imgUrl){
				$img.attr('src',imgUrl); 
				success();
				/*success($img,imgUrl);*/
			},function(imgUrl){
				error($img,imgUrl);
			});
		})
	}

	//懒加载
	/*
	懒加载参数实例
	options = {
		totalItemNum:5
		$elem:$elem,
		eventName:'tab-show',
		eventPrefix:'tab'
	}
	*/
	function lazyLoad(options){
		var item = {},// 判断元素是否加载过
		    totalItemNum =  options.totalItemNum,// 总共需要加载的项目
			loadedItemNum = 0,
			loadFn = null,
			$elem = options.$elem,
			eventName = options.eventName,
			eventPrefix = options.eventPrefix;
		
		$elem.on(eventName,loadFn = function(ev,index,elem){//确定加载时机
			if(item[index] != 'loaded'){//具体加载 
				// []传一个数组，数组中有一个回调函数，就是 success();
				$elem.trigger(eventPrefix+'-loadItem',[index,elem,function(){
					item[index] = 'loaded';
					loadedItemNum++;
					if(loadedItemNum == totalItemNum){//整个加载结束
						$elem.trigger(eventPrefix+'-loadedItems')
					}
				}])
			}
		});

		// 整个事件加载结束后解除事件
		$elem.on(eventPrefix+'-loadedItems',function(){// 加载结束后移除事件
			$elem.off(eventName,loadFn)
		});
	}

	// 顶部下拉菜单开始
	var $menu = $('.nav-site .dropdown');

	$menu.on('dropdown-show',function(ev){
		loadHtmlOnce($(this),buildMenuItem);
	});
	// 构建菜单并加载
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
	
	/*搜索框开始*/
	var $search = $('.search');
	// search 插件初始化
	$search.search({
		autocomplete:true,
		getDataInterval:0
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

	/*轮播图开始*/
	var $focusCarousel = $('.focus .carousel-container');
	//中心轮播图图片具体的加载
	$focusCarousel.on('focusCarousel-loadItem',function(ev,index,elem,success){
		var $imgs = $(elem).find('.carousel-img');
		loadImages($imgs,success,function($img,url){
			$img.attr('src','images/focusCarousel/placeholder.png');
		});		
	});
	lazyLoad({
		totalItemNum:$focusCarousel.find('.carousel-img').length,
		$elem:$focusCarousel,
		eventName:'carousel-show',
		eventPrefix:'focusCarousel'		
	});
	/*调用轮播图插件*/
	$focusCarousel.carousel({
		mode:'slide',
		activeIndex:0,
		interval:2000
	})
	/*轮播图结束*/

	/*今日商品轮播图开始*/
	var $todaysCarousel = $('.todays .carousel-container');
	$todaysCarousel.on('todaysCarousel-loadItem',function(ev,index,elem,success){
		var $imgs = $(elem).find('.carousel-img');
		loadImages($imgs,success,function($img,url){
			$img.attr('src','images/focusCarousel/placeholder.png');
		});		
	});
	lazyLoad({
		totalItemNum:$todaysCarousel.find('.carousel-img').length,
		$elem:$todaysCarousel,
		eventName:'carousel-show',
		eventPrefix:'todaysCarousel'		
	});
	$todaysCarousel.carousel({
		mode:'slide',
		activeIndex:0
		// interval:0
	})
	/*今日商品轮播图结束*/

	/*楼层开始*/
	var $floors = $('.floor');
	
	//楼层图片图按需加载函数
	var $win = $(window);
	var $doc = $(document);
	function isVisible($elem){
		return ($win.height() + $win.scrollTop() > $elem.offset().top) && ($win.scrollTop() < $elem.offset().top+$elem.height());
	}

	function timeToShow(){
		// console.log('timeToShow');
		$floors.each(function(index){
			if(isVisible($(this))){
				// console.log(index+" is show");
				// 懒加载中传入 "floor-show"
				$doc.trigger('floor-show',[index,this])
			}
		})		
	}

	//楼层HTML图按需加载函数
	function buildFloorHtml(oneFloorData){
		var html = '';
		html += '<div class="container">';
		html += buildFloorHeadHtml(oneFloorData);
		html += buildFloorBodyHtml(oneFloorData);
		html += '</div>';
		return html;
	}
	function buildFloorHeadHtml(oneFloorData){
		var html = '';

		html += '<div class="floor-hd">';
		html += '<h2 class="floor-title fl">';
		html += '<span class="floor-title-num">'+oneFloorData.num+'F</span>';
		html += '<span class="floor-title-text">'+oneFloorData.text+'</span>';
		html += '</h2>';
		html += '<ul class="tab-item-wrap fr">';
		for(var i = 0;i<oneFloorData.tabs.length;i++){
			html +=	'<li class="fl"> <a class="tab-item" href="javascript:;">'+oneFloorData.tabs[i]+'</a></li>';
			if(i != oneFloorData.tabs.length-1){
				html +=	'<li class="fl tab-divider"></li>';
			}
		}
		html += '</ul>';
		html += '</div>';

		return html;
	}

	function buildFloorBodyHtml(oneFloorData){
		var html = '';
		html += '<div class="floor-bd">';
		for(var i = 0;i<oneFloorData.items.length;i++){
			html += '	<ul class="tab-panel clearfix">';
				for(var j = 0;j<oneFloorData.items[i].length;j++){
					html += '<li class="floor-item fl">';
					html += '<p class="floor-item-pic">';
					html += '<a href="#">';
					html += '<img src="images/floor/loading.gif" class="floor-img" data-src="images/floor/'+oneFloorData.num+'/'+(i+1)+'/'+(j+1)+'.png" alt="">';
					html += '</a>';
					html += '</p>';
					html += '<p class="floor-item-name">';
					html += '<a class="link" href="#">'+oneFloorData.items[i][j].name+ '</a>';
					html += '</p>';
					html += '<p class="floor-item-price">￥'+oneFloorData.items[i][j].price+'</p>';
					html += '</li>';
				}																					
			html += '</ul>';			
			}			
		html += '</div>';
		return html;		
	}
	
	//楼层图片的具体加载
	$floors.on('tab-loadItem',function(ev,index,elem,success){
		var $imgs = $(elem).find('.floor-img');
		loadImages($imgs,success,function($img,url){
			$img.attr('src','images/floor/placeholder.png');
		});
	});
	// 楼层html的具体加载
	$doc.on('floor-loadItem',function(ev,index,elem,success){
		//HTML 加载
		var $elem = $(elem);
		// console.log('will load '+index,elem);
		//请求数据
		getDataOnce($doc,'data/floor/floorData.json',function(floorData){
			var html = buildFloorHtml(floorData[index]);
			//模拟网络延时
			setTimeout(function(){
				$elem.html(html);
				//加载图片
				lazyLoad({
					totalItemNum:$elem.find('.floor-img').length,
					$elem:$elem,
					eventName:'tab-show',
					eventPrefix:'tab'		
				});
				$elem.tab({
					css3:false,
					js:false,
					mode:'fade',
					activeIndex:0,
					eventName:'mouseenter',
					interval:2000,
					delay:0
				});
			},1000);
		});
		success();		
	});

	//楼层html的按需加载
	// option
	lazyLoad({
		totalItemNum:$floors.length,
		$elem:$doc,
		eventName:'floor-show',
		eventPrefix:'floor'	
	});
	// timeToShow();
	$win.on('scroll resize',$floors.toShowFn = function(){
		clearTimeout($floors.floorTimer);
		$floors.floorTimer = setTimeout(function(){
			timeToShow();
		},200)
	});
	/*楼层结束*/

	/*电梯开始*/

	//判断楼层号
	function whichFloor(){
		var num = -1;
		$floors.each(function(index,elem){
			num = index;
			if($win.scrollTop() + $win.height()/2 < $(elem).offset().top){
				num = index - 1;
				return false; // 退出each 迭代
			}
		})
		return num;
	}
	//设置电梯
	var $elevator = $('#elevator');
	$elevator.items = $elevator.find('.elev-floor-item');
	function setElevator(){
		var num = whichFloor();
		if(num == -1){
			$elevator.fadeOut(); 
		}else{
			$elevator.fadeIn();
			$elevator.items.removeClass('elevator-active'); 
			$elevator.items.eq(num).addClass('elevator-active'); 
		}
	}
	//监听事件自动设置楼层
	$win.on('scroll resize load',function(){
		clearTimeout($elevator.elevatorTimer);
		$elevator.elevatorTimer = setTimeout(function(){
			setElevator();
		},200)
	});
	//监听电梯点击事件
	$elevator.on('click','.elev-floor-item',function(){
		var num = $elevator.items.index(this);
		$('body,html').animate({
			scrollTop:$floors.eq(num).offset().top
		})
	});

	/*电梯结束*/

	/*回到顶部*/
	$('#backToTop').on('click',function(){
		$('body,html').animate({
			scrollTop:0
		})
	});
})(jQuery)
