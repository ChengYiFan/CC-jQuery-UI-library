
var json = [
	 {"name":"JS+CSS3实现带预览图幻灯片效果",
	 "imgSrc":"demo/slider_show.png",
	 "reviewUrl":"http://chengyifan.github.io/slideshow/",
	 "downloadUrl":"https://github.com/ChengYiFan/slideshow/archive/gh-pages.zip",
	 "type":"#photo"},
	 {"name":"jQuery横向菜单鼠标悬停二级菜单",
	 "imgSrc":"demo/navmenu.png",
	 "reviewUrl":"http://chengyifan.github.io/navmenu/",
	 "downloadUrl":"https://github.com/ChengYiFan/navmenu/archive/gh-pages.zip",
	 "type":"#menu"},
	 {"name":"带缩略图的图片浏览",
	 "imgSrc":"demo/slider_img.png",
	 "reviewUrl":"http://chengyifan.github.io/slider_img/",
	 "downloadUrl":"https://github.com/ChengYiFan/slider_img/archive/gh-pages.zip",
	 "type":"#photo"},
	{"name":"日历选择控件",
	 "imgSrc":"demo/datepicker.png",
	 "reviewUrl":"http://chengyifan.github.io/datepicker/",
	 "downloadUrl":"https://github.com/ChengYiFan/datepicker/archive/gh-pages.zip",
	 "type":"#widget"},
	{"name":"右键菜单控件",
	 "imgSrc":"demo/contextmenu.png",
	 "reviewUrl":"http://chengyifan.github.io/contextmenu/",
	 "downloadUrl":"https://github.com/ChengYiFan/contextmenu/archive/gh-pages.zip",
	 "type":"#menu"},
	 {"name":"选项卡插件",
	 "imgSrc":"demo/tabs.png",
	 "reviewUrl":"http://chengyifan.github.io/tabs/",
	 "downloadUrl":"https://github.com/ChengYiFan/tabs/archive/gh-pages.zip",
	 "type":"#menu"},
	{"name":"jQuery树形菜单插件",
	 "imgSrc":"demo/treeview.png",
	 "reviewUrl":"http://chengyifan.github.io/treeview/",
	 "downloadUrl":"https://github.com/ChengYiFan/treeview/archive/gh-pages.zip",
	 "type":"#menu"},
	 {"name":"JS图片放大镜效果",
	 "imgSrc":"demo/zoom.png",
	 "reviewUrl":"http://chengyifan.github.io/zoom/",
	 "downloadUrl":"https://github.com/ChengYiFan/zoom/archive/gh-pages.zip",
	 "type":"#widget"}
	 
	 
	 
];

var json1=[
	 {"name":"",
	 "imgSrc":"",
	 "reviewUrl":"",
	 "downloadUrl":"",
	 "type":""},
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
		   "<a class='download' href='"+el.downloadUrl+"'>"+downloadimg+"</a>"+el.name+"</p></li>";
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