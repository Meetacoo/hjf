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

		image.onload = function(){
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
	var item = {};
	var totalItemNum =  $focusCarousel.find('img').length;
	var loadedItemNum = 0;
	var loadFn = null;

	$focusCarousel.on('carousel-show',loadFn = function(ev,index,elem){
		console.log('carousel-show loading...');

		if(item[index] != 'loaded'){
			console.log(index,'loading...');
			var $img = $(elem).find('img');
			var imgUrl = $img.data('src');
			// 有问题，placeholder.png 显示错误，好像成了 success 函数显示时的图片
			loadImage(imgUrl,function(url){
				$img.attr('src',url);
			},function(url){
				$img.attr('src','images/focusCarousel/placeholder.png');
			});
			item[index] = 'loaded';
			loadedItemNum++;
			if(loadedItemNum == totalItemNum){
				$focusCarousel.off('carousel-show',loadFn)
			}
		}
	})

	$focusCarousel.carousel({
		mode:'slide',
		activeIndex:0,
		interval:0
	})
	/*轮播图结束*/
})(jQuery)
