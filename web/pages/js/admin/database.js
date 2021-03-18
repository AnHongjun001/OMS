var post_data = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"getDatabaseInfo"}';
ajax(api_server, post_data, database_InitValues, false, '');
change_copyright();

function database_InitValues(obj){
    $('#db_url').val(obj.dburl);
    $('#db_user').val(obj.dbuser);
    $('#db_pswd').val(obj.dbpswd);
    $('#db_port').val(obj.dbport);
    $('#db_name').val(obj.dbname);
    $('#db_pre').val(obj.dbpre);
}

function submit_dbinfo_error(obj){
    alert('发生错误：' + obj.info);
    document.getElementById('sub').removeAttribute('disabled');
    document.getElementById('sub').innerHTML = '提交修改';
}

function submit_dbinfo_success(obj){
    alert('修改成功！');
    //location.replace(location.href);
}

function submit_dbinfo(){
    var post = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"setDatabaseInfo"';
    post += ',"db_url":"' + document.getElementById("db_url").value + '"';
    post += ',"db_user":"' + document.getElementById("db_user").value + '"';
    post += ',"db_pswd":"' + document.getElementById("db_pswd").value + '"';
    post += ',"db_port":"' + document.getElementById("db_port").value + '"';
    post += ',"db_name":"' + document.getElementById("db_name").value + '"';
    post += ',"db_pre":"' + document.getElementById("db_pre").value + '"}';
    document.getElementById('sub').disabled = '';
    document.getElementById('sub').innerHTML = '等待...';
    ajax(api_server, post, submit_dbinfo_success, true, submit_dbinfo_error);
}

function reload_db(){
	var post_data = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"getDatabaseInfo"}';
	ajax(api_server, post_data, database_InitValues, false, '');
}