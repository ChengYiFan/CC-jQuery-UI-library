/**
*分页插件
*@author:Cynthia
*@date:2016.02
*/
;(function(a){
	a.fn.webkit_paginate = function(p){
		var p = p||{};
		var self = a(this);
		var pagesize = p && p.size ? p.size : 8;
		var pagelist = self.parent().find('.page-list');
		var lis = pagelist.find('li');
		var total = lis.length;
		var curpage = 1;
		var totalpage = Math.floor((total+pagesize-1)/pagesize);
		var paginateUl,pre, next;
		var next = self.find('.next');
		init();
		pre.bind('click',function(){
			epre();
		});
		next.bind('click',function(){
			enext();
		});

		function init(){
			self.html('');
			self.append('<a href="javascript:;" class="pre"></a><ul class="paginate-ul clearfix"></ul><a href="javascript:;" class="next"></a>');
			paginateUl = self.find('.paginate-ul');
			pre = self.find('.pre');
			next = self.find('.next');
			for(var i=1;i<=totalpage;i++){
				var li = '<li';
				if(i==1){
					li += ' class="cur">';
				}else{
					li += '>';
				}
				li += '<a href="javascript:;"></a></li>';
				paginateUl.append(li);
			}
			pre.addClass('pre-disabled');
			if(totalpage == 1){
				next.addClass('next-disabled');
			}else{
				next.addClass('next-abled');
			}
			//隐藏超过预定义加载高度的部分
			lis.slice(pagesize,total).hide();
		}
		function epre(){
			if(pre.hasClass('pre-disabled')){
				return false;
			}
			curpage -= 1;
			setCur();
			turnpage();
			if(curpage < totalpage){
				pd(next,'next-disabled','next-abled');
			}
			if(curpage == 1){
				pre.toggleClass('pre-disabled').toggleClass('pre-abled');
			}
			return false;
		}
		function enext(){
			if(next.hasClass('next-disabled')){
				return false;
			}
			curpage += 1;
			setCur();
			turnpage();
			if(curpage > 1){
				pd(pre,'pre-disabled','pre-abled');
			}
			if(curpage == totalpage){
				next.toggleClass('next-disabled').toggleClass('next-abled');
			}
			return false;
		}
		function pd(obj,c1,c2){
			if(obj.hasClass(c1)){
				obj.removeClass(c1).addClass(c2);
			}
		}
		function setCur(){
			paginateUl.find('.cur').removeClass('cur');
			paginateUl.find('li').eq(curpage-1).addClass('cur');
		}
		function turnpage(){
			var from = (curpage-1)*pagesize,to = curpage*pagesize;
			lis.hide();
			lis.slice(from,to).show();
		}
	};
})(jQuery);
$(function(){
	$('.paginate').webkit_paginate({'size':8});
});