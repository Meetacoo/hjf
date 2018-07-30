function checkCrash(obj1,obj2){
	if (((obj1.offsetTop+obj1.offsetHeight)>obj2.offsetTop) && 
		((obj1.offsetLeft+obj1.offsetWidth)>obj2.offsetLeft) && 
		((obj2.offsetTop+obj2.offsetHeight)>obj1.offsetTop) && 
		((obj2.offsetLeft+obj2.offsetWidth)>obj1.offsetLeft)) 
	{
		return true;
	} else {
		return false;
	}
}

//用法
	/*
	if (checkCrash(oBox1,oBox2)) {
		oBox2.style.backgroundColor = 'skyblue';
	} else {
		oBox2.style.backgroundColor = 'pink';
	}
	*/