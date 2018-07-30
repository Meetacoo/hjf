function animation(obj,opation,isLinear,fnEnd){
	clearInterval(obj.timer);
	var iSpeed = 0;
	// isLinear = isLinear || true;// 可以不传参数，不传参数下可以写
	obj.timer = setInterval(function(){
		//用json语言、for in 循环取值
			var isStopAll = true;
		for (attr in opation){
			var curr = parseFloat(getComputedStyle(obj,false)[attr]);
			var isStop = false;
			if(attr == 'opacity'){
				curr = Math.round(curr * 100);
			}
			if(isLinear){
				if (curr > opation[attr]) {
					iSpeed = -10;
				} else {
					iSpeed = 10;
				}
				if(Math.abs(opation[attr] - curr) < Math.abs(iSpeed)){
					isStop = true;
				}else{
					isStopAll = false;
				}
			}else{
				iSpeed = (opation[attr] - curr) / 10;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

				if (!iSpeed) {
					isStop = true;
				}else{
					isStopAll = false;
				}
			}
				

				
			if (isStop) {
				if(isLinear){
					if (attr == 'opacity') {
						obj.style[attr] = opation[attr]/100;
					} else {
						obj.style[attr] = opation[attr] + 'px';
					}
				}
			} else {
				if (attr == 'opacity') {
					obj.style[attr] = (curr + iSpeed) / 100;
				} else {
					obj.style[attr] = curr + iSpeed + 'px';
				}
			}
		}
		if(isStopAll){
			clearInterval(obj.timer);
			if (fnEnd) {
				fnEnd();
			}
		}
	},30);
}

//window.onload = function(){
	/*var oBox = document.getElementById('box1');
	oBox.onmouseover = function(){
		animation(oBox,{'width':400,'height':400},false,function(){
			animation(oBox,{'opacity':30},false);
		});
	}
	oBox.onmouseout = function(){
		animation(this,{'width':100,'height':100},false,function(){
			animation(oBox,{'opacity':100},false)
		});
	}*/

	//如果oBox是由getElementsByTagName取出来的话，要用以下方法
	/*oBox.onmouseover = function(){
		animation(this,{'width':400,'height':400},false,function(){
			animation(oBox[0],{'opacity':30},false);
		});
	}
	oBox.onmouseout = function(){
		animation(this,{'width':100,'height':100},false,function(){
			animation(oBox[0],{'opacity':100},false)
		});
	}*/
//}