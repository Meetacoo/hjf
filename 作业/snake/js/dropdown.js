;(function($){
	function DropDown($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.activeClass = this.$elem.data('active') + '-active';
		this.$layer = this.$elem.find('.dropdown-layer');
		
		//初始化显示隐藏模块
		this.$layer.showHide(this.options);	

		this.$layer.on('show shown hide hidden',function(ev){
			// console.log(ev.type);
			this.$elem.trigger('dropdown-'+ev.type);
		}.bind(this));

		//绑定事件
		//this.$elem.hover(this.show.bind(this),this.hide.bind(this));	
		this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this));
	}

	DropDown.prototype = {
		constructor:DropDown,
		show:function(){
			//避免用户快速划过触发事件
			if(this.options.delay){
				this.timer = setTimeout(function(){
					//显示下拉层
					this.$layer.showHide('show');
					this.$elem.addClass(this.activeClass);		
				}.bind(this),this.options.delay)
			}else{
				//显示下拉层
				this.$layer.showHide('show');
				this.$elem.addClass(this.activeClass);					
			}
			// //显示下拉层
			// this.$layer.showHide('show');
			// this.$elem.addClass(this.activeClass);			
		},
		hide:function(){
			if(this.options.delay){
				clearTimeout(this.timer);
			}
			//隐藏下拉层
			this.$layer.showHide('hide');
			this.$elem.removeClass(this.activeClass);
		}
	};

	// DEFAULTS 全部大写，为常量
	DropDown.DEFAULTS = {
		css3:false,
		js:true,
		mode:'slideUpDown',
		delay:200
	};
	$.fn.extend({
		dropdown:function(options){
			return this.each(function(){
			/*
				var $this = $(this);
				var activeClass = $this.data('active') + '-active';
				var $layer = $this.find('.dropdown-layer');
				$layer.showHide({
					css3:true,
					js:false,
					mode:'slideUpDown'		
				});
				$this.hover(function(){
					$layer.showHide('show');
					$this.addClass(activeClass);
				},function(){
					$layer.showHide('hide');
					$this.removeClass(activeClass);
				})
			*/
				options = $.extend({},DropDown.DEFAULTS,options);
				new DropDown($(this),options);
			});
		}
	});
})(jQuery);