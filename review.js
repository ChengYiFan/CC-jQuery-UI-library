function showView(href){

	//遮罩
	var newMask = document.createElement("div");
	newMask.id = "mask";
    setMask();
    document.body.appendChild(newMask);
    window.onscroll=function(){
  		document.body.scrollTop = 0;
  	};
  	window.onresize = function(){
  		setMask();
  		popupCenter();
  	};

    //弹出层
    var newDiv = document.createElement("div");
    newDiv.id = "popup";
    newDiv.style.top = "60px";
    newDiv.style.left = "40px";
    popupCenter();
    var newiframe = document.createElement("iframe");
    newiframe.src = href;
    newDiv.appendChild(newiframe);
    $(newDiv).fadeIn(600, function() {
    	
    });
    document.body.appendChild(newDiv);

    //弹出层居中
    function popupCenter(){
    	var width = document.body.clientWidth - 2*document.body.scrollLeft -80;
    	var height = document.body.clientHeight - 2*document.body.scrollTop - 120;
    	newDiv.style.width = width +"px";
    	newDiv.style.height = height+ "px";
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
	}
}
// function initPopup(obj){

// }

// $(window).resize(function(event) {
// 	/* Act on the event */
// });
$(function(){
	$(".demo").click(function(event){

		var href = $(this).attr("href");
		showView(href);
		return false;
	});
	$(".view").click(function(){
		var href = $(this).attr("href");
		showView(href);
		return false;
	});
});




