(
	function($){
		function getRandom(min,max){
			return Math.round(min + (max - min) * Math.random());
		}
		let $wall = $('.wall');
		let $wish = $('.wish');
		let $wallWidth = parseInt($wall.css('width'));
		let $wallHeight = parseInt($wall.css('height'));
		let $wishWidth = parseInt($wish.css('width'));
		let $wishHeight = parseInt($wish.css('height'));

		let wishPage = ($elem) => {
			// $(document).ready(function(){
				$('.wish').pep({constrainTo: '.wall'});
			// })
			$elem.each(function(){
				$(this).css({
					'transform': 'matrix(1,0,0,1,'+getRandom(0,(300))+','+getRandom(0,(200))+')'
				})
			})
			// console.log($wishHeight);
			$elem.hover(function(){
				$(this).css({
					'zIndex':1
				})
			},function(){
				$(this).css({
					'zIndex':0
				})
			});
		}
		wishPage($wish);

		$wall.on('click','.close',function(){
			console.log($(this).data('id'));
			var $this = $(this);
			var self = this;
			$.ajax({
				url:'/del',
				data: 'id=' + $this.data('id'),
				dataType:'json',
				method:'GET'
			})
			.done(function(data){
				if (data.status == 0) {
					// 移除
					$(self.parentNode).remove();
				}
			})
		})

		$('.btn').on('click',function(){
			let val = $('#content').val();
			$.ajax({
				url:'/add',
				data:{content:val},
				dataType:'json',
				method:'POST'
			})
			.done(function(data){
				console.log(data);
				let $dom = $(`<div class="wish" style="background: ${data.data.color}">
												<a href="#" class="close fr" data-id="${data.data.id}">X</a>
												${data.data.content}
											</div>`);
				$wall.append($dom);
				wishPage($dom);
				$('#content').val('');
			})
		})
	}

)(jQuery)
