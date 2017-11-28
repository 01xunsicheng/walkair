var config = {};
//config.server = location.protocol + '//' + location.host;
config.server='http://139.196.44.56/m/home/';

//公用接口
config.getContactUs = config.server + 'getContactUs'; //联系我们
config.getRecruit = config.server + 'getRecruit'; //加入我们
config.getProduct = config.server + 'getProduct'; //产品列表
config.getCatlog = config.server + 'getCatlog'; //页面基本信息
config.getCompany = config.server + 'getCompany'; //公司简介
config.getProductDetails = config.server + 'getProductDetails'; //产品详情
config.getHomePage = config.server + 'getHomePage'; //首页




//分页
/**
 * 当页面第一次加载时可以用此方法验证是否还有数据
 * 是否调用此方法对分页进行验证对分页结果都没有影响
 * @param {String} url 请求地址
 * @param {JSON} data  ajax请求数据成功后返回的data
 * @param {JSON} myp   分页的配置参数
 * @param {JSON} pdata 除过page和limit之外的请求参数
  */
function pagecheck(url,data,myp,pdata){
	if(data.list.length==myp.limit){
            var postData = {
                'page'  :2,
                'limit' :myp.limit
            };
            //遍历分页时传入的数据
            $.each(pdata, function(key,value) { 
            	postData[key]=value;
            });
        	$.ajax({
        		type:"get",
        		url:url,
        		data:postData,
        		async:myp.asyncKey,
        		success:function(data){
    		        if(data.body.length==0 || data.body.length==undefined){
                        myp.flag=false;
//                      $('.page').hide();
                        $('#next').html('已到尾页');
                        $('#pre').html('<上一页');
                    }else{
                    	myp.flag=true;
                    	$('#pre').html('<上一页');
                    }
            	}
        	});
        }else if(data.list.length<myp.limit){
            myp.flag=false;
//          $('.page').hide();
            $('#next').html('已到尾页');
            $('#pre').html('<上一页');
        }
}
/**
 * 分页方法
 * @param {String} url  请求地址
 * @param {JSON} pdata  除过page和limit之外的请求参数
 * @param {JSON} myp    分页的配置参数
 * @param {String} pattern 模版的id
 * @param {String} type   上一页(pre)或者下一页(next)
 */
function paging(url,pdata,myp,pattern,type){
		if($.trim(type)=='next'){
			helper.next(url,pdata,myp,pattern,type);
		}
		if($.trim(type)=='pre'){
			helper.pre(url,pdata,myp,pattern,type);
		}
			
}
/**
 * 帮助对象
 */
var helper={
	'pre':function(url,pdata,myp,pattern,type){
			myp.flag=true;
            if(myp.page<=1){
                $('#pre').html('已到首页');
                return
            }else{
                $('#pre').html('<上一页');
                $('#next').html('下一页>');
                myp.page=myp.page-1;
            }
            var postData = {
                'page'  :myp.page,
                'limit' :myp.limit
            };
        	 //遍历分页时传入的数据
            $.each(pdata, function(key,value) { 
            	postData[key]=value;
            });
            $.ajax({
                'type':'get',
                'dataType':'json',
                'data':postData,
                'url':url,
                'success':function(data){
                    var data={
                        list:data.body,
                        curpage:myp.page
                    };
                    var html = template(pattern+'-tmpl',data);
                    $('#'+pattern).html(html);
                     if(pattern=='markspaceList'){
                    	$("#markspaceList li:nth-child(3n)").css({marginRight:"0"});
                    }
                }
            });
	
	},
	'next':function(url,pdata,myp,pattern,type){
    	 $('#pre').html('<上一页');  
            var postData = {
                'page'  :myp.page,
                'limit' :myp.limit
            };
            //遍历分页时传入的数据
            $.each(pdata, function(key,value) { 
            	postData[key]=value;
            });
            if(myp.flag==false){
            	 $('#next').html('已到尾页');
            	 return
            }
            if(myp.page==1 && myp.flag){
                postData.page=2;
                myp.page=myp.page+1;    
            }else if(myp.flag){
                myp.page=myp.page+1;
                postData.page=myp.page;
            }else if(myp.page==1){
                postData.page=1;
            }
            
            $.ajax({
                'type':'get',
                'dataType':'json',
                'data':postData,
                'url':url,
                'success':function(data){
                    var data={
                        list:data.body,
                        curpage:myp.page
                    };
					if(data.list.length<myp.limit){
                        myp.flag=false;
                        $('#next').html('已到尾页');
                        $('#pre').html('<上一页');

                    }
					if(data.list.length==0){
                        myp.flag=false;
                        $('#next').html('已到尾页');
                        $('#pre').html('<上一页');
                        myp.page=myp.page-1;
                        return
					}
                    var html = template(pattern+'-tmpl',data);
                    $('#'+pattern).html(html);
                    if(pattern=='markspaceList'){
                    	$("#markspaceList li:nth-child(3n)").css({marginRight:"0"});
                    }
                }
            });
	},
	//自定义加密算法
	'mencode':function(str){
		return str;
	},
	//自定义解密算法
	'mdecode':function(str){
		return str;
	}
};

