var lazy=new ScrollLoad({tem:'img'});lazy.inlt();

!(function($,win,doc,underfine){
	function ScrollLoad(options){
		this.ele=$('img.lazy,img[data-role=lazy]');
		this.srcgroup=[];
		this.settings=$.extend(options);
		this.stopload(this.settings.tem);
		for(var i=0,len=this.ele.length;i<len;i++){
			this.show(this.ele[i],i);
		}
	}
	ScrollLoad.prototype={
		init:function(){
			var self=this;
			var obj=this.ele;
			$(win).scroll(function(){
				for(var i=0,len=obj.length;i<len;i++){
					self.show(obj[i],i);
				}
			})
		},
		stopload:function(tem){
			var self=this;
			this.ele.each(function(i,ele){
				self.srcgroup.push($(ele).attr('src'));
				$(ele).attr('src',tem);
			})

		},
		show:function(obj,i){
			console.log(this.isSee(obj));
			if(this.isSee(obj)){
				$(obj).attr('src',this.srcgroup[i]);
			}
		},
		 isSee:function(obj){
			var imgh=$(obj).offset().top,
				scrolh=$(win).scrollTop(),
				winh=$(win).height();
			return scrolh+winh>imgh;
		}

	};
	window['ScrollLoad']=ScrollLoad;
}(jQuery,window,document));