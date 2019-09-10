
/*
*确认订单（下订单）数量编辑、计算订单总价
*使用办法：$(".order-book-list").order();
*$("#order-sum")：订单总金额
*$("#book-num")：商品总件数
*DOM结构:
*<ul class="order-book-list">
*	<li class="clearfix">
*		<a href="#">商品名称</a>
*		<span class="">
*			<span class="book-num-minus"></span>
*			<input type="text" class="edit-book-num" value="1"></input>
*			<span class="book-num-plus"></span></span>
*		<span class="unitPrice">88.0元</span>
*		<a href="#" class=" delete-book">删除</a>
*	</li>
*</ul>
*@author Cynthia
*@Date 2016-01-22
*/
;(function($){
	$.extend($.fn,{
		order:function(settings){
			settings = $.extend({
				orderSum:$("#order-sum"),
				goodsNum:$("#book-num")
			},settings);
			$(this).setOrderSum(settings);
			$(this).find("li").editgoodsNum(settings);
			$(this).deleteGoods(settings);
		},
		/*初始化设置订单总价，商品的总数*/
		setOrderSum:function(settings){
			var orderSum = 0,goodsNum = 0;
			$(this).find("li").each(function(index,ele){
				var num = parseInt($(ele).find("."+CLASSES.unitNum).val()),
				unitPrice = $(this).getPrice($(ele).find("."+CLASSES.unitPrice));
				orderSum += num*unitPrice;
				goodsNum += num;
			});
			settings.orderSum.text($(this).fixed1(orderSum));
			settings.goodsNum.text(goodsNum);
		},
		/*绑定编辑商品数量事件*/
		editgoodsNum:function(settings){
			$(this).find("."+CLASSES.numMinus).live("click",function(){
				var objinput = $(this).parent().find("."+CLASSES.unitNum);
				var numvalue = parseInt(objinput.val());
				if(numvalue == 1){
					return false;
				}else{
					numvalue--;
					objinput.val(numvalue);
					settings.minus = true;
				}
				var unitPrice = $(this).getPrice($(this).parent().parent().find("."+CLASSES.unitPrice));
				$(this).editSum(settings,unitPrice);
			});
			$(this).find("."+CLASSES.numPlus).live("click",function(){
				var objinput = $(this).parent().find("."+CLASSES.unitNum);
				var numvalue = parseInt(objinput.val());
				numvalue++;
				objinput.val(numvalue);
				settings.plus = true;
				var unitPrice = $(this).getPrice($(this).parent().parent().find("."+CLASSES.unitPrice));
				$(this).editSum(settings,unitPrice);
			});
		},
		/*总价及总数调整*/
		editSum:function(settings,unitPrice){
			var orderSum = $(this).getPrice(settings.orderSum);
			var goodsNum = parseInt(settings.goodsNum.text());
			if(settings.minus){
				goodsNum--;
				orderSum -= unitPrice;
				settings.minus = false;
			}
			if(settings.plus){
				goodsNum++;
				orderSum += unitPrice;
				settings.plus = false;
			}
			settings.orderSum.text($(this).fixed1(orderSum));
			settings.goodsNum.text(goodsNum);
		},
		/*删除商品*/
		deleteGoods:function(settings){
			var self = $(this);
			$(this).find("li").find("a."+CLASSES.deleteGoods).live("click",function(){
				$(this).parent().remove();
				settings.delete = true;
				if(settings.delete){
					self.setOrderSum(settings);
					settings.delete = false;
				}
			});
			
		},

		//把字符串形式的价格包含单位元，转化为数字格式的价格
		getPrice:function(obj){
			var priceStr = obj.text(),
				priceStrLen = priceStr.length,
				price = parseFloat(priceStr.substr(0,priceStrLen-1));
			return price;
		},
		//保留小数点后一位
		fixed1:function(str){
			return parseFloat(str).toFixed(1);
		}

	});
	$.order = {};
	var CLASSES = ($.order.classes={
		unitPrice:"unitPrice",
		unitNum:"edit-book-num",/*单个商品的数量*/
		numMinus:"book-num-minus",
		numPlus:"book-num-plus",
		deleteGoods:"delete-book"
	});
})(jQuery);

$(function(){
	$(".order-book-list").order();
});
