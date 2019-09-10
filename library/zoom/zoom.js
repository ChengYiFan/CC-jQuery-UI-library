/*
*name:Javascript图片放大镜
*author：Cynthia
*email:chenyifan-2000@163.com
*/


//辅助函数
function g(id){
	return document.getElementById(id);
}


function Zoom(scale,dest,spec,items){
	this.scale = scale;//放大倍数
	this.dest = g(dest); //图片放大到指定区域
	this.spec  = g(spec); //图片源
	this.items = g(items);//图片列表

}

Zoom.prototype.init=function(){
	var w = this.spec.clientWidth,h = this.spec.clientHeight
	ws = w/this.scale,hs = h/this.scale;
	var refImg = this.spec.getElementsByTagName("img")[0];
	//初始化放大镜
	var jpzoom = document.createElement("div");
	jpzoom.id = "zoom";
	jpzoom.style.width = ws+ "px";
	jpzoom.style.height = ws + "px";
	jpzoom.style.top = -h + "px";
	this.spec.appendChild(jpzoom);

	//放大后的img
	var destImg = document.createElement("img");
	destImg.id="destImg";
	destImg.src = refImg.src;
	this.dest.appendChild(destImg);
	destImg.style.height = parseInt(this.spec.style.height)*this.scale + "px";  
    destImg.style.width = parseInt(this.spec.style.width)*this.scale +"px";

    var scale = this.scale;
    //设置放大镜移动效果
    this.spec.onmousemove = function(e){
    	e = e || window.event;
    	var eX = e.clientX, eY = e.clientY;
    	if(eY <  hs/scale){
    		jpzoom.style.top = -h + "px";
    	}else if(eY > hs/scale && eY < h-hs/scale){
    		jpzoom.style.top = -h +eY -hs/scale+"px";
    	}else{
    		jpzoom.style.top = -hs-2 +"px";
    	}
    	if(eX < ws/scale){
    		jpzoom.style.left = 0 + "px";
    	}else if(eX > ws/scale && eX < w-ws/scale){
    		jpzoom.style.left = eX - ws/scale + "px";
    	}else{
    		jpzoom.style.left = w -ws-2 + "px";
    	}
    	//改变图片的style.left,style.top就可以精确控制被放大的部分。
    	destImg.style.top = -(h- Math.abs(parseInt(jpzoom.style.top)))*scale + "px";
    	destImg.style.left = -Math.abs(parseInt(jpzoom.style.left)*scale) + "px";
    };
    var lis = this.items.getElementsByTagName("li");
    for(var i=0;i<lis.length;i++){
    	lis[i].onmousemove =function(){
    		destImg.src = refImg.src = this.firstChild.getAttribute("data-source");
    	}
    }
   
};

window.onload = function(){
	var  zoom = new Zoom(2,"dest","spec","spec-items");
	zoom.init();
};
