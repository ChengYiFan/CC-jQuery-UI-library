
function menuindexhover(){
	var timeOut;
    var $navTarget;
    var $contentTarget;
    var lis;
    $('#menu .nav li[is="menuindex"]').hover(function(){
    	lis = $(this);
        $navTarget = $(this).find('a:eq(0)');
        $contentTarget = $(this).find('.menuitempanel');
        timeout = setTimeout(function(){
			lis.addClass("hover");
			$contentTarget.slideDown(300);
		}, 100);
    },function(){
        clearTimeout(timeout);
		$(this).find('.menuitempanel').stop(true,true);
		lis.removeClass('hover');//+indexli);
		$(this).find('.menuitempanel').hide();
    })
}

$(function(){	
    menuindexhover();
	
});