//默认为false，即减速动画
function animation(obj,attr,iTarget,isLinear){
	clearInterval(obj.timer);
	var iSpeed = 0;
	// isLinear = isLinear || true;// 可以不传参数，不传参数下可以写
	obj.timer = setInterval(function(){
		var curr = parseFloat(getComputedStyle(obj,false)[attr]);
		var isStop = false;
		if(attr == 'opacity'){
			curr = Math.round(curr * 100);
		}

		if(isLinear){
			if (curr > iTarget) {
				iSpeed = -10;
			} else {
				iSpeed = 10;
			}
			if(Math.abs(iTarget - curr) < Math.abs(iSpeed)){
				isStop = true;
			}
		}else{
			iSpeed = (iTarget - curr) / 10;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			if (!iSpeed) {
				isStop = true;
			}
		}

		if (isStop) {
			clearInterval(obj.timer);
			if(isLinear){
				if (attr == 'opacity') {
					obj.style[attr] = iTarget/100;
				} else {
					obj.style[attr] = iTarget + 'px';
				}
			}
		} else {
			if (attr == 'opacity') {
				obj.style[attr] = (curr + iSpeed) / 100;
			} else {
				obj.style[attr] = curr + iSpeed + 'px';
			}
		}
	},30);
}