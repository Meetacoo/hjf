;(function($){
	$.fn.extend({
		switch:function(options){
			var defaults = {
				activeClass:"active",
				btnSelector:".btn>li",
				contentSelector:".content>li",
				eventType:"click"
			}
			options = $.extend(defaults,options);
			this.each(function(){
				var $box = $(this);
				var $btns = $box.find(options.btnSelector);
				console.log($btns);
				$btns.on(options.eventType,function(){
					// console.log(this);
					$(this).addClass(options.activeClass).siblings().removeClass(options.activeClass);
					var $index = $(this).index();
					// console.log($index);
					$box.find(options.contentSelector).eq($index).show().siblings().hide();
				})
			})
		}
	})
})(jQuery);
/*
	//使用方法
	$(function(){
		$('.box').switch({
			activeClass:"active",
		});
		$('.box2').switch({
			activeClass:"current",
			btnSelector:"ul.btn>li",
		});
	})
*/