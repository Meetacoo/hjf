function getPoint(ev){
	var iLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
	var iTop = document.body.scrollTop || document.documentElement.scrollTop;
	return {x:ev.clientX + iLeft,y:ev.clientY + iTop};
}
/*用法
document.onmousemove = function(ev){
	var oEvent = ev || event;
	var oPoint = getPoint(oEvent);
	oBox.style.left = oPoint.x + 'px';
	oBox.style.top = oPoint.y + 'px';
}
*/