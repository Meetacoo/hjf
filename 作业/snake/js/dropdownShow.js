	var $category = $('.category .dropdown');
	$category.on('dropdown-show',function(ev){
		// console.log(this);
		var $this = $(this);
		//当需要显示时从服务器获取数据并且加载
		//获取需要请求的地址
		var loadUrl = $this.data('load');
		//如果页面上没有设置请求地址直接返回
		if(!loadUrl) return;
		var isLoaded = $this.data('isLoaded');
		//如果已经加载过数据了直接返回
		if(isLoaded) return;
		//如果有请求地址,发送请求获取数据
		$.getJSON(loadUrl,function(data){
			console.log(data);
			var html = '';
			// for(var i = 0;i<data.length;i++){
			// 	html += '<li><a href="'+data[i].url+'" class="menu-item">'+data[i].name+'</a></li>';
			// }
			for(var i = 0; i < data.length; i++){
				html += '<dl class="category-details clearfix"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">';
				for(var j = 0;j<data[i].items.length;j++){
					html += '<a href="#" class="link">'+data[i].items[j]+'</a>'
				}
				html += '</dd></dl>';
			}
			//模拟网络延时
			setTimeout(function(){
				$this.find('.dropdown-layer').html(html);
				$this.data('isLoaded',true);
			},1000);
		});
	});
	function dropdownShow(dropdownShow,html,data){
		// console.log(this);
		var $this = $(this);
		//当需要显示时从服务器获取数据并且加载
		//获取需要请求的地址
		var loadUrl = $this.data('load');
		//如果页面上没有设置请求地址直接返回
		if(!loadUrl) return;
		var isLoaded = $this.data('isLoaded');
		//如果已经加载过数据了直接返回
		if(isLoaded) return;
		//如果有请求地址,发送请求获取数据
		$.getJSON(loadUrl,function(data){
			console.log(data);
			// for(var i = 0;i<data.length;i++){
			// 	html += '<li><a href="'+data[i].url+'" class="menu-item">'+data[i].name+'</a></li>';
			// }
			for(var i = 0; i < data.length; i++){
				html += data;
			}
			//模拟网络延时
			setTimeout(function(){
				$this.find('.dropdown-layer').html(html);
				$this.data('isLoaded',true);
			},1000);
		});
	}



	var $menu = $('.nav-site .dropdown');

	$menu.on('dropdown-show',function(ev){
		// console.log(this);
		var $this = $(this);
		//当需要显示时从服务器获取数据并且加载

		//获取需要请求的地址
		var loadUrl = $this.data('load');
		//如果页面上没有设置请求地址直接返回
		if(!loadUrl) return;

		var isLoaded = $this.data('isLoaded');
		//如果已经加载过数据了直接返回
		if(isLoaded) return;
		
		//如果有请求地址,发送请求获取数据
		$.getJSON(loadUrl,function(data){
			console.log(data);
			var html = '';
			for(var i = 0;i<data.length;i++){
				html += '<li><a href="'+data[i].url+'" class="menu-item">'+data[i].name+'</a></li>';
			}
			//模拟网络延时
			setTimeout(function(){
				$this.find('.dropdown-layer').html(html);
				$this.data('isLoaded',true);
			},1000);
		});
	});