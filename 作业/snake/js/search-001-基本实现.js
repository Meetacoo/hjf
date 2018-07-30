;(function($){
	var $searchFrom = $('#search-form'),
		$searchInput = $('.search-input'),
		$searchLayer = $('.search-layer');

	//提交表单的验证
	$searchFrom.on('submit',function(){
		if(getInputVal() == ''){
			return false;
		}
		console.log('submit...');
	});

	var url = 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1528889766600_556&callback=jsonp557&k=1&area=c2c&bucketid=17&q=';
	//当用户输入时动态获取提示数据
	$searchInput.on('input',function(){
		//获取服务器数据
		$.ajax({
			url:url+getInputVal(),
			dataType:'jsonp',
			jsonp:'callback'
		})
		.done(function(data){
			// console.log(data);
			// 如果找不到数据就把下拉层隐藏掉，什么都不做
			if(data.result.length == 0){
				$searchLayer.html('').hide();
				return;
			}

			var html = '';
			// 可以改变下拉层出现的条数
			var dataNum = 10;
			// 将得到的数组中的数据拼出来，放到<li class="search-item">中
			for(var i = 0;i<data.result.length;i++){
				if(i>=dataNum) break;
				html += '<li class="search-item">'+data.result[i][0]+'</li>'
			}

			$searchLayer.html(html).show();
		})
		.fail(function(err){
			$searchLayer.html('').hide();
		})
		.always(function(){
			// console.log('always me');
		});
		/*
		$('.search-item').on('click',function(){
			console.log(this);
		})
		*/
	});

	//通过事件代理完成搜索下拉提示的提交
	$searchLayer.on('click','.search-item',function(){
		// console.log(this);
		// 点击下拉层中的某个 li 时，将该 li 中的 html 放到 input 框中
		$searchInput.val(removeHTMLTag($(this).html()));
		$searchFrom.trigger('submit');
	});

	$(document).on('click',function(){
		$searchLayer.hide();
	});

	$searchInput
	.on('focus',function(){
		if($.trim($searchLayer.html()) == ''){
			$searchLayer.hide();
		}else{
			$searchLayer.show();
		}
		
	})
	.on('click',function(ev){
		ev.stopPropagation();
	});	

	// 全部为空格也不能提交
	function getInputVal(){
		return $.trim($searchInput.val());
	}
	// 去掉搜索窗中出现的加粗等标签
	function removeHTMLTag(str){
		return str.replace(/<[^<|>]+>/g,'');
	}

})(jQuery);