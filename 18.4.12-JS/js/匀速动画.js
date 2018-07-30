function animation(obj,attr,iTarget){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = 0;
		var curr = parseFloat(getComputedStyle(obj,false)[attr]);
		if(attr == 'opacity'){
			curr = curr * 100;
		}
		if (curr > iTarget) {
			iSpeed = -10;
		} else {
			iSpeed = 10;
		}

		if(Math.abs(iTarget - curr) < Math.abs(iSpeed)){
			// clearInterval(timer);
			clearInterval(obj.timer);
			if (attr == 'opacity') {
				obj.style[attr] = iTarget/100;
			} else {
				obj.style[attr] = iTarget + 'px';
			}
			
		}else{
			if (attr == 'opacity') {
				obj.style[attr] = (curr + iSpeed)/100;
			} else {
				obj.style[attr] = curr + iSpeed + 'px';
			}
				
		}
	},30);
}