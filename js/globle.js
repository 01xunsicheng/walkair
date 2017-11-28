//保留两位小数
template.helper('dec2', function(data) {
	return data.toFixed(2);
});
//判断当前浏览器的版本是否为ie8
function isIE8() {
	if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0") {
		return true;
	} else {
		return false;
	}
}

//获取cookies中的值
function getCookie(cookieName) {
	var ecookieName = helper.mencode(cookieName);
	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");
	for (var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if (ecookieName == arr[0]) {
			return helper.mdecode(arr[1]);
		}
	}
	return "";
}
//获取url中的参数

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) return unescape(r[2]);
	return null; //返回参数值
}

//联系我们
function getContactUs() {
	var postData = {};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': config.getContactUs,
		'success': function(data) {
			if (data) {
				var data = {
					list1: data.map["1"],
					list2: data.map["2"],
					list3: data.map["3"]
				};
				var html = template('contact-tmpl', data);
				$('#contact').html(html);
				//js代码开始
				$(".con_list").each(function() {
					$(this).find("li:odd").css({
						"marginLeft": "43px"
					})
				});
				//js代码结束
			} else {
				alert(data.message);
			};
		}
	});
};
//加入我们
function getRecruit() {
	var postData = {};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': config.getRecruit,
		'success': function(data) {
			if (data) {
				var data = {
					list: data.object
				};
				var html = template('join_list-tmpl', data);
				$('#join_list').html(html);

				//js代码开始
				$("#join_list .name").each(function() {
					$(".content").hide();
					$(".content:first").show();
					$("i:first").addClass("select");

					$(this).click(function() {
						$(this).parent().find(".content").toggle(100);
						$(this).parent().find("i").toggleClass("select")

					});

				});
				//js代码结束

			} else {
				alert(data.message);
			};
		}
	});
};

//产品列表
function getProduct() {
	var postData = {};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': config.getProduct,
		'success': function(data) {
			if (data) {
				var data = {
					list: data.object
				};
				var html = template('product-tmpl', data);
				$('#product').html(html);

				//js代码开始
				$("#product").each(function() {
					$(this).find("li:even").addClass("li_left");
					$(this).find("li:odd").addClass("li_right");
				});
				//js代码结束

			} else {
				alert(data.message);
			};
		}
	});
};

//页面基本信息
function getCatlog() {
	var postData = {};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': config.getCatlog,
		'success': function(data) {
			if (data) {
				var data = {
					list: data.object
				};
				//加入我们的广告图片
				$("#join_src").attr("src", data.list.joinUsFile);
				//加入我们下面的标题
				$("#join_name").attr("src", data.list.joinUsSmallFile);
				//app下载页面图片
				$("#download_pic").attr("src", data.list.appBackImgFile);
				//app下载页面
				$("#load1").attr("href", data.list.iosUrl);
				$("#load2").attr("href", data.list.androidUrl);
				$("#buy").attr("href", data.list.payUrl);
				//联系我们页面
				$("#contact_banner").attr("src", data.list.contactUsFile);

				//				var html = template('product-tmpl', data);
				//				$('#product').html(html);
			} else {
				alert(data.message);
			};
		}
	});
}

//公司简介
function getCompany() {
	var postData = {};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': config.getCompany,
		'success': function(data) {
			if (data) {
				var data = {
					list: data.object
				};
				var html = template('about-tmpl', data);
				$('#about').html(html);

			} else {
				alert(data.message);
			};
		}
	});
};

//获取产品详情
function getProductDetails(tid) {
	var postData = {
		'productId': tid
	};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': config.getProductDetails,
		'success': function(data) {
			if (data) {
				var data = {
					list: data.map.title,
					info: data.object,
					result: JSON.parse(data.object.productResult),
					product: JSON.parse(data.object.productFun),
					productStandardHand: JSON.parse(data.object.productStandardHand),
					productAttestationPhoto: JSON.parse(data.object.productAttestationPhoto)
				};
				var html = template('technique-tmpl', data);
				$('#technique').html(html);
				//js代码开始
				$("#menu a:first").addClass("current");
				$(".pic").imgbox({
		'speedIn'		: 0,
		'speedOut'		: 0,
		'alignment'		: 'center',
		'overlayShow'	: true,
		'allowMultiple'	: false
	});
				//js代码结束
				

			} else {
				alert(data.message);
			};
		}
	});
};

//首页
function getHomePage() {
	var postData = {

	};
	$.ajax({
		'type': 'post',
		'dataType': 'json',
		'data': postData,
		'url': config.getHomePage,
		'success': function(data) {
			if (data) {
				var data = {
					img: data.object,
					info: data.object.mode1,
					model2Photo: JSON.parse(data.object.model2Photo),
					model3Photo: JSON.parse(data.object.model3Photo),
					model4TitlePhoto: JSON.parse(data.object.model4TitlePhoto),
					model5Photo: JSON.parse(data.object.model5Photo),
					model6Photo: JSON.parse(data.object.model6Photo),
					model8Photo: JSON.parse(data.object.model8Photo),
					model9Photo: JSON.parse(data.object.model9Photo),
					model10Photo: JSON.parse(data.object.model10Photo)
						//	productColor: JSON.parse(data.object.mode1.productColor)
				};
				if (data.info) {
					data.productColor = JSON.parse(data.info.productColor);
				} else {
					$("#banner").hide();
				}
			//	console.log(data.info);
				var html = template('index-tmpl', data);
				$('#index').html(html);
				//js代码开始
				//呼吸健康好环境效果
				$(".img3").mouseover(function() {
					$(".img3_1").animate({
						"bottom": "0"
					},1000);
				});
				//	$("#banner_right").mouseover(function() {
//					延迟一秒执行
					setTimeout(function(){
						$("#banner_right").animate({
						"right": "0"
					},1000);
					},1000);
					
//				});
				//选项卡
				$li = $(".hq i");
				$ul = $(".banner .myimg");
				$li.each(function() {
					$ul.eq(0).show();
					$li.eq(0).addClass("cur");
					$(this).click(function() {

						$index = $(this).index();
						$li.eq($index).addClass("cur").siblings().removeClass('cur');
						$ul.hide().eq($index).show();
					})
				});
				//				环境动画开始
				$(".img6").mouseover(function() {
					$(".dbimg").animate({
						"bottom": "0"
					},1000);
					$(".qllist").addClass("qlmove");
				});
				//			首页视频
//				jwplayer('mediaplayer').setup({
//					'flashplayer': 'jwplayer/jwplayer.flash.swf',
//					'image': 'img/index/index_08.png',
//					'id': 'playerID',
//					'screencolor': "#fff", //播放器颜色
//					'width': '100%',
//					'aspectratio': '10:6',
//					'repeat': "always", //重复播放
//					'file': 'jwplayer/sp.flv'
//				});
//jwplayer('mediaplayer').setup({
//  'flashplayer': 'jwplayer/jwplayer.flash.swf',
//	'image': 'img/index/index_08.png',
//  'id': 'playerID',
//  'width': '100%',
//	'aspectratio':'10:6',
//  'file': 'jwplayer/sp.mp4'
//});

			//	console.log(jwplayer('mediaplayer'));
				//首页轮播
				var ShowPre1 = new ShowPre({
					box: "banner_index",
					loop: 1,
					auto: 1
				});
				//js代码结束

			} else {
				alert(data.message);
			};
		}
	});
};
