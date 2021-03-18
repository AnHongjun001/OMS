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
    table_output += '<th>用户密码(md5)</th>';
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
        table_output += ')">修改密码</a>&nbsp;&nbsp;&nbsp;<a class="btn btn-primary" onclick="del_user(';
        table_output += id;
        table_output += ')">删除</a></td>';
        table_output += get_entry_info(id);
        table_output += '<td><a class="btn btn-primary" onclick="set_entry(';
        table_output += id;
        table_output += ')">修改权限</a></td>';
        table_output += '</tr>';
    }
    table_output += '</tbody>';
    $('#MyTable').html(table_output);
    treat_checkbox(obj);
}

function treat_checkbox(obj){
    for(i = 0; i<obj.TableData.length; ++i){
        var id = obj.TableData[i].ID;
        var checkboxes = document.getElementsByName('entry_' + id);
        var api_entry = obj.TableData[i].api_entry;
        for(j = 0; j<checkboxes.length; ++j){
            if(Number(checkboxes[j].value)!=0 && (Number(checkboxes[j].value) & api_entry) == Number(checkboxes[j].value)){
                checkboxes[j].checked = true;
            }
        }
    }
}

function del_user_error(obj){
    alert('发生错误！' + obj.info);
    return;
}

function del_user_success(obj){
    alert('用户删除成功！'  + obj.info);
    usermgr_Init();
}

function del_user(id){
    var msg = "您确定要删除用户吗？";
    if (confirm(msg)!==true) return;
    var post_data = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"del'+ window.usertype +'"';
    post_data += ',"id":"' + id + '"}';
    ajax(api_server, post_data, del_user_success, true, del_user_error);
}

function set_entry_error(obj){
    alert('发生错误！' + obj.info);
    return;
}

function set_entry_success(obj){
    alert('权限修改成功！');
    usermgr_Init();
}

function set_entry(id){
    var checkboxes = document.getElementsByName('entry_' + id);
    var entry_code = 0;
    for(i = 0; i<checkboxes.length; ++i){
        if(checkboxes[i].checked) entry_code += Number(checkboxes[i].value);
    }
    var msg = "您确定要修改id为" + id + "的权限吗？";
    if (confirm(msg)!==true) return;
    var post_data = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"set'+ window.usertype +'Entry"';
    post_data += ',"id":"' + id + '"';
    post_data += ',"api_entry":"' + entry_code + '"}';
    ajax(api_server, post_data, set_entry_success, true, set_entry_error);
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
    var psd = md5($('#psd_' + id).val());
    $('#psd_' + id).val(psd);
    alert('加密后的密码为：' + $('#psd_' + id).val());
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