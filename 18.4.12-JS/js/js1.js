// window.onload=function toRed() {
// 	// body...
// 	document.getElementById('box').style.width='500px';
// }
window.onload=function(){
	function toRed(){
		document.getElementById('box').className='co1';
	}
	document.getElementById('box').onmouseover=toRed;
}