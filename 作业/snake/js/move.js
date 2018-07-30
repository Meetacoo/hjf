function init($elem){
		this.$elem = $elem;
		this.currentX = parseFloat(this.$elem.css('left'));
		this.currentY = parseFloat(this.$elem.css('top'));
	}
	function to(x,y,callBack){
		x = (typeof x == 'number') ? x : this.currentX;
		y = (typeof y == 'number') ? y : this.currentY;
		if (this.currentX == x && this.currentY == y) return;
		// console.log('move...');
		this.$elem.trigger('move');

		if (typeof callBack == 'function') callBack();
		this.currentX = x;
		this.currentY = y;
	}
/*Slient开始*/
	function Slient($elem){
		init.call(this,$elem);
		this.$elem.removeClass('transition');
	}

	Slient.prototype = {
		constructor:Slient,
		to:function(x,y){
			var self = this;
			to.call(this,x,y,function(){
				this.$elem.css({
					top:y,
					left:x
				});
				this.$elem.trigger('moved');
			});
		},
		x:function(x){
			// this.$elem.to(x);
			this.to(x);
		},
		y:function(y){
			// this.$elem.to(null,y);
			this.to(null,y);
		}
	}
	// var move = new Slient($('.box'));
/*Slient结束*/

/*Css3开始*/
	function Css3($elem){
		init.call(this,$elem);
		this.$elem.addClass('transition');
		//初始化添加left和top,如果style中没有的话此时加上left和top值
		this.$elem.css({
			left:this.currentX,
			top:this.currentY
		});
	}
	Css3.prototype = {
		constructor:Css3,
		to:function(x,y){
			var self = this;
			to.call(this,x,y,function(){
				//监听过渡完成事件
				this.$elem
				.off(snake.transition.end)//为了解决用户频繁点击触发事件多次执行
				.one(snake.transition.end,function(){//用one绑定事件是为了事件只触发一次后就移除
					self.$elem.trigger('moved');//不用self，用bind也可以
				});

				this.$elem.css({
					top:y,
					left:x
				});
			});
		},
		x:function(x){
			// this.$elem.to(x);
			this.to(x);
		},
		y:function(y){
			// this.$elem.to(null,y);
			this.to(null,y);
		}
	}
	// var move = new Css3($('.box'));
/*Css3结束*/

/*js开始*/
	function Js($elem){
		this.$elem = $elem;
		this.$elem.removeClass('transition');
	}
	Js.prototype = {
		constructor:Js,
		to:function(x,y){
			var self = this;
			
			to.call(this,x,y,function(){
				self.$elem
				.stop()
				.animate({
					top:y,
					left:x
				},function(){
					self.$elem.trigger('moved');
				});
			});
			
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y);
		}
	}
	// var move = new Js($('.box'));
/*js结束*/

/*暴露接口开始*/
	var mode = null;
	function move($elem,options){
		if(options.Css3 && snake.transition.isSupport){//Css3的移动
			mode = new Css3($elem);
		}
		else if(options.Js){
			mode = new Js($elem);
		}
		else{
			mode = new Slient($elem);
		}
		return {//return mode //也可以,但是暴露的就太多了，没必要
			to:mode.to.bind(mode),//除了用bind之外，还可以通过jQuery的代理proxy实现
			// to:$.proxy(mode.to,mode),
			x:mode.x.bind(mode),
			// x:$.proxy(mode.x,mode),
			y:mode.y.bind(mode)
			// y:$.proxy(mode.y,mode),
		}
	}
	var DEFAULTS = {
		Css3:true,
		Js:true,
	}
	$.fn.extend({
		move:function(options,x,y){
			/*return */this.each(function(){
				$elem = $(this);
				var moveMode = $elem.data('moveMode');// undefined  // obj
				//var moveMode = move($elem,{Css3:true,Js:false});
				//单例模式
				if(!moveMode){ // moveMode就是上边return的对象
					options = $.extend({},DEFAULTS,options);
					moveMode = move($elem,options);
					//把有方法(/)的对象存到对应的DOM元素上
					$elem.data('moveMode',moveMode);
				}
				if(typeof moveMode[options] == 'function'){
					//注意，此处要不执行显示隐藏的元素jquery对象传递
					// move[options]相当于在mode对象中找到下标为options的方法
					// options 就是show/hide方法
					moveMode[options](x,y);
				}
			});
			return this;// 如果上边有return，这句话就可以不要了
		}
	});
/*暴露接口结束*/