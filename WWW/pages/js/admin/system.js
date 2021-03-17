var post_data = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"getAllBaseInfo"}';
ajax(api_server, post_data, system_InitValues, false, '');
change_copyright();

function system_InitValues(obj){
    document.getElementById("sys_title").value = obj.title;
    document.getElementById("sys_logo").value = obj.logo;
    document.getElementById("sys_setup_date").value = obj.setup_date;
    document.getElementById("sys_token_key").value = obj.token_key;
    document.getElementById("sys_effect_time").value = obj.effect_time;
    document.getElementById("sys_firm_name").value = obj.firm_name;
    document.getElementById("sys_view_server").value = obj.view_server;
    document.getElementById("sys_api_server").value = obj.api_server;
    document.getElementById("sys_copyright_format").value = obj.copyright_format;
    $('#sys_js_path').val(obj.js_path);
    $('#sys_htm_path').val(obj.htm_path);
}

function submit_baseinfo_error(obj){
    alert('发生错误：' + obj.info);
    document.getElementById('sub').removeAttribute('disabled');
    document.getElementById('sub').innerHTML = '提交修改';
}

function submit_baseinfo_success(obj){
    alert('修改成功！');
    location.replace(location.href);
}

function submit_baseinfo(){
    var post = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"setBaseInfo"';
    post += ',"title":"' + document.getElementById("sys_title").value + '"';
    post += ',"logo":"' + document.getElementById("sys_logo").value + '"';
    post += ',"setup_date":"' + document.getElementById("sys_setup_date").value + '"';
    post += ',"token_key":"' + document.getElementById("sys_token_key").value + '"';
    post += ',"effect_time":"' + document.getElementById("sys_effect_time").value + '"';
    post += ',"firm_name":"' + document.getElementById("sys_firm_name").value + '"';
    post += ',"view_server":"' + document.getElementById("sys_view_server").value + '"';
    post += ',"api_server":"' + document.getElementById("sys_api_server").value + '"';
    post += ',"js_path":"' + $('#sys_js_path').val() + '"';
    post += ',"htm_path":"' + $('#sys_htm_path').val() + '"';
    post += ',"copyright_format":"' + document.getElementById("sys_copyright_format").value + '"}';
    document.getElementById('sub').disabled = '';
    document.getElementById('sub').innerHTML = '等待...';
    ajax(api_server, post, submit_baseinfo_success, true, submit_baseinfo_error);
}

function view_page(){
    document.title = document.getElementById("sys_title").value;
	document.getElementById("firm_name").innerHTML = document.getElementById("sys_firm_name").value;
	document.getElementById("site_cprt").innerHTML = document.getElementById("view_copyright_format").value;
	change_copyright();
}

function reload_page(){
    document.title = MyPage.title;
	document.getElementById("firm_name").innerHTML = MyPage.firm_name;
	document.getElementById("site_cprt").innerHTML = MyPage.cprt;
	var post_data = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"getAllBaseInfo"}';
	ajax(api_server, post_data, system_InitValues, false, '');
	change_copyright();
}

 function getNowFormatDate() {
        var date = new Date();
        var seperator1 = ".";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }


function change_copyright(){
    var current_date = getNowFormatDate();
    var base_string = document.getElementById('sys_copyright_format').value;
    base_string = base_string.replace('$title$', document.getElementById('sys_title').value);
    base_string = base_string.replace('$setup_date$', document.getElementById('sys_setup_date').value);
    base_string = base_string.replace('$current_date$', current_date);
    base_string = base_string.replace('$firm_name$', document.getElementById('sys_firm_name').value);
    document.getElementById('view_copyright_format').value = base_string;
}
