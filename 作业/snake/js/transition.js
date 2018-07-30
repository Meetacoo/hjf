;(function(w){
	// console.log(document.body.style.transition);
	var transitionEventName = {
		transition: 'transitionend',
		MozTransition: 'transitionend',
		WebkitTransition: 'webkitTransitionEnd',
		OTransition: 'oTransitionEnd'
	}
	var transition = {
		end:'',
		isSupport:false
	}
	for(key in transitionEventName){
		if(document.body.style[key] !== undefined){
			transition.end = transitionEventName[key];
			transition.isSupport = true;
			break;
		}
	}
	//用命名空间存储值
	w.snake = w.snake || {};
	w.snake.transition = transition;
})(window);