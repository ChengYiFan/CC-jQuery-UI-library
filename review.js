function showView(href){

	//遮罩
	var newMask = document.createElement("div");
	newMask.id = "mask";
    setMask();
    document.body.appendChild(newMask);
  	window.onresize = function(){
  		setMask();
  		popupCenter();
  	};

    //弹出层
    var newDiv = document.createElement("div");
    newDiv.id = "popup";
    newDiv.style.top = "50%";
    newDiv.style.left = "50%";
    popupCenter();
    var newiframe = document.createElement("iframe");
    newiframe.src = href;
    newDiv.appendChild(newiframe);
    $(newDiv).fadeIn(600, function() {
    	document.body.style.overflow = "hidden";
    });
    document.body.appendChild(newDiv);

    //弹出层居中
    function popupCenter(){
    	var width = document.body.clientWidth -100;
    	var height = document.body.clientHeight -200;
    	newDiv.style.width = width +"px";
    	newDiv.style.height = height+ "px";
        newDiv.style.marginTop = - height/2 + "px";
        newDiv.style.marginLeft = -width/2 + "px";
    }
    //遮罩调整
    function setMask(){
    	var scrollWidth,scrollHeight;
    	scrollWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
    	scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    	newMask.style.width = scrollWidth + "px";
    	newMask.style.height = scrollHeight + "px";
    }
    //关闭按钮
    var closeBtn = document.createElement("a");
    closeBtn.className = "closeBtn";
    closeBtn.innerHTML = "X";
    closeBtn.onclick = function(){
    	closePopup();
    	return false;
    };
    newDiv.appendChild(closeBtn);
    function docEle(str){
    	return document.getElementById(str);
    }

    function closePopup(){
		document.body.removeChild(docEle("mask"));
    	document.body.removeChild(docEle("popup"));
        document.body.style.overflow = "visible";

	}
}
// function initPopup(obj){

// }

// $(window).resize(function(event) {
// 	/* Act on the event */
// });
$(function(){
	$(".demo").live("click",function(event){
		var href = $(this).attr("href");
		showView(href);
		return false;
	});
	$(".view").live("click",function(){
		var href = $(this).attr("href");
		showView(href);
		return false;
	});
});




