function handleMove(){
	if (l < 0) {
		l = 0;
	} else if(l >= oBox.offsetWidth - oBtn.offsetWidth){
		l = oBox.offsetWidth - oBtn.offsetWidth;
	}
	var scale = l / (oBox.offsetWidth - oBtn.offsetWidth);

	oBtn.style.left = l + 'px';
	oDiv2.style.top = (- oDiv2.offsetHeight + oDiv1.offsetHeight) * scale + 'px';
	return false;
}