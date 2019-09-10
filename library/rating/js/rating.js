(function(a){
	a.fn.webwidget_rating_simple = function(p) {
		var p = p || {};
		var self = a(this);
		var length = p && p.rating_star_length ? p.rating_star_length : "5";
		var fucName = p && p.rating_function_name ? p.rating_function_name : "";
		var initVal = p && p.rating_initial_value ? p.rating_initial_value : "";
		var f = "";
		var score = ['很差','差','一般','好','很好'];
		length = parseInt(length);
		init();
		self.children("li").hover(function() {
			$(this).parent().children("li").addClass('ico-star-gray').removeClass('ico-star-gold');
			var a = $(this).parent().children("li").index($(this));
			$(this).parent().children("li").slice(0, a + 1).addClass('ico-star-gold').removeClass('ico-star-gray');
			self.parent().find('.rating-score').text(score[a]);
		}, function() {

		});
		self.children("li").click(function() {
			var a = $(this).parent().children("li").index($(this));
			$(this).parent().children("li").removeClass('ico-star-gold').addClass('ico-star-gray');
			$(this).parent().children("li").slice(0, a + 1).addClass('ico-star-gold').removeClass('ico-star-gray');
			$('.rating-score').text(score[a]);
			f = a+1;
		});
		self.hover(function(){},function(){
			if(f == ""){
				$(this).children("li").removeClass('ico-star-gold').addClass('ico-star-gray');
				self.parent().find('.rating-score').text('');
			}else{
				$(this).children("li").removeClass('ico-star-gold').addClass('ico-star-gray');
				$(this).children("li").slice(0, f).addClass('ico-star-gold').removeClass('ico-star-gray');
				self.parent().find('.rating-score').text(score[f-1]);
			}
		});
		function init(){
			self.addClass('rating-list');
			for(var i = 1; i <= length; i++) {
				self.append('<li class="ico-appo ico-star-gray"><span>' + i + '</span></li>')
			}
			if(initVal != "") {
				f = initVal;
				self.parent().find('.rating-score').text(score[f-1]);
				self.children("li").slice(0, f).addClass('ico-star-gold').removeClass('ico-star-gray');
			}
		}
	};
	
})(jQuery);


$(function(){
	$('#rating-operate').webwidget_rating_simple();
});
