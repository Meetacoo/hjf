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
				iSpeed = (opation[attr] - curr) / 2;
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
function Carousel(option){
			//罗列属性
			this.oBox = document.getElementById(option.id);
			this.oBox1 = document.getElementById(option.id);
			this.oImgUl = null;
			this.oLi = null;
			this.leftBtn = null;
			this.rightBtn = null;
			this.oBottomBtn = null;
			// this.aImg = arr;
			this.aImg = option.aImg;
			this.width = option.width;
			this.height = option.height;
			this.playDuration = option.playDuration;
			this.now = 0;

			//初始化
			this.init();

			//绑定函数
			this.bindEvent();

			if(this.playDuration){
				this.autoPlay();
			}
}
Carousel.prototype.init = function(){
	this.oBox.style.width = this.width + 'px';
	this.oBox.style.height = this.height + 'px';
	this.oBox.style.position = 'relative';

	//创建放所有图片的容器
	this.oImgUl = document.createElement('ul');

	//创建放单张图片的容器
	for (var i = 0; i < this.aImg.length; i++) {
		var oLi = document.createElement('li');
		//创建图片
		var oImg = document.createElement('img');
		//改li的定位
		oLi.style.position = 'absolute';
		oLi.style.top = 0;
		oLi.style.left = 0;
		oLi.style.opacity = 0.5;
		oLi.style.zIndex = 0;
		// oLi.style.left = 50 + '%';
		// oLi.style.marginLeft = -610 + 'px';

		//默认第一张图片显示方法
		if (i == 0) {
			oLi.style.opacity = 1;
			oLi.style.zIndex = 66;
		} else {
			oLi.style.opacity = 0.5;
			oLi.style.zIndex = 0;
		}

		//指定图片高度和宽度
		oImg.style.width = this.width + 'px';
		oImg.style.height = this.height + 'px';

		//改img中的地址，使img添加到img容器中
		oImg.src = this.aImg[i];

		//把放所有图片的容器添加到放所有图片的容器中
		this.oImgUl.appendChild(oLi);
		oLi.appendChild(oImg);
	}

	//左右按钮
	this.leftBtn = document.createElement('span');
	this.rightBtn = document.createElement('span');
	this.leftBtn.className = 'leftBtn';
	this.rightBtn.className = 'rightBtn';

	this.leftBtn.style.zIndex = 999;
	this.rightBtn.style.zIndex = 999;

	this.leftBtn.innerHTML = '&lt;'
	this.rightBtn.innerHTML = '&gt;'

	//底部按钮
	this.oBottomBtn = document.createElement('ul');
	this.oBottomBtn.className = 'bottomBtn';
	this.oBottomBtn.style.zIndex = 999;
	for (var i = 0; i < this.aImg.length; i++) {
		var oLi = document.createElement('li');
		if (i == 0) {
			oLi.className = 'active';
		}
		this.oBottomBtn.appendChild(oLi);
		//改li的定位
		
	}

	//把放所有图片的容器添加到顶层父容器中
	this.oBox.appendChild(this.oImgUl);

	//添加左右按钮到顶层父容器中
	this.oBox.appendChild(this.leftBtn);
	this.oBox.appendChild(this.rightBtn);

	//把底部按钮添加到顶层父容器中
	this.oBox.appendChild(this.oBottomBtn);
	//底部按钮定位水平居中
	this.oBottomBtn.style.marginLeft = - this.oBottomBtn.offsetWidth * 0.5 + 'px';
}
Carousel.prototype.bindEvent = function(){
	//显示下一张图片
	this.rightBtn.onclick = function(){
		/*
		//改变所有li
		for (var i = 0; i < this.oImgUl.children.length; i++) {
			this.oImgUl.children[i].style.zIndex = 0;
			this.oImgUl.children[i].style.opacity = 0.5;
			this.oBottomBtn.children[i].className = '';
		}
		*/
		//改变下一个li
		this.now++;
		if (this.now >= this.oImgUl.children.length) {
			this.now = 0;
		}
		/*
		this.oImgUl.children[this.now].style.zIndex = 66;
		this.oImgUl.children[this.now].style.opacity = 1;
		this.oBottomBtn.children[this.now].className = 'active';
		*/
		this.Tab();
	}.bind(this);
	//显示上一张图片
	this.leftBtn.onclick = function(){
		
		//改变下一个li
		this.now--;
		if (this.now < 0) {
			this.now = this.oImgUl.children.length - 1;
		}
		this.Tab();
	}.bind(this);

	//oBottomBtn的事件
	var _self = this;
	for (var i = 0; i < this.oBottomBtn.children.length; i++) {
		_self.oBottomBtn.children[i].index = i;
		this.oBottomBtn.children[i].onclick = function(){
			_self.now = this.index;
			_self.Tab();
		}
	}	
}
Carousel.prototype.autoPlay = function(){
	var timer = null;
	timer = setInterval(this.rightBtn.onclick,this.playDuration);
	this.oBox.onmouseover = function(){
		clearInterval(timer);
	}
	this.oBox.onmouseout = function(){
		timer = setInterval(this.rightBtn.onclick,this.playDuration);
	}.bind(this);
}
Carousel.prototype.Tab = function(){
	//改变所有li
	for (var i = 0; i < this.oImgUl.children.length; i++) {
		this.oImgUl.children[i].style.zIndex = 0;
		this.oImgUl.children[i].style.opacity = 0.5;
		this.oBottomBtn.children[i].className = '';
	}
	this.oImgUl.children[this.now].style.zIndex = 66;
	// this.oImgUl.children[this.now].style.opacity = 1;
	animation(this.oImgUl.children[this.now],{'opacity':100},false);
	this.oBottomBtn.children[this.now].className = 'active';
}