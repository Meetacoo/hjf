;(function($){
	function Tab($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.$tabItems = this.$elem.find('.tab-item');
		this.itemNum = this.$tabItems.length;
		this.$tabPanels = $elem.find('.tab-panel');

		this.now = this._getCorrectIndex(options.activeIndex);
		this._init();
	}
	Tab.prototype = {
		constructor:Tab,
		_init:function(){
			var self = this;
			var timer = null;

			// 让第一张图片在 loading 图片后显示，因为要 trigger 'carousel-show' 事件
			this.$elem.trigger('tab-show',[this.now,this.$tabPanels[this.now],this]);
			// console.log(this.$tabPanels[this.now])

			//添加划入划出的初始化class,隐藏所有的
			//显示当前的
			this.$tabItems.eq(this.now).addClass('tab-item-active');
			this.$tabPanels.eq(this.now).show();
			// 监听事件
			this.$tabPanels.on('show shown hide hidden',function(ev){
				// 发送,然后在index中接收,trigger 完发送
				self.$elem.trigger('tab-' + ev.type,[self.$tabPanels.index(this),this]);

				// console.log(ev.type);
			})
			//初始化showHide插件
			this.$tabPanels.showHide(this.options);
			//获取过渡的class
			// 绑定事件
			var eventName = this.options.eventName == 'click' ? 'click' : 'mouseenter';
			this.$elem.on(eventName,'.tab-item',function(){
				var index = self.$tabItems.index(this);
				if (self.options.delay) {
					clearTimeout(timer);
					timer = setTimeout(function(){
						self.toggle(index);
					},self.options.delay)
				}else{
					// console.log(index); 
					self.toggle(index);
				}

			});
			if(this.options.interval){
				this.auto();
				this.$elem.hover($.proxy(self.pause,self),$.proxy(self.auto,self));		
			}
		},
		toggle(index){
			if(this.now == index) return;
			// 隐藏当前的
			this.$tabItems.eq(this.now).removeClass('tab-item-active');
			this.$tabPanels.eq(this.now).showHide('hide');
			// 显示index对应的
			this.$tabItems.eq(index).addClass('tab-item-active');
			this.$tabPanels.eq(index).showHide('show');
			this.now = index;
		},
		auto(){// 自动播放
			var self = this;
			this.autoTimer = null;
			this.autoTimer = setInterval(function(){
				self.toggle(self._getCorrectIndex(self.now+1));
			},this.options.interval)
		},
		pause(){// 鼠标放上停止自动播放
			clearInterval(this.autoTimer);
		},
		_getCorrectIndex(index){// 获取下标，循环播放
			if(index >= this.itemNum) return 0;
			if(index < 0) return (this.itemNum - 1);
			return index;
		}
	}

	Tab.DEFAULTS = {
		css3:false,
		js:false,
		mode:'fade',
		eventName:'mouseenter',// click
		activeIndex:0,
		interval:0,
		delay:200
	}

	$.fn.extend({
		tab:function(options){
			return this.each(function(){
				var $this = $(this);
				var tab = $this.data('tab');
				if(!tab){//单例模式
					// 传一个空对象进去，每次都会自动刷新，防止相互调用
					options  = $.extend({},Tab.DEFAULTS,options);
					tab = new Tab($(this),options);
					$this.data('tab',tab);
				}
				if(typeof tab[options] == 'function'){
					tab[options]();
				}
			});
		}
	})

})(jQuery);