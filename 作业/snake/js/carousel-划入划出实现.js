;(function($){
	function Carousel($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.$carouselItems = this.$elem.find('.carousel-item');
		this.itemNum = this.$carouselItems.length;
		this.$btns = $elem.find('.btn-item');
		this.$controlBtns = $elem.find('.control');

		this.now = this._getCorrectIndex(options.activeIndex);
		this._init();
		/*if(options.interval){
			this.auto();
			var self = this;
			this.$elem.hover($.proxy(self.pause,self),$.proxy(self.auto,self));		
		}*/
	}
	Carousel.prototype = {
		constructor:Carousel,
		_init:function(){
			var self = this;
			// 让第一张图片在 loading 图片后显示，因为要 trigger 'carousel-show' 事件
			this.$elem.trigger('carousel-show',[this.now,this.$carouselItems[this.now]]);
			if(this.options.mode === 'slide'){
				this.$carouselItems.on('move moved',function(ev){
					var index = self.$carouselItems.index(this);
					// console.log(ev.type,index);
					if(ev.type == 'move'){
						if(index == self.now){
							self.$elem.trigger('carousel-hide',[index,this]);
						}else{
							self.$elem.trigger('carousel-show',[index,this]);
						}
					}else if(ev.type == 'moved'){
						if(index == self.now){
							self.$elem.trigger('carousel-shown',[index,this]);
						}else{
							self.$elem.trigger('carousel-hidden',[index,this]);
						}
					}
				});
				//添加划入划出的初始化class,隐藏所有的
				this.$elem.addClass('slide');
				//显示当前的
				this.$carouselItems.eq(this.now).css({left:0});
				//获取元素的宽度
				this.$itemWidth = this.$carouselItems.eq(0).width();
				//初始化移动插件
				this.$carouselItems.move(this.options);
				this.$carouselItems.move(this.options);	
				//获取过渡的class
				this.transitionClass = this.$carouselItems.eq(this.now).hasClass('transition') ? 'transition' : '';
				this.tab = this._slide;
			//淡入淡出	
			}else{
				this.$carouselItems.on('show shown hide hidden',function(ev){
					// console.log('carousel-'+ev.type,[self.$carouselItems.index(this),this]);
					self.$elem.trigger('carousel-'+ev.type,[self.$carouselItems.index(this),this]);
				});
				//添加划入划出的初始化class,隐藏所有的
				this.$elem.addClass('fade');
				//显示当前的
				this.$carouselItems.eq(this.now).show();
				
				//初始化显示隐藏插件
				this.$carouselItems.showHide(this.options);
				this.tab = this._fade;
			}

			//激活底部对应的按钮
			this.$btns.eq(this.now).addClass('active');

			//绑定事件
			this.$elem
			.hover(function(){
				self.$controlBtns.show();
			},function(){
				self.$controlBtns.hide();
			})
			.on('click','.control-right',function(){
				//划动时向左划,方向是1
				self.tab(self._getCorrectIndex(self.now+1),1);
			})
			.on('click','.control-left',function(){
				//划动时向右划,方向是-1
				self.tab(self._getCorrectIndex(self.now-1),-1);
			});

			this.$btns.on('click',function(){
				self.tab(self.$btns.index($(this)));
			});

			if(this.options.interval){
				this.auto();
				this.$elem.hover($.proxy(self.pause,self),$.proxy(self.auto,self));		
			}
		},
		_fade(index){
			if(this.now == index) return;
			//当前的隐藏
			this.$carouselItems.eq(this.now).showHide('hide');
			this.$btns.eq(this.now).removeClass('active');
			//下一张显示
			this.$carouselItems.eq(index).showHide('show');
			this.$btns.eq(index).addClass('active');

			this.now = index;
		},
		_slide(index,direction){
			if(this.now == index) return;
			//index代表将要划入的索引
			//this.now代表当前的
			//direction 左划,方向是1,右划,方向是-1
			
			//确定方向
			if(!direction){
				if(index > this.now){
					direction = 1;
				}else{
					direction = -1;
				}				
			}

			//让将要划入的放到指定位置
			this.$carouselItems.eq(index).removeClass(this.transitionClass).css({left:direction * this.$itemWidth});
			
			setTimeout(function(){
				//让当前的的划出
				this.$carouselItems.eq(this.now).move('x',-1 * direction * this.$itemWidth);
				//让指定的划入
				this.$carouselItems.eq(index).addClass(this.transitionClass).move('x',0);
				this.now = index;
			}.bind(this),20);

			this.$btns.eq(this.now).removeClass('active');
			this.$btns.eq(index).addClass('active');			
		},
		/*_slide(index,direction){
			if(this.now == index) return;
			//index代表将要划入的索引
			//this.now代表当前的
			//direction 左划,方向是1,右划,方向是-1
			
			//确定方向
			if(!direction){
				if (index > this.now) {
					direction = 1
				} else {
					direction = -1
				}
			}

			//让将要划入的放到指定位置
			this.$carouselItems.eq(index).removeClass(this.transitionClass).css({left:direction * this.itemWidth});
			
			setTimeout(function(){
				//让当前的的划出
				this.$carouselItems.eq(this.now).move('x',-1 * direction * this.itemWidth)
				//让指定的划入
				this.$carouselItems.eq(index).addClass(this.transitionClass).move('x',0);
				this.now = index;
			}.bind(this),20);

			this.$btns.eq(this.now).removeClass('active');
			this.$btns.eq(index).addClass('active');

			//当前的隐藏
			this.$carouselItems.eq(index).removeClass(this.transitionClass).css({left:direction * this.itemWidth});
			this.$carouselItems.eq(this.now).move('x',-1 * direction * this.$itemWidth);
			this.$btns.eq(this.now).removeClass('active');
			//下一张显示
			this.$carouselItems.eq(index).move('x',0);
			this.$btns.eq(index).addClass('active');

			this.now = index;
		},*/
		auto(){// 自动播放
			var self = this;
			this.timer = null;
			this.timer = setInterval(function(){
				self.tab(self._getCorrectIndex(self.now+1));
			},this.options.interval)
		},
		pause(){// 鼠标放上停止自动播放
			clearInterval(this.timer);
		},
		_getCorrectIndex(index){// 获取下标，循环播放
			if(index >= this.itemNum) return 0;
			if(index < 0) return (this.itemNum - 1);
			return index;
		}
	}

	Carousel.DEFAULTS = {
		css3:true,
		js:false,
		mode:'fade',
		activeIndex:1,
		interval:0
	}

	$.fn.extend({
		carousel:function(options){
			return this.each(function(){
				var $this = $(this);
				var carousel = $this.data('carousel');
				if(!carousel){//单例模式
					// 传一个空对象进去，每次都会自动刷新，防止相互调用
					options  = $.extend({},Carousel.DEFAULTS,options);
					carousel = new Carousel($(this),options);
					$this.data('carousel',carousel);
				}
				if(typeof carousel[options] == 'function'){
					carousel[options]();
				}
			});
		}
	})

})(jQuery);