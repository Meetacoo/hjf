;(function($){
	//$('.dropdown').dropdown();
	
	var $dropdown = $('.dropdown');
	$dropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		console.log(ev.type);
	});
	
	$dropdown.dropdown({
		css3:false,
		js:true,
		mode:'slideUpDown'
	});
	/*测试暴露接口
	$('button').eq(0).click(function(){
		$dropdown.dropdown('show');
	})
	$('button').eq(1).click(function(){
		$dropdown.dropdown('hide');
	})	
	*/

})(jQuery);