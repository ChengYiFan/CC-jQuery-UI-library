/**
 * Copyright (c) 2014 Cynthia
 */
;(function($) {
	$.extend($.fn, {
		treeview:function(settings){
			settings = $.extend({
				collapsed:true,
				control:true
			},settings);
			function toggler() {
				$(this).parent().find(">.hitarea")
					.swapClass( CLASSES.collapsableHitarea, CLASSES.expandableHitarea )
					.swapClass( CLASSES.lastCollapsableHitarea, CLASSES.lastExpandableHitarea )
					.end()
					.swapClass( CLASSES.collapsable, CLASSES.expandable )
					.swapClass( CLASSES.lastCollapsable, CLASSES.lastExpandable )
					.find( ">ul" )
					.heightToggle( settings.animated, settings.toggle );
			}
			this.data("toggler",toggler);
			this.addClass("treeview");
			var branches = this.find("li").prepareBranches(settings);
			branches.applyClasses(settings, toggler);
			
		},
		swapClass: function(c1, c2) {
			var c1Elements = this.filter('.' + c1);
			this.filter('.' + c2).removeClass(c2).addClass(c1);
			c1Elements.removeClass(c1).addClass(c2);
			return this;
		},
		replaceClass: function(c1, c2) {
			return this.filter('.' + c1).removeClass(c1).addClass(c2).end();
		},
		hoverClass: function(className) {
			className = className || "hover";
			return this.hover(function() {
				$(this).addClass(className);
			}, function() {
				$(this).removeClass(className);
			});
		},
		heightToggle: function(animated, callback) {
			animated ?
				this.animate({ height: "toggle" }, animated, callback) :
				this.each(function(){
					jQuery(this)[ jQuery(this).is(":hidden") ? "show" : "hide" ]();
					if(callback)
						callback.apply(this, arguments);
				});
		},
		prepareBranches:function(settings){
			if (!settings.prerendered) {
				this.slice(0,2).filter(":first-child:not(ul)").addClass(CLASSES.open).find("a").eq(0).addClass("selected");
				this.filter(":last-child:not(ul)").addClass(CLASSES.last);
				this.filter((settings.collapsed ? "" : "." + CLASSES.closed) + ":not(." + CLASSES.open + ")").find(">ul").hide();
			}
			return this.filter(":has(>ul)");
		},
		applyClasses:function(settings,toggler){
			this.find("a").click(function(){
				$(".selected").removeClass("selected");
				$(this).addClass("selected");
				return false;
			});
			this.filter(":has(>ul):not(:has(>a))").find(">span").unbind("click.treeview").bind("click.treeview", function(event) {
				if ( this == event.target )
					toggler.apply($(this).next());
			}).add( $("a", this) ).hoverClass();
			if (!settings.prerendered) {
				this.filter(":has(>ul:hidden)")
				.addClass(CLASSES.expandable)
				.replaceClass(CLASSES.last, CLASSES.lastExpandable);
				
				this.not(":has(>ul:hidden)")
				.addClass(CLASSES.collapsable)
				.replaceClass(CLASSES.last, CLASSES.lastCollapsable);
				
				var hitarea = this.find("div." + CLASSES.hitarea);
				if (!hitarea.length)
					hitarea = this.prepend("<div class=\"" + CLASSES.hitarea + "\"/>").find("div." + CLASSES.hitarea);
				hitarea.removeClass().addClass(CLASSES.hitarea).each(function() {
					var classes = "";
					$.each($(this).parent().attr("class").split(" "), function() {
						classes += this + "-hitarea ";
					});
					$(this).addClass( classes );
				});
			}
			this.find("div." + CLASSES.hitarea).click( toggler );
		}
	});
	$.treeview = {};
	var CLASSES = ($.treeview.classes = {
		open: "open",
		closed: "closed",
		expandable: "expandable",
		expandableHitarea: "expandable-hitarea",
		lastExpandableHitarea: "lastExpandable-hitarea",
		collapsable: "collapsable",
		collapsableHitarea: "collapsable-hitarea",
		lastCollapsableHitarea: "lastCollapsable-hitarea",
		lastCollapsable: "lastCollapsable",
		lastExpandable: "lastExpandable",
		last: "last",
		hitarea: "hitarea"
	});
})(jQuery);



$(function(){
	$("#treeview").treeview();
	document.body.onContextmenu=function(){window.event.returnValue=false;};
});