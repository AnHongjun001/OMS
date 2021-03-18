function apimgr_Init(){
    var post_data = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"get' + window.usertype + 'ApiList"}';
    table_output = '';
    ajax(api_server, post_data, apimgr_InitTable, false, '');
    $('#apimgr_title').html(window.usertype_ch + '-API注册列表');
    $('#MyTable').dataTable();
}

function apimgr_InitTable(obj){
    table_output += '<thead><tr>';
    table_output += '<th>ID</th>';
    table_output += '<th>API名称</th>';
    table_output += '<th>API备注</th>';
    table_output += '<th>API权限</th>';
    table_output += '<th>API状态</th>';
    table_output += '<th>操作</th>';
    table_output += '</thead>';
    table_output += '<tbody>';
    for(i = 0; i<obj.TableData.length; ++i){
        var id = obj.TableData[i].ID;
        table_output += '<tr>';
        table_output += '<td style="vertical-align:middle;text-align:center;">' + id + '</td>';
        table_output += '<td><input class="form-control" value="' + obj.TableData[i].api_name + '" id="api_name_' + id + '"></td>';
        table_output += '<td><input class="form-control" value="' + obj.TableData[i].api_info + '" id="api_info_'+ id + '"></td>';
        table_output += '<td><input class="form-control" value="' + obj.TableData[i].api_entry + '" id="api_entry_'+ id + '"></td>';
        table_output += '<td style="vertical-align:middle;text-align:center;">';
        if(obj.TableData[i].api_status==1) table_output += '<i class="fa fa-check-square-o"></i><span style="color:green">正常</span>';
        else table_output += '<i class="fa fa-minus-square"></i><span style="color:red">缺失</span>';
        table_output += '</td>';
        table_output += '<td><a class="btn btn-primary" onclick="set_api(';
        table_output += id;
        table_output += ')">提交修改</a>&nbsp;&nbsp;&nbsp;<a class="btn btn-primary" onclick="del_api(';
        table_output += id;
        table_output += ')">删除</a></td>';
        table_output += '</tr>';
    }
    table_output += '</tbody>';
    document.getElementById('MyTable').innerHTML = table_output;
}

function del_api_success(obj){
    alert('删除成功！');
    apimgr_Init();
}

function del_api_error(obj){
    alert('发生错误：' + obj.info);
}

function del_api(id){
    var msg = "您真的确定要删除吗";
    if (confirm(msg)!==true) return;
    var post_data = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"del'+ window.usertype +'Api"';
    post_data += ',"id":"' + id + '"}';
    ajax(api_server, post_data, del_api_success, true, del_api_error);
}

function set_api_success(obj){
    alert('修改成功！');
    apimgr_Init();
}

function set_api_error(obj){
    alert('发生错误：' + obj.info);
}

function set_api(id){
    var api_name = $('#api_name_' + id).val();
    var api_info = $('#api_info_' + id).val();
    var api_entry = $('#api_entry_' + id).val();
    if(api_name==''){
        alert('API名称不能为空！');
        $('#api_name_' + id).focus();
        return;
    }
    if(api_info==''){
        alert('API备注不能为空！');
        $('#api_info_' + id).focus();
        return;
    }
    if(api_entry==''){
        alert('API权限码不能为空！');
        $('#api_entry_' + id).focus();
        return;
    }
    var post_data = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"set'+ window.usertype +'Api"';
    post_data += ',"id":"' + id + '"';
    post_data += ',"api_name":"' + api_name + '"';
    post_data += ',"api_entry":"' + api_entry + '"';
    post_data += ',"api_info":"' + api_info + '"}';
    ajax(api_server, post_data, set_api_success, true, set_api_error);
}

function clear_reg(){
    $('#new_api_name').val('');
    $('#new_api_info').val('');
    $('#new_api_entry').val('');
}

function reg_new_api_success(obj){
    alert('API注册成功！');
    $('#reg_api').html('注册');
    $('#reg_api').attr('disabled', false);
    clear_reg();
    apimgr_Init();
}

function reg_new_api_error(obj){
    alert('发生错误：' + obj.info);
    $('#reg_api').html('注册');
    $('#reg_api').attr('disabled', false);
}

function reg_new_api(){
    var api_name = $('#new_api_name').val();
    var api_info = $('#new_api_info').val();
    var api_entry = $('#new_api_entry').val();
    if(api_name==''){
        alert('API名称不能为空！');
        $('#new_api_name').focus();
        return;
    }
    if(api_info==''){
        alert('API备注不能为空！');
        $('#new_api_info').focus();
        return;
    }
    if(api_info==''){
        alert('API权限不能为空！');
        $('#new_api_entry').focus();
        return;
    }
    $('#reg_api').html('等待...');
    $('#reg_api').attr('disabled', true);
    var post_data = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"reg'+ window.usertype +'Api"';
    post_data += ',"api_name":"' + api_name + '"';
    post_data += ',"api_entry":"' + api_entry + '"';
    post_data += ',"api_info":"' + api_info + '"}';
    ajax(api_server, post_data, reg_new_api_success, true, reg_new_api_error);
}