/*
*调用方法
*<input type="text" id="datepicker" onclick="sdatepicker()" readonly="true">
*@author Cheng Yifan
*/
var datepicker = new Datepicker();
function getEvtTarget(){            //获取当前事件对象
	var eventTarget;
	if(!window.event.srcElement){
		eventTarget = window.event.target;
	}else{
		eventTarget = window.event.srcElement;
	}
	return eventTarget;
}

function createDpDiv(id){           //创建日历层
	var odiv=document.createElement("div");
		odiv.setAttribute("id",id);
		odiv.setAttribute("class","ui-datepicker ui-corner-all");
		return odiv; 
}
function sdatepicker(){              //主调函数
	if(document.getElementById(datepicker._mainDivId)==null){
		document.body.appendChild(datepicker.dpDiv);
	}
	datepicker.evtTarget = getEvtTarget();
	datepicker._attachDatepicker(datepicker.evtTarget);
	document.onclick = function(){
		var evtsrc = event.target||event.srcElement;
	
		if(datepicker.evtTarget !== evtsrc ){
			if(!datepicker.isFocus){
				datepicker._hideDatepicker(datepicker.evtTarget);
			}
		}
	}
}

function Datepicker(){
	this._mainDivId = "ui-datepicker-div";       //日历层ID
	this.dpDiv = createDpDiv(this._mainDivId);   //日历的层
	this.markerClassName = "hasDatepicker";      //input 元素的类名
	this.evtTarget = null;
	this.maxRows = 4;
	this.drawYear = 0;
	this.drawMonth = 0;
	this.currentYear = 0;
	this.currentMonth = 0;
	this.currentDay = 0;
	this.lastInput = null;
	this.lastVal = "";
	this._datepickerShowing = false;
	this.regional={
			dayNames: ["星期日","星期一","星期二", "星期三","星期四","星期五","星期六"],
			dayNamesMin:["日","一","二","三","四","五","六"],
			dateFormat:"yy-mm-dd",
			firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
			showMonthAfterYear:true
		};
}
Datepicker.prototype._attachDatepicker=function(target){
	if(target.getAttribute("class")){if(target.getAttribute("class").indexOf(this.markerClassName)!= -1){return;}}
	this._showDatepicker(target);
	target.setAttribute("class",this.markerClassName);
}
Datepicker.prototype._hideDatepicker=function(target){
	target.className = "";
	this.dpDiv.style.display="none";
	this.dpDiv.innerHTML = "";
}
Datepicker.prototype._showDatepicker=function(target){
	this.lastInput = target;
	this._setDateFromField(target);   //初始化数据
	this._updateDatepicker();         //更新日历
	this._checkOffset(target);        //初始化位置
	this.dpDiv.style.position = "absolute";
	this.dpDiv.style.zIndex = "9999";
	this.dpDiv.style.display = "block";
}
Datepicker.prototype._setDateFromField=function(target){
	//if(target.value === this.lastVal){return;}
	var dates = this.lastVal = target.value ? target.value : null;
	var date = new Date();
	//date = dates ? this.parseDate(dates) : new Date();
	this.selectedDay = date.getDate();
	this.drawMonth = this.selectedMonth = date.getMonth();
	this.drawYear = this.selectedYear = date.getFullYear();
	this.currentDay = (dates ? date.getDate() : 0);
	this.currentMonth = (dates ? date.getMonth() : 0);
	this.currentYear = (dates ? date.getFullYear() : 0);

}
Datepicker.prototype._updateDatepicker=function(){
	this.maxRows = 4;
	this.dpDiv.innerHTML=this._generateHTML();
}
//初始化位置
Datepicker.prototype._checkOffset=function(target){
	var inputHeight = target.offsetHeight,
		inputOtop = target.offsetTop,
		inputOleft = target.offsetLeft,
		dpHeight = this.dpDiv.offsetHeight,
		dpWidth = this.dpDiv.offsetWidth,
		viewHeight = document.body.clientHeight + document.body.scrollTop,
		viewWidth = document.body.clientWidth + document.body.scrollLeft;

	while (target = target.offsetParent){inputOtop += target.offsetTop; inputOleft += target.offsetLeft;}
	this.dpDiv.style.top = viewHeight - inputOtop > dpHeight? inputOtop + inputHeight+"px" : inputOtop - dpHeight +"px" ;
	this.dpDiv.style.left = viewWidth - inputOleft >= dpWidth? inputOleft +"px" : 0 +"px";
}
//初始化日历内容 MonthYearHeader
Datepicker.prototype._generateMonthYearHeader=function(drawYear,drawMonth){
	var html = "<div class='ui-datepicker-title'>",monthHtml = "<span class='ui-datepicker-month'>";
	monthHtml += drawMonth+1 + "月</span>";
	html += "<span class='ui-datepicker-year'>" + drawYear + "年</span>" + monthHtml+ "</div>";
	return html;
}
//初始化日历内容
Datepicker.prototype._generateHTML=function(){
	var html="",calender="",prev="",next="",thead="",tbody="",cornerClass = " ui-corner-all",drawYear,drawMonth,daysInMonth,leadDays,
	curRows,numRows,
	tempDate = new Date(),
	today = this._daylightSavingAdjust(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())),// clear time
	currentDate = this._daylightSavingAdjust((!this.currentYear ? new Date(9999, 9, 9) :
			new Date(this.currentYear, this.currentMonth, this.currentDay)));
	drawMonth =this.drawMonth;
	drawYear=this.drawYear;
	if(drawMonth < 0){drawMonth += 12;drawYear--;}
	if (drawMonth > 11) {drawMonth = 0;drawYear++;}
	this.drawMonth = drawMonth;
	this.drawYear = drawYear;
	prev = "<a class='ui-datepicker-prev" + cornerClass + "' onmouseover='sevtHandler(this)' onmouseout='sevtHandler(this)' onclick='prevM()'><span class='triangle-w'>prev</span></a>";
	next = "<a class='ui-datepicker-next" + cornerClass + "' onmouseover='sevtHandler(this)' onmouseout='sevtHandler(this)' onclick='nextM()'><span class='triangle-e'>next</span></a>";
	calender += "<div class='ui-datepicker-header" + cornerClass + "'>" + prev + next + this._generateMonthYearHeader(drawYear,drawMonth)+ "</div><table class='ui-datepicker-calendar'><thead><tr>";
	var dow,day,firstday=this.regional["firstDay"];
	for(dow = 0; dow < 7; dow++){  //days of week
		day = (dow + firstday) % 7;
		thead  += "<th" + ((dow + firstday + 6) % 7 >=5 ? " class='ui-datepicker-week-end'":"") + "><span title='"+this.regional["dayNames"][day] +"' >" + this.regional["dayNamesMin"][day] + "</span></th>";
	}
	calender  += thead + "</tr></thead><tbody>";
	daysInMonth = this._getDaysInMonth(drawYear,drawMonth);
	leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstday + 7) % 7;
	curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
	numRows = this.maxRows > curRows ? this.maxRows : curRows;
	this.maxRows = numRows;
	printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
	for (dRow = 0; dRow < numRows; dRow++) {
		calender += "<tr>";tbody ="";
			
		for(idow = 0; idow < 7; idow++){
			otherMonth = (printDate.getMonth() !== drawMonth);
			tbody += "<td class='" + 
				((idow + firstday + 6) % 7 >= 5 ? "ui-datepicker-week-end" : "") + 
				(otherMonth ? " ui-datepicker-other-month" : "") + // highlight days from other months
				"' date-month='" + printDate.getMonth() + "' date-year='" + printDate.getFullYear() + "' date-event='click'><a href='#' class='ui-state-default"+
				(printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") +
				(printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") +
				(otherMonth ? " ui-priority-secondary" : "") +"' onmouseover='evtHandler()' onmouseout='evtHandler()' onclick='returnDate(this)'>" 
				+printDate.getDate()+ "</a></td>";
				printDate.setDate(printDate.getDate() + 1);
				printDate = this._daylightSavingAdjust(printDate);
		}
		calender += tbody + "</tr>";
	}
	
	calender += "</tbody></table></div>";
	html += calender;
	return html;
}
//判断并返回每个月的天数
Datepicker.prototype._getDaysInMonth=function(year,month){
	return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
}
//判断每个月的第一天是星期几
Datepicker.prototype._getFirstDayOfMonth=function(year,month){
	return new Date(year, month, 1).getDay();
}
Datepicker.prototype._daylightSavingAdjust=function(date){
	if(!date){
		return null;
	}
	date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
	return date;
}
Datepicker.prototype.parseDate=function(dateVal){
	return this._daylightSavingAdjust(new Date(dateVal.split("/")[0],parseInt(dateVal.split("/")[1])-1,dateVal.split("/")[2]));
}


//日历表Table 中 a 元素的 鼠标事件
function evtHandler(){
	var eventTarget = getEvtTarget();
	var eventType = window.event.type;
	if(eventType == "mouseover"){
		eventTarget.className +=" ui-state-hover";
	}
	if(eventType == "mouseout"){
		var clsname = eventTarget.className;
		eventTarget.className = clsname.substring(0,clsname.indexOf(" ui-state-hover"));
	}
}
function sevtHandler(obj){
	var eventType = window.event.type;
	if(eventType == "mouseover"){
		datepicker.isFocus = true;
		obj.className +=" ui-state-hover";
		if (obj.className.indexOf("ui-datepicker-prev") !== -1) {
			obj.className += " ui-datepicker-prev-hover";
		}
		if (obj.className.indexOf("ui-datepicker-next") !== -1) {
			obj.className += " ui-datepicker-next-hover";
		}
	}
	if(eventType == "mouseout"){
		datepicker.isFocus = false;
		var clsname = obj.className;
		obj.className = clsname.substring(0,clsname.indexOf(" ui-state-hover"));
	}
}
function prevM(){
	datepicker.drawMonth--;
	datepicker._updateDatepicker();
}
function nextM(){
	datepicker.drawMonth++;
	datepicker._updateDatepicker();
}
function returnDate(obj){
	var otd = obj.parentNode;
	var month =parseInt(otd.getAttribute("date-month"))+1,
		year = parseInt(otd.getAttribute("date-year")),
		day = obj.innerHTML;
	datepicker.evtTarget.value = year + "/" + month + "/" + day;
	datepicker._hideDatepicker(datepicker.evtTarget);
}
