function usermgr_Init(){
    var post_data = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"get' + window.usertype + 'List"}';
    table_output = '';
    ajax(api_server, post_data, usermgr_InitTable, false, '');
    $('#pagemgr_title').html(window.usertype_ch + '-注册用户列表');
    $('#MyTable').dataTable();
}

function usermgr_InitTable(obj){
    table_output += '<thead><tr>';
    table_output += '<th>ID</th>';
    table_output += '<th>用户名</th>';
    table_output += '<th>用户密码</th>';
    table_output += '<th>基础操作</th>';
    table_output += '<th>权限</th>';
    table_output += '<th>权限管理</th>';
    table_output += '</thead>';
    table_output += '<tbody>';
    for(i = 0; i<obj.TableData.length; ++i){
        var id = obj.TableData[i].ID;
        table_output += '<tr>';
        table_output += '<td style="vertical-align:middle;text-align:center;">' + id + '</td>';
        table_output += '<td style="vertical-align:middle;text-align:center;">' + obj.TableData[i].username + '</td>';
        table_output += '<td><input class="form-control" value="' + obj.TableData[i].password + '" id="psd_';
        table_output += id;
        table_output += '"></td>';
        table_output += '<td><a class="btn btn-primary" onclick="set_user(';
        table_output += id;
        table_output += ')">修改密码</a>&nbsp;&nbsp;&nbsp;<a class="btn btn-primary">删除</a></td>';
        table_output += get_entry_info(id);
        table_output += '<td><a class="btn btn-primary">修改权限</a></td>';
        table_output += '</tr>';
    }
    table_output += '</tbody>';
    $('#MyTable').html(table_output);
}

function set_user_error(obj){
    alert('发生错误：' + obj.info);
    return;
}

function set_user_success(obj){
    alert('密码修改成功！');
    usermgr_Init();
}

function set_user(id){
    var password = $('#psd_' + id).val();
    if(password==''){
        alert('用户密码不能为空！');
        $('#psd_' + id).focus();
        return;
    }
    var post_data = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"set'+ window.usertype +'Password"';
    post_data += ',"id":"' + id + '"';
    post_data += ',"password":"' + password + '"}';
    ajax(api_server, post_data, set_user_success, true, set_user_error);
}

function clear_reg(){
    $('#new_user_name').val('');
    $('#new_user_password').val('');
}

function reg_new_user_success(obj){
    alert('用户注册成功！');
    $('#reg_user').html('注册');
    $('#reg_user').attr('disabled', false);
    clear_reg();
    usermgr_Init();
}

function reg_new_user_error(obj){
    alert('发生错误：' + obj.info);
    $('#reg_user').html('注册');
    $('#reg_user').attr('disabled', false);
}

function reg_new_user(){
    var username = $('#new_user_name').val();
    var password = $('#new_user_pswd').val();
    if(username==''){
        alert('用户名称不能为空！');
        $('#new_user_name').focus();
        return;
    }
    if(password==''){
        alert('用户密码不能为空！');
        $('#new_user_pswd').focus();
        return;
    }
    $('#reg_user').html('等待...');
    $('#reg_user').attr('disabled', true);
    var post_data = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"reg'+ window.usertype +'User"';
    post_data += ',"username":"' + username + '"';
    post_data += ',"password":"' + password + '"}';
    ajax(api_server, post_data, reg_new_user_success, true, reg_new_user_error);
}