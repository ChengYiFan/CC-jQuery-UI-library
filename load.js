
var json = [
 	{
 	  "name":"JS图片放大镜效果",
	  "imgSrc":"demo/zoom.png",
	  "reviewUrl":"library/zoom/index.html",
	  "type":"#widget"
	},
	{
		"name":"jQuery横向菜单鼠标悬停二级菜单",
	  "imgSrc":"demo/navmenu.png",
	  "reviewUrl":"library/navmenu/index.html",
	  "type":"#menu"
	},
	{
		"name":"带缩略图的图片浏览",
	  "imgSrc":"demo/slider_img.png",
	  "reviewUrl":"library//slider_img/index.html",
	  "type":"#photo"
	},
	{
		"name":"日历选择控件",
	  "imgSrc":"demo/datepicker.png",
	  "reviewUrl":"library/datepicker/index.html",
	  "type":"#widget"
	},
	{
		"name":"右键菜单控件",
	  "imgSrc":"demo/contextmenu.png",
	  "reviewUrl":"library/contextmenu/index.html",
	  "type":"#menu"
	},
	{
		"name":"选项卡插件",
	  "imgSrc":"demo/tabs.png",
	  "reviewUrl":"library/tabs/index.html",
	  "type":"#menu"
	},
	{
		"name":"jQuery树形菜单插件",
	  "imgSrc":"demo/treeview.png",
	  "reviewUrl":"library/treeview/index.html",
	  "type":"#menu"
	},
	{
		"name":"JS+CSS3实现带预览图幻灯片效果",
	  "imgSrc":"demo/slider_show.png",
	  "reviewUrl":"library/slideshow/index.html",
	  "type":"#photo"
	},
	{
		"name":"jQuery订单结算插件",
	  "imgSrc":"demo/order.png",
	  "reviewUrl":"library/order/index.html",
	  "type":"#widget"
	 },
	 {
	 	"name":"jQuery打分插件",
	  "imgSrc":"demo/rating.png",
	  "reviewUrl":"library/rating/index.html",
	  "type":"#widget"
	 },
	 {
	 	"name":"jQuery分页插件",
	  "imgSrc":"demo/paginate.png",
	  "reviewUrl":"library/paginate/index.html",
	  "type":"#widget"
	 }
	  
];

var html = "<div class='waterfall'><ul>";
var arry = eval(json);
var lenght = arry.length;

/* 加载全部插件 */
function loadUI(){
	load_html(json);
}
/* 按类别加载插件 */
function loadUIByType(type){
	var arry = [];
	$.each(json, function(index, val) {
		 if(val.type == type){
		 	arry.push(val);
		 }
	});
	if(arry.length > 0){
		load_html(arry);
	}
}
function load_html(data){
	var viewimg = "<img src='img/search.png' alt=''/>";
	var downloadimg = "<img src='img/download.png' alt=''/>";
	$.each(data,function(index, el) {
		var flag = index%3;
		var lis = "<li><a href='"+el.reviewUrl+"' class='demo'>"+
		   "<img src='"+el.imgSrc+"' alt='"+el.name+"'/>"+
		   "</a><p><a class='view' href='"+el.reviewUrl+"'>"+viewimg+"</a>"+
		   el.name+"</p></li>";
		switch(flag){
			case 0:
				$(".waterfall").eq(0).find("ul").append(lis);
				break;
			case 1:
				$(".waterfall").eq(1).find("ul").append(lis);
				break;
			case 2:
				// setTimeout(function(){
				// 	$(".waterfall").eq(2).find("ul").append(lis);
				// },200*index);
				$(".waterfall").eq(2).find("ul").append(lis);
				break;
		}
	});
}
/* 清空内容区域 */
function _clear(){
	$(".waterfall ul").empty();
}

$(function(){
	loadUI();
	$(".nav li").click(function(){
		if($(this) == $(".cul")){return;}
		var type = $(this).find("a").attr("href");
		$(".cul").removeClass('cul');
		$(this).addClass('cul');
		_clear();
		if(type == "#all"){
			loadUI();
		}else{
			loadUIByType(type);
		}
	});
});