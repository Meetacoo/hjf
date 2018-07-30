// alert('a');
handleCarf();
handleNav();
handleSearch();
handleCarousel();
handleCate();
handleTimer();
handleFlash();
handleElec();
function handleCarf(){
	var oCarf = document.querySelector('.top .carf-box .carf');
	var oCarfA = document.querySelector('.top .carf-box a');
	var oCarfContent = document.querySelector('.top .carf-box .carf-content');
	var oCarfLoading = document.querySelector('.loading');
	var oCarfSpan = document.querySelector('.top .carf-box .carf-content .carf-empty');
	var timer = null;
	oCarf.onmouseenter = function(){
		// clearTimeout(timer);
		oCarf.style.backgroundColor = '#fff';
		oCarfA.style.color = '#ff6700';
		oCarfContent.style.display = 'block';
		oCarfSpan.style.display = 'none';
		oCarfLoading.style.display = 'block';
		/*
		timer = setTimeout(function(){
			oCarfLoading.style.display = 'none';
			oCarfSpan.style.display = 'block';
		},300)
		*/
		animation(oCarfContent,{height:100},false,function(){
			oCarfLoading.style.display = 'none';
			oCarfSpan.style.display = 'block';
		});
	}
	oCarf.onmouseleave = function(){
		oCarf.style.backgroundColor = '#424242';
		oCarfA.style.color = '#b0b0b0';
		oCarfSpan.style.display = 'none';
		animation(oCarfContent,{height:0},false);
	}
}
function handleNav(){
	var aNavA = document.querySelectorAll('.header .nav a');
	var oNavContent = document.querySelector('.header .nav-content');
	var oNavUl = oNavContent.getElementsByTagName('ul')[0];
	var oLoading = document.querySelector('.header .nav-content .loading');
	var timer = null;
	var timer2 = null;
	for (var i = 0;i < aNavA.length - 2; i++) {
		aNavA[i].index = i;
		aNavA[i].onmouseenter = function(){
			oNavUl.innerHTML = '';
			clearTimeout(timer);
			oLoading.style.display = 'block';
			// oNavUl.style.display = 'none';
			oNavContent.style.borderTop = '1px solid #ccc';
			animation(oNavContent,{height:230},false/*,function(){
				oNavUl.style.display = 'block';
				oLoading.style.display = 'none';
			}*/);
			// loadData(this.index);

			
			//模拟网络延迟
			var index = this.index;
			timer2 = setTimeout(function(){
			clearTimeout(timer2);
				oLoading.style.display = 'none';
				loadData(index);
			},1000)

			
		}
		aNavA[i].onmouseleave = function(){
			timer = setTimeout(function(){
				clearTimeout(timer2);
				animation(oNavContent,{height:0},false);
				oNavContent.style.borderTop = 'none';
			},500)
		}
		oNavContent.onmouseenter = function(){
			clearTimeout(timer);
			clearTimeout(timer2);
		}
		oNavContent.onmouseleave = function(){
			timer = setTimeout(function(){
				animation(oNavContent,{height:0},false);
				oNavContent.style.borderTop = 'none';
				clearTimeout(timer2);
			},500)
		}
	}
	function loadData(index){
		// console.log(index);
		oNavUl.innerHTML = '';
		var aDatas = aNavItems[index];
		if (!aDatas) {
			return;
		}
		for (var i = 0; i < aDatas.length; i++) {
			// aDatas[i]
			// console.log(aDatas[i]);
			var oLi = document.createElement('li');
			var oDiv = document.createElement('div');
			oDiv.className = 'img-box';
			var oImg = document.createElement('img');
			oImg.src = aDatas[i].img;
			var oP1 = document.createElement('p');
			oP1.innerHTML = aDatas[i].name;
			oP1.className = 'product-name';
			var oP2 = document.createElement('p');
			oP2.className = 'product-price';
			oP2.innerHTML = aDatas[i].price + '元起';
			
			if (aDatas[i].tag) {
				var oSpan = document.createElement('span');
				oSpan.className = 'tag';
				oSpan.innerHTML = aDatas[i].tag;
				oLi.appendChild(oSpan);
			}

			oNavUl.appendChild(oLi);
			oLi.appendChild(oDiv);
			oDiv.appendChild(oImg);
			oLi.appendChild(oP1);
			oLi.appendChild(oP2);
		}
	}
}
function handleSearch() {
	var oSearch = document.querySelector('.header .search .inputer');
	var oSearchInput = document.querySelector('.header .search .inputer input');
	var aSearchA = document.querySelectorAll('.header .search .inputer a');
	var oSearchBtn = document.querySelector('.header .search .search-btn');
	var oSearchList = document.querySelector('.header .search .list');
	oSearchInput.onfocus = function(){
		oSearchInput.style.borderColor = '#ff6700';
		oSearchBtn.style.borderColor = '#ff6700';
		oSearchList.style.display = 'block';
		animation(aSearchA[0],{opacity:0},false);
		animation(aSearchA[1],{opacity:0},false);
	}
	oSearchInput.onblur = function(){
		oSearchInput.style.borderColor = '#e0e0e0';
		oSearchBtn.style.borderColor = '#e0e0e0';
		oSearchList.style.display = 'none';
		animation(aSearchA[0],{opacity:100},false);
		animation(aSearchA[1],{opacity:100},false);
	}
}
function handleCarousel() {
	new Carousel({
		id:'carousel',
		aImg:['images/lunbo1.jpg',
			'images/lunbo2.jpg',
			'images/lunbo3.jpg',
			'images/lunbo4.jpg',
			'images/lunbo5.jpg'
		],
		width:1226,
		height:460,
		playDuration:3000
	});
}
function handleCate(){
	var oCate = document.querySelector('.hot .cate');
	var oCateContent = document.querySelector('.hot .cate-content');
	var oCateUl = document.querySelector('.hot .cate-content ul');
	var aCateA = document.querySelectorAll('.hot .cate a');
	var timer = null;
	for (var i = 0; i < aCateA.length; i++) {
		aCateA[i].index = i;
		aCateA[i].onmouseenter = function(){
			for (var j = 0; j < aCateA.length; j++) {
				aCateA[j].className = '';
			}
			this.className = 'active';
			oCateContent.style.display = 'block';
			loadData(this.index);
		}
	}
	oCate.onmouseleave = function(){
		timer = setTimeout(function(){
			for (var i = 0; i < aCateA.length; i++) {
			aCateA[i].className = '';
			}
			oCateContent.style.display = 'none';
		},500);
	}
	oCateContent.onmouseenter = function(){
		clearTimeout(timer);
	}
	oCateContent.onmouseleave = function(){
		for (var i = 0; i < aCateA.length; i++) {
			aCateA[i].className = '';
			// oCateContent.style.display = 'none';
		}
		// aCateA.className = '';
		oCateContent.style.display = 'none';
	}
	function loadData(index){
		oCateUl.innerHTML = '';
		var aDatas = aCateItems[index];
		if (!aDatas) {
			return;
		}
		for (var i = 0; i < aDatas.length; i++) {
			var oLi = document.createElement('li');
			var oImage = document.createElement('img');
			var oP = document.createElement('p');

			oLi.className = 'img-box';
			oImage.src = aDatas[i].img;
			oP.innerHTML = aDatas[i].name;
			oCateUl.appendChild(oLi);
			oLi.appendChild(oImage);
			oLi.appendChild(oP);
		}
	}
}
function handleTimer(){
	var aBox = document.querySelectorAll('.hot .flash .box-bd .timer-box .box');
	var nextDate = new Date('2018/06/01 12:00:00');
	var timer = null;
	function toStr(num){
		if (num<10) {
			return '0' + num;
		}else{
			return '' + num;
		}
	}
	// console.log(nextDate.getHours());
	timer = setInterval(time,1000);
	function time(){
		//获取当前时间
		var now = new Date();
		//剩下的毫秒数
		var allTime = nextDate.getTime() - now.getTime();
		// console.log(allTime);
		if (allTime < 0) {
			allTime = 0;
			clearInterval(timer);
		}
		var h = parseInt(allTime / 3600000);
		var m = parseInt(allTime % 3600000/60000);
		var s = parseInt(allTime % 3600000%60000/1000);
		// console.log(s);
		/*
		if (h<10) {
			h = '0'+h;
		}
		if (m<10) {
			m = '0'+m;
		}
		if (s<10) {
			s = '0'+s;
		}
		*/
		aBox[0].innerHTML = toStr(h);
		aBox[1].innerHTML = toStr(m);
		aBox[2].innerHTML = toStr(s);
	}
	time();
}
function handleFlash(){
	var aSpan = document.querySelectorAll('.hot .flash .box-hd .more span');
	var oListUl = document.querySelector('.hot .flash .box-bd .product-list ul');
	aSpan[0].onclick = function(){
		animation(oListUl,{marginLeft:0},false);
		aSpan[0].className = 'active';
		aSpan[1].className = '';
	}
	aSpan[1].onclick = function(){
		animation(oListUl,{marginLeft:-978},false);
		aSpan[1].className = 'active';
		aSpan[0].className = '';
	}
}
function handleElec(){
	var aElecListA = document.querySelectorAll('.elec .box-hd .more li a');
	var oRightUl = document.querySelector('.elec .box-bd .right-box ul')
	loadData(0);
	for (var i = 0; i < aElecListA.length; i++) {
		aElecListA[i].index = i;
		aElecListA[i].onmouseenter = function(){
			for (var j = 0; j < aElecListA.length; j++) {
				aElecListA[j].className = '';
			}
			this.className = 'active';
			loadData(this.index);
		}

	}

	function loadData(index){
		oRightUl.innerHTML = '';
		var sHtml = '';
		var aDatas = aElecItems[index];
		if (!aDatas) {
			return;
		}		

		for (var i = 0; i < aDatas.length-1; i++) {
			var oLi = document.createElement('li');
			oLi.className = 'col1';
			var oA = document.createElement('a');
			var oImgBox = document.createElement('div');
			oImgBox.className = 'img-box';
			var oImg = document.createElement('img');
			oImg.src = aDatas[i].img;
			var oP1 = document.createElement('p');
			oP1.className = 'intro';
			oP1.innerHTML = aDatas[i].intro;
			var oP2 = document.createElement('p');
			oP2.className = 'desc';
			oP2.innerHTML = aDatas[i].desc;
			var oP3 = document.createElement('p');
			oP3.className = 'price';
			oP3.innerHTML = aDatas[i].price;
			var oSpan = document.createElement('span');
			var oView = document.createElement('div');
			oView.className = 'view';
			var oP4 = document.createElement('p');
			oP4.className = 'recomn';
			oP4.innerHTML = aDatas[i].recomn;
			var oP5 = document.createElement('p');
			oP5.className = 'author';
			oP5.innerHTML = aDatas[i].author;

			if (aDatas[i].tag) {
				oLi.className = 'col1 flag';
			}

			oRightUl.appendChild(oLi);
			oLi.appendChild(oA);
			oA.appendChild(oImgBox);
			oImgBox.appendChild(oImg);
			oA.appendChild(oP1);
			oA.appendChild(oP2);
			oA.appendChild(oP3);
			oP3.appendChild(oSpan);
			oA.appendChild(oView);
			oView.appendChild(oP4);
			oView.appendChild(oP5);
		}
		var lastData = aDatas[aDatas.length-1];
		var oLi = document.createElement('li');
		oLi.className = 'col1';
		oRightUl.appendChild(oLi);

		var oDiv1 = document.createElement('div');
		var oDiv2 = document.createElement('div');
		var oDiv11 = document.createElement('div');
		var oP11 = document.createElement('p');
		oP11.innerHTML = '小白摄像机';
		var oP12 = document.createElement('p');
		oP12.innerHTML = '369元';
		var oDiv12 = document.createElement('div');
		var oImg = document.createElement('img');
		oImg.src = 'images/elec10.png';
		var oDiv21 = document.createElement('div');
		var oP21 = document.createElement('p');
		oP21.innerHTML = '浏览更多';
		var oP22 = document.createElement('p');
		oP22.innerHTML = '热门';
		var oDiv22 = document.createElement('div');
		var oI = document.createElement('i');
		oI.innerHTML = '&#xe615;';

		oDiv1.className = 'elec-top';
		oDiv11.className = 'elec-top-left';
		oDiv12.className = 'elec-top-right';
		oDiv2.className = 'elec-bottom';
		oDiv21.className = 'elec-bottom-left';
		oDiv22.className = 'elec-bottom-right';
		oI.className = 'iconfont';

		oLi.appendChild(oDiv1);
		oLi.appendChild(oDiv2);
		oDiv1.appendChild(oDiv11);
		oDiv11.appendChild(oP11);
		oDiv11.appendChild(oP12);
		oDiv1.appendChild(oDiv12);
		oDiv12.appendChild(oImg);
		oDiv2.appendChild(oDiv21);
		oDiv21.appendChild(oP21);
		oDiv21.appendChild(oP22);
		oDiv2.appendChild(oDiv22);
		oDiv22.appendChild(oI);

		/*
		sHtml += '<li class="col1"><div class="elec-top"><div class="elec-top-left"><p>';
		sHtml += loadData.top.desc + '</p><p>' + loadData.top.price + '元</p>';
		sHtml += '</div><div class="elec-top-right"><img src="' + loadData.top.img + '"></div></div>';
		sHtml += '<div class="elec-bottom"><div class="elec-bottom-left"><p>';
		sHtml += loadData.bottom.desc + '</p><p>' + loadData.bottom.more + '</p></div>';
		sHtml += '<div class="elec-bottom-right"><i class="iconfont">' + loadData.bottom.iconfont;
		sHtml += '</i></div></div>';
		*/

			
	}
	
}