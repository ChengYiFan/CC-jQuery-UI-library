/**
 *  Name 选项卡插件
 * Css:tabs.css
 * Method:$("#menutabs").tabs();
 * Author:程一帆
 * Date:2013/6/6
 */
;(function($){
	$.fn.extend({
		tabs:function(settings){
			settings=$.extend({
				defaultindex:0
			},settings);
			$(this)._init(settings);
		},
		_init:function(settings){                                                                   
			$(this).addClass("tabs");    
			settings.currentli=$(this).find("li").eq(settings.defaultindex);       
			settings.currentpanel=$(this).find(".panel").eq(settings.defaultindex);                  
			settings.currentli.addClass("li_selected"); 
			settings.currentpanel.addClass("panel_active");                           
			$(this).find("li").addClass("li_default");              	
			$(this)._hover(); 
			$(this)._click(settings);  

		},
		//hover
		_hover:function(){
			$(this).find("li").hover(function(){
				$(this).filter(".li_default").removeClass("li_default").addClass("li_hover");
			},function(){
				$(this).filter(".li_hover").removeClass("li_hover").addClass("li_default");
			});
		},
		_click:function(settings){
			$(this).find("a").click(function(event){
				if(settings.currentli){
					settings.currentli.removeClass("li_selected").addClass("li_default");
					settings.currentli=null;
				}
				$(this).closest("li").removeClass("li_default").addClass("li_selected");
				settings.currentli=$(this).closest("li");   
				var href=$(this).attr("href");
				//alert(href);
				//document.all("contentFrame").src=href;
				if(settings.currentpanel){
					settings.currentpanel.removeClass('panel_active');
					settings.currentpanel = null;
				}
				
				settings.currentpanel = $(href);
				$(href).addClass('panel_active');
				return false;
			});
			
		}
	});
})(jQuery);