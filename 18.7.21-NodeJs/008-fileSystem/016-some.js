let arr = [1,2,3,4];
arr.some((val)=>{
	if (val == 3) {
		console.log(val);
		return true;
	}
})