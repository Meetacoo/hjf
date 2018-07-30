;(function(window,undefined){
	var 
		myQuery = function(selector){
			return new myQuery.fn.init(selector);
		};
	myQuery.fn = myQuery.prototype = {
		constustor: myQuery,
		// 核心函数
		init: function(selector){
			selector = myQuery.trim(selector);
			// 布尔值是假的情况返回空的jquery对象
			if(!selector){
				return this;
			}
			// 如是函数的话返回有document的jquery对象,当页面所有的DOM节点加载完毕后执行传入的函数
			else if(myQuery.isFunction(selector)){
				document.addEventListener('DOMContentLoaded',function(){
					selector();
				});
				this[0] = document;
				this.length = 1;
			}
			// 处理字符串
			else if(myQuery.isString(selector)){
				// HTML代码处理
				if (myQuery.isHTML(selector)) {
					// 创建一个空的临时DOM容器，用来装传进来的HTML
					var tmpDom = document.createElement('div');
					tmpDom.innerHTML = selector;
					// for (var i = 0; i < tmpDOM.children.length; i++) {
					// 	this[i] = tmpDOM.children[i];
					// }
					// this.length = tmpDOM.children.length;
					[].push.apply(this,tmpDom.children);

				}
				// 选择器处理
				else{
					var doms = document.querySelectorAll(selector);
					// for (var i = 0; i < doms.length; i++) {
					// 	this[i] = doms[i];
					// }
					// this.length = doms.length;
					[].push.apply(this,doms);
				}
			}
			else if(myQuery.isArray(selector)){
				//由于apply转伪数组有兼容问题(IE8以下不兼容),所以把所有传入的数组转换成真数组
				var tmpArr = [].slice.call(selector);
				
				//把转换后的真数组转换成伪数组
				[].push.apply(this,tmpArr);
				return this;
			}else{
				this[0] = selector;
				this.length = 1;
			}
			return this;
		},
		selector: "",
		length: 0,
		jquery:'1.0.0',
		push: [].push,
		sort: [].sort,
		splice: [].splice,
		toArray: function(){
			return [].slice.call(this);
		},
		get: function(num){
			// 如果选择的是一个DOM节点,就返回一个对象
			if (arguments.length == 1) {
				//大于等于0
				if (num >= 0) {
					return this[num];
				}
				//负数
				else{
					return this[this.length + num];
				}
				// 如果穿的是含有子对象的，就返回一个数组
			}else{
				return this.toArray();
			}
		},
		eq:function(num){
			// 根据下标输入
			if (arguments.length == 1) {
				return myQuery(this.get(num));
			} else {
				return new myQuery();
			}
		},
		first:function(){
			return this.eq(0);
		},
		last:function(){
			return this.eq(-1);
		},
		each:function(fn){
			return myQuery.each(this,fn);
		},
		map:function(fn){
			return myQuery(myQuery.map(this,fn));
		}
	}

	myQuery.extend = myQuery.fn.extend = function(obj) {
		for(key in obj){
			this[key] = obj[key];
		}
	}

	// myQuery上的静态方法
	myQuery.extend({
		isFunction:function(str){
			return typeof str === 'function';
		},

		isString:function(str){
			return typeof str === 'string';
		},

		isHTML:function(str){
			return str.charAt(0) == '<' && str.charAt(str.length - 1) == '>' && str.length >= 3;
		},
		isArray:function(str){
			return myQuery.isObject(str) && length in str;
		},
		isObject:function(str){
			return typeof str === 'object';
		},
		trim:function(str){
			if(myQuery.isString(str)){
				//用正则去掉字符串的前后空格
				return str.replace(/^\s+|\s+$/g,'');
			}else{
				return str;
			}	
		},
		each:function(arr,fn){
			// 数组遍历
			if (myQuery.isArray(arr)) {
				for (var i = 0; i < arr.length; i++) {
					// console.log(i,arr[i]);
					var res = fn.call(arr[i],i,arr[i]);
					if (res == false) {
						break;
					} else if (res == true) {
						continue;
					}
				}
			// 对象遍历
			} else {
				for(key in arr){
					// console.log(key,arr[key]);
					var res = fn.call(arr[key],key,arr[key]);
					if (res == false) {
						break;
					} else if (res == true) {
						continue;
					}
				}
			}
			return arr;
		},
		map:function(arr,fn){
			var retArr = [];
			// 数组遍历
			if (myQuery.isArray(arr)) {
				for (var i = 0; i < arr.length; i++) {
					var res = fn(arr[i],i);
					if (res) {
						retArr.push(res);
					}
				}
			// 对象遍历
			} else {
				for(key in arr){
					var res = fn(arr[key],key);
					if (res) {
						retArr.push(res);
					}
				}
			}
			return retArr;
		},
		toWords:function(str){
			// var reg = ;
			return str.match(/\b\w+\b/g);
		},
		addEvent:function(dom,eventName,fn){
			if( addEventListener){
				dom.addEventListener(eventName,fn);
			}else{
				dom.attachEvent('on'+eventName,fn);
			}
		}
	});

	// 属性
	myQuery.fn.extend ({
		html:function(content){
			if (content) {
				//设置所有DOM原始的innerHTML
				this.each(function(){
					this.innerHTML = content;
				});
				// console.log(this);
				return this;
			}else{
				return this[0].innerHTML;
			}
		},
		text:function(content){
			if (content) {
				this.each(function(){
					this.innerText = content;
				});
				return this;
			}else{
				// return this[0].innerText;
				var str = '';
				this.each(function(){
					str += this.innerText;
				});
				return str;
			}
		},
		attr:function(arg1,arg2){
			if (myQuery.isObject(arg1)) {//是对象的情况
				//设置所有的DOM属性值为对象中的所有值
				this.each(function(){
					var dom = this;
					myQuery.each(arg1,function(attr,val){
						// setAttribute() 方法添加指定的属性，并为其赋指定的值。
						// 如果这个指定的属性已存在，则仅设置/更改值。
						// Internet Explorer 8 以及更早的版本不支持此方法
						dom.setAttribute(attr,val);
					})
				})
			}else{
				if(arguments.length == 1){//传递一个参数的情况
					//获取第一个DOM节点的属性值
					return this[0].getAttribute(arg1);
				}else if(arguments.length == 2){//传递两个参数的情况
					//设置所有DOM的属性值
					this.each(function(){
						this.setAttribute(arg1,arg2);
					});
				}
			}
			// 使返回的是一个 myQuery 对象
			return this;
		},
		removeAttr:function(attr){
			if (attr) {
				this.each(function(){
					this.removeAttribute(attr);
				})
			}
			return this;
		},
		val:function(val){
			if (val) {
				this.each(function(){
					this.value = val;
				})
				// return this.value;
				return this;
			}else{
				return this[0].value;
			}
		},
		css:function(arg1,arg2){
			if(myQuery.isString(arg1)){//是字符串的情况
				if(arguments.length == 1){
					//获取第一个元素对应的样式值
					// return this[0].style[arg1];
					if(this[0].currentStyle){//兼容低级浏览器
						return this[0].currentStyle[arg1];
					}else{
						return getComputedStyle(this[0],false)[arg1];
					}
					
				}else if(arguments.length == 2){
					this.each(function(){
						this.style[arg1] = arg2;
					});
				}
			}else if(myQuery.isObject(arg1)){
				this.each(function(){
					for(key in arg1){
						this.style[key] = arg1[key];
					}
				});
			}
			return this;
		},
		hasClass:function(str){
			var res = false;
			if(str){
				//判断是否存在指定单词的正则
				// eval 方法，将字符串转换为可用的js代码
				// \b 要用 \ 转移符转移
				var reg = eval('/\\b'+str+'\\b/');
				this.each(function(){
					//判断传入的参数是否存在在DOM节点的className上
					if(reg.test(this.className)){
						res = true;
						return false;
					}
				})
			}
			return res;
		},
		addClass:function(str){
			var names = myQuery.toWords(str);
			this.each(function(){
				// console.log(names);
				var $this = myQuery(this);//DOM节点转myquery对象
				for (var i = 0; i < names.length; i++) {
					if(!$this.hasClass(names[i])){
						this.className =this.className + ' ' + names[i];
					}
				}
			})
			return this;
		},
		
		removeClass:function(str){
			/*
			this.each(function(){
				//如果有参数对应的class移除,如果没有就移除全部的
				var $this = myQuery(this);//DOM节点转myquery对象
				var reg = eval('/\\b'+str+'\\b/');
				if($this.hasClass(str)){
					this.className = this.className.replace(reg,'');
				}
				else if(!str){
					this.className = '';
				}
			})
			*/
			if (str) {
				//把传入的参数转换为数组
				var names = myQuery.toWords(str);
				this.each(function(){
					//如果有就删除
					var $this = myQuery(this);//DOM节点转myquery对象
					for (var i = 0; i < names.length; i++) {//DOM节点上有class
						if($this.hasClass(names[i])){
							//删除
							var reg = eval('/\\b'+names[i]+'\\b/');
							// console.log('把'+this.className+"上的"+names[i]+"删除掉");
							this.className =this.className.replace(reg,'');
						}
					}
				});
			}else{
				this.each(function(){
					this.className = '';
				})
			}
			return this;
		},
		toggleClass:function(str){
			/*
			this.each(function(){
				//如果有参数对应的class移除,如果没有就添加上
				var $this = myQuery(this);//DOM节点转myquery对象
				var reg = eval('/\\b'+str+'\\b/');
				if($this.hasClass(str)){
					this.className = this.className.replace(reg,'');
				}else if(!str){
					this.className = '';
				}
				else{
					this.className = this.className + ' ' + str;
				}
			})
			*/
			if (str) {
				//把传入的参数转换为数组
				var names = myQuery.toWords(str);
				this.each(function(){
					var $this = myQuery(this);//DOM节点转myquery对象
					for (var i = 0; i < names.length; i++) {
						if($this.hasClass(names[i])){
							//有对应的class删除
							$this.removeClass(names[i]);
						}else{
							//没有对应的class添加
							$this.addClass(names[i]);
						}
					}
				});
			}else{
				this.each(function(){
					this.className = '';
				})
			}
			return this;
		},
	})

	// DOM操作
	myQuery.fn.extend({
		empty:function(){
			this.each(function(){
				this.innerHTML = '';
			})
			return this;
		},
		remove:function(selector){
			if (selector) {
				//获取选择器选中的所有DOM节点
				var doms = document.querySelectorAll(selector);
				this.each(function(){
					for(var i = 0;i<doms.length;i++){
						if(doms[i] == this){
							//删除
							var parentNode = this.parentNode;
							parentNode.removeChild(this);
						}
					}
				});
			}else{//没有传参
				this.each(function(){
					var parentNode = this.parentNode;
					parentNode.removeChild(this);
				});
			}
			return this;
		},
		append:function(source){
			if(source){
				//myquery对象,DOM节点,HTML代码片段
				//source -> this
				var $source = myQuery(source);
				// console.log($source);
				// var index = $source.index();
				this.each(function(index,value){
					var parentNode = this;
					if (index == 0) {//第一个DOM元素直接插入
						// var parentNode = this.parentNode;
						$source.each(function(){
							parentNode.appendChild(this);
						})
					}else{//第一个DOM元素复制一份再插入
						$source.each(function(){
							//复制一份
							var dom = this.cloneNode(true);
							parentNode.appendChild(dom);
							// parentNode.appendChild(this);
						})					
					}
				})
			}
			return this;
		},
		prepend:function(source){
			if(source){
				//myquery对象,DOM节点,HTML代码片段
				//source -> this
				var $source = myQuery(source);
				this.each(function(index,value){
					// this.appendChild($source);
					var parentNode = this;
					if(index == 0){//第一个DOM元素直接插入
						$source.each(function(){
							// parentNode.appendChild(this);
							//firstChild
							//firstElementChild
							parentNode.insertBefore(this,parentNode.firstChild);
						})
					}else{//第一个DOM元素复制一份再插入
						$source.each(function(){
							//复制一份
							var dom = this.cloneNode(true);
							// parentNode.appendChild(dom);
							parentNode.insertBefore(dom,parentNode.firstChild);
						})					
					}
				})
			}
			return this;
		},
		/*
		clone:function(bcopy){
			var res = [];
			this.each(function(){
				var dom = this.cloneNode(true);
				if(bcopy && this.bucketEvent){//复制事件
					// dom.bucketEvent = this.bucketEvent;
					myQuery.each(this.bucketEvent,function(eventName,fnArr){
						myQuery.each(fnArr,function(){
							myQuery(dom).on(eventName,this);
						})
					});
				}
				res.push(dom);			
			});
			return myQuery(res);
		}
		*/
		clone:function(bcopy){
			var res = [];
			this.each(function(){
				var dom = this.cloneNode(true);
				if (bcopy) {//复制事件 
					// dom.bucketEvent = this.bucketEvent; // 行不通
					myQuery.each(this.bucketEvent,function(eventName,fnArr){
						myQuery.each(fnArr,function(){
							// 绑定事件
							myQuery(dom).on(eventName,this);// 此时this为函数
						})
					});
				}
				res.push(dom);
			});
			
			return myQuery(res);
		},
	})

	// 事件操作
	myQuery.fn.extend({
		on:function(eventName,fn){
			// click test1
			// click test2
			this.each(function(){
				// myQuery.addEvent(this,eventName,fn);
				// console.log(this);
				if(!this.bucketEvent){
					this.bucketEvent = {};
				}
				if (!this.bucketEvent[eventName]) {
					// 初始化一个数组
					this.bucketEvent[eventName] = []; //bt1DOM.bucketEvent= {click:[test1,f()],mouseover:[]}
					// 将函数传进去
					this.bucketEvent[eventName].push(fn);// test1 // bt1DOM.bucketEvent= {click:[test1,f()],mouseover:[f()]}

					// 响应事件时循环数组
					// eventName:click
					myQuery.addEvent(this,eventName,function(){
						// 循环button，执行事件
						myQuery.each(this.bucketEvent[eventName],function(){
							this();
						})
					});
				}else{
					this.bucketEvent[eventName].push(fn);// test1 test2 // bt1DOM.bucketEvent= {click:[test1,f()]}
				}
				
			})
		},
		off:function(eventName,fnName){
			if(arguments.length == 0){//不传参数，解除所有的时间
				this.each(function(){
					this.bucketEvent = {};
				})
			}else if (arguments.length == 1) {// 传递事件名，解除所有事件名对应的事件
				this.each(function(){
					if(this.bucketEvent){
						this.bucketEvent[eventName] = [];
					}
				});
			}else if (arguments.length == 2) {// 传递事件名和函数名，解除所有事件名和函数名对应的事件
				this.each(function(){
					var dom = this;
					if(this.bucketEvent && this.bucketEvent[eventName]){
						myQuery.each(this.bucketEvent[eventName],function(index,fn){
							if(this == fnName){
								//移除数组
								dom.bucketEvent[eventName].splice(index,1);
							}
						})
					}
				})
			}
		},
	})
	myQuery.fn.init.prototype = myQuery.fn;
	window.myQuery = window.$ = myQuery;
})(window);