function animation(obj,attr,iTarget){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var curr = parseFloat(getComputedStyle(obj,false)[attr]);
				
		if(attr == 'opacity'){
			curr = Math.round(curr * 100);
		}
		var iSpeed = (iTarget - curr) / 10;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

		if (!iSpeed) {
			clearInterval(obj.timer);
		} else {
			if (attr == 'opacity') {
				obj.style[attr] = (curr + iSpeed) / 100;
			} else {
				obj.style[attr] = curr + iSpeed + 'px';
			}
		}
	},30);
}