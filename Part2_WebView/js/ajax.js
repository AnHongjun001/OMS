var api_server = "https://api.thinker2021.cn/";
var view_server = "http://www.thinker2021.cn/";
var $_GET = getQueryVariable();
var void_post = '{"_username":"", "_token":"", "_usertype":"", "_request":"getBaseInfo"}';

function ajax(url, post_data, call_back_function, option, err_call_back_function){
    if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
    	var xmlhttp = new XMLHttpRequest();
    }else{// code for IE6, IE5
    	var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
            if(!isJSON(xmlhttp.responseText)){
                var obj = new Object();
                obj.info = '请求失败';
                if(err_call_back_function=='')
                    alert("发生错误：服务器错误。");
                else err_call_back_function(obj);
                return;
            }
            var obj = JSON.parse(xmlhttp.responseText);
            if(obj.code==undefined || obj.code!=0){
                if(err_call_back_function==''){
                    if(obj.info==undefined) obj.info = '服务器拒绝了您的请求。';
                    alert("发生错误：" + obj.info);
                }else err_call_back_function(obj);
            }
            else call_back_function(obj);
        }else if(xmlhttp.readyState==4){
            var obj = new Object();
            obj.info = '服务器错误!';
            err_call_back_function(obj);
            return;
        }
    }
    post_data = "data=" + post_data;
    xmlhttp.open("POST", url, option);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(post_data);
}

function get_innerHTML(url){
    if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
    	var xmlhttp = new XMLHttpRequest();
    }else{// code for IE6, IE5
    	var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
            document.getElementById("site-page").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
}

function isJSON(str) {
    if (typeof str == 'string') {
        try {
            JSON.parse(str);
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }
    console.log('It is not a string!')    
    return false;
}

function getQueryVariable(){
    var url = location.search;
    var rst = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var parts = str.split("&");
        for(var i = 0; i < parts.length; i++) {
            rst[parts[i].split("=")[0]]=decodeURI(parts[i].split("=")[1]);
        }
    }
    return rst;
}

function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
