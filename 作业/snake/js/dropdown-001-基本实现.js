/*
$(function(){
	// $()
	// console.log($('.dropdown'));
	$('.dropdown').hover(function(){
		// 添加active class
		var $this = $(this);
		// console.log($this.data('active'));
		var activeClass = $this.data('active') + '-active';
		// console.log(activeClass);
		$this.addClass(activeClass);
		// $('.dropdown-layer').css({
		// 	display:'block'
		// })
		$('.dropdown-layer').stop();
		$('.dropdown-layer').slideDown();

	},function(){
		var $this = $(this);
		var activeClass = $this.data('active') + '-active';
		$this.removeClass(activeClass);
		$('.dropdown-layer').stop();
		$('.dropdown-layer').slideUp();
	})
});
*/
;(function($){
	$.fn.extend({
		dropdown:function(){
			return this.each(function(){
				var $this = $(this);
				var activeClass = $this.data('active') + '-active';
				var $layer = $this.find('.dropdown-layer');
				$layer.showHide({
					css3:true,
					js:false,
					mode:'slideUpDown'		
				});
				$this.hover(function(){
					$layer.showHide('show');
					$this.addClass(activeClass);
				},function(){
					$layer.showHide('hide');
					$this.removeClass(activeClass);
				})
			});
		}
	});
	
})(jQuery);