		
/**
 * 右键菜单功能，要使用右键功能时在JavaScript文件中添加如下代码
 * document.oncontextmenu=function(event){
 *		setRightMenu(event,'rightMenu1');
 *		return false;
 *	};
 *  其中rightMenuId是指已经定义好的右键菜单的ID。
 *  注意：
 *  1、需要用到直线和箭头两个图片,在该Demo的images目录下可以找到
 *  2、如要使用该Demo的菜单样式，div的class属性请设置为rightMenu，并在页面导入rightMenu.css
 *  3、程序支持多级菜单，所以定义菜单时请使用div+ul标签进行定义:最外层用div，菜单内容用ul+li标签，如：
 *  <div class="rightMenu"  id="rightMenu1" style="display:none">  
 *   	<ul>
 *   		<li>删除</li>
 *   		<li>全部删除</li>
 *   		<li><hr></li>
 *   		<li>重点标记</li>
 *   		<li>排序
 *   		<ul>
 *   			<li>编号</li>
 *   			<li>日期</li>
 *   			<li>归档编号</li>
 *   		</ul>
 *   		</li>
 *   	</ul>
 *   </div>
 *   2013年12月10日
 *   程一帆
 **/
var currentRightMenuID;

document.onclick=function(){
    //点击页面其他对象时隐藏
    hideRightMenu();
};
    	
function hideRightMenu(){
    //隐藏右键菜单
    var obj=document.getElementById(currentRightMenuID);
    if(obj){  
       obj.style.display = "none";  
    }  
}
/* 
 * 设置（配置）右键菜单,并弹出右键菜单 
 * rightMenuId：右键菜单的ID 
**/  
function setRightMenu(event,rightMenuId){
	hideRightMenu();  

    var e = event||window.event;
    currentRightMenuID=rightMenuId;
    var oMenu = document.getElementById(rightMenuId); 
    var aLi = oMenu.getElementsByTagName("li");  
    var showTimer = hideTimer = null;  
    var maxWidth = maxHeight = 0;  
    var aDoc = [document.documentElement.clientWidth, document.documentElement.clientHeight];  
    var getOffset = {  
    	top: function (obj) {  
    		return obj.offsetTop + (obj.offsetParent ? arguments.callee(obj.offsetParent) : 0);   
        },  
        left: function (obj) {  
            return obj.offsetLeft + (obj.offsetParent ? arguments.callee(obj.offsetParent) : 0);   
        }     
    }; 

    var i = 0;  
    for (i = 0; i < aLi.length; i++){  
        //为含有子菜单的li加上箭头   
        aLi[i].getElementsByTagName("ul")[0] && (aLi[i].className = "sub");  
        //为含有<hr>的li添加样式
        aLi[i].getElementsByTagName("hr")[0]&&(aLi[i].className="line");
        		
        //鼠标移入  
       	aLi[i].onmouseover = function (){  
       		setWidth(aLi[0]); 
       		var oThis = this;  
       		var oUl = oThis.getElementsByTagName("ul"); 
       		if(!oThis.getElementsByTagName("hr")[0]){
           		oThis.className += " active"; 
           		if (oUl[0]){
           			//显示子菜单
           			clearTimeout(hideTimer); 
           			showTimer = setTimeout(function (){  
           				for (var j = 0; j < oThis.parentNode.children.length; j++){  
           					oThis.parentNode.children[j].getElementsByTagName("ul")[0] &&  
           					(oThis.parentNode.children[j].getElementsByTagName("ul")[0].style.display = "none");  
           				}
           				oUl[0].style.display = "block"; 
           				oUl[0].style.top = oThis.offsetTop + "px";  
           				oUl[0].style.left =oThis.parentNode.offsetWidth+ "px";
           				setWidth(oUl[0].getElementsByTagName("li")[0]); 
           				//最大显示范围 
           				maxWidth = aDoc[0] - oUl[0].offsetWidth;  
           				maxHeight = aDoc[1] - oUl[0].offsetHeight;                    
           				//防止溢出   
           				maxWidth < getOffset.left(oUl[0]) && (oUl[0].style.left = -oUl[0].clientWidth + "px");  
           				maxHeight < getOffset.top(oUl[0]) && (oUl[0].style.top = -oUl[0].clientHeight + oThis.offsetTop + oThis.clientHeight + "px");
           				var oLi=oUl[0].getElementsByTagName("li");
           				for(var n=0;n<oLi.length;n=n+1){
           					oLi[n].onmouseup=function(){
           						this.parentNode.style.display="none";
           					};
           				}
           			},100);	 
           		}
           	} 
        };
            	
        //鼠标移出    
        aLi[i].onmouseout =function(){
            var oThis = this;  
            oThis.className = oThis.className.replace(/\s?active/,"");  
            clearTimeout(showTimer); 
            hideTimer = setTimeout(function (){  
            	for (var k = 0; k < oThis.parentNode.children.length; k++){  
            		oThis.parentNode.children[k].getElementsByTagName("ul")[0] &&  
            		(oThis.parentNode.children[k].getElementsByTagName("ul")[0].style.display = "none");  
            	}  
            },100);  	  
        };
    }
    oMenu.style.display = "block";
    oMenu.style.top = e.clientY + "px";  
    oMenu.style.left = e.clientX + "px";  
    //最大显示范围 
    var maxX = aDoc[0] - oMenu.offsetWidth; 
    var maxY = aDoc[1] - oMenu.offsetHeight;   
    //防止菜单溢出 
    maxY < e.clientY && (oMenu.style.top = maxY +1+ "px"); 
    maxX < e.clientX && (oMenu.style.left = maxX +1+ "px");
     
}
//取li中最大的宽度, 并赋给同级所有li	
function setWidth(obj){
	maxWidth = 0;
	for (var i = 0; i < obj.children.length; i++){
		var oLi = obj.children[i];			
		var iWidth = oLi.clientWidth - parseInt(oLi.currentStyle ? oLi.currentStyle["paddingLeft"] : getComputedStyle(oLi,null)["paddingLeft"]) * 2;
		if (iWidth > maxWidth) maxWidth = iWidth;
	}
	for (var i = 0; i < obj.children.length; i++){
		obj.children[i].style.width = maxWidth + "px";
	} 
} 

