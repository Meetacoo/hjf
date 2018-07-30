//默认为false，即减速动画
function animation(obj,attr,iTarget,isLinear,fnEnd){
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
			if(fnEnd){
				fnEnd();
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
//用法
/*
window.onload = function(){
	var oBox = document.getElementById('box1');

	oBox.onmouseover = function(){
		animation(oBox,'width',400,false,function(){
			animation(oBox,'height',400,false,function(){
				animation(oBox,'opacity',30,false);
			});
		});
	}
	oBox.onmouseout = function(){
		animation(oBox,'width',100,false,function(){
			animation(oBox,'height',100,false,function(){
				animation(oBox,'opacity',100,false);
			});
		});
	}
}
*/
//如果oBox是由getElementsByTagName取出来的话，要用以下方法
	/*oBox.onmouseover = function(){
		animation(this,'width',400,false,function(){
			animation(oBox[0],'height',400,false,function(){
				animation(oBox[0],'opacity',30,false);
			});
		});
	}
	oBox.onmouseout = function(){
		animation(this,'width',100,false,function(){
			animation(oBox[0],'height',100,false,function(){
				animation(oBox[0],'opacity',100,false)
			});
		});
	}*/
