function pagemgr_Init(){
    var post_data = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"get' + window.usertype + 'PageList"}';
    table_output = '';
    ajax(api_server, post_data, pagemgr_InitTable, false, '');
    $('#pagemgr_title').html(window.usertype_ch + '-页面注册列表');
    $('#MyTable').dataTable();
}

function pagemgr_InitTable(obj){
    table_output += '<thead><tr>';
    table_output += '<th>ID</th>';
    table_output += '<th>页面名称</th>';
    table_output += '<th>页面备注</th>';
    table_output += '<th>页面小标题</th>';
    table_output += '<th>页面小地址</th>';
    table_output += '<th>页面htm路径</th>';
    table_output += '<th>页面js路径</th>';
    table_output += '<th>操作</th>';
    table_output += '</thead>';
    table_output += '<tbody>';
    for(i = 0; i<obj.TableData.length; ++i){
        var id = obj.TableData[i].ID;
        table_output += '<tr>';
        table_output += '<td style="vertical-align:middle;text-align:center;">' + id + '</td>';
        table_output += '<td><input class="form-control" value="' + obj.TableData[i].page_name + '" id="page_name_' + id + '"></td>';
        table_output += '<td><input class="form-control" value="' + obj.TableData[i].page_info + '" id="page_info_' + id + '"></td>';
        table_output += '<td><input class="form-control" value="' + obj.TableData[i].page_stitle + '" id="page_stitle_' + id + '"></td>';
        table_output += '<td><input class="form-control" value="' + obj.TableData[i].page_addr + '" id="page_addr_' + id + '"></td>';
        table_output += '<td><input class="form-control" value="' + obj.TableData[i].page_htm_path + '" id="page_htm_path_' + id + '"></td>';
        table_output += '<td><input class="form-control" value="' + obj.TableData[i].page_js_path + '" id="page_js_path_' + id + '"></td>';
        table_output += '<td><a class="btn btn-primary" onclick="set_page(';
        table_output += id;
        table_output += ')">提交修改</a>&nbsp;&nbsp;&nbsp;<a class="btn btn-primary" onclick="del_page(';
        table_output += id;
        table_output += ')">删除</a></td>';
        table_output += '</tr>';
    }
    table_output += '</tbody>';
    document.getElementById('MyTable').innerHTML = table_output;
}

function set_page_error(obj){
    alert('发生错误！' + obj.info);
    return;
}

function set_page_success(obj){
    alert('页面信息设置成功！'  + obj.info);
    pagemgr_Init();
}

function set_page(id){
    var page_name = $('#page_name_' + id).val();
    var page_info = $('#page_info_' + id).val();
    var page_stitle = $('#page_stitle_' + id).val();
    var page_addr = $('#page_addr_' + id).val();
    var page_htm_path = $('#page_htm_path_' + id).val();
    var page_js_path = $('#page_js_path_' + id).val();
    if(page_name==''){
        alert('页面名称不能为空！');
        $('#page_name_' + id).focus();
    }
    if(page_info==''){
        alert('页面备注不能为空！');
        $('#page_info_' + id).focus();
    }
    if(page_stitle==''){
        alert('页面小标题不能为空！');
        $('#page_stitle_' + id).focus();
    }
    if(page_addr==''){
        alert('页面小地址不能为空！');
        $('#page_addr_' + id).focus();
    }
    if(page_htm_path==''){
        alert('页面htm路径不能为空！');
        $('#page_htm_path').focus();
    }
    if(page_js_path==''){
        alert('页面js路径不能为空！');
        $('#page_js_path').focus();
    }
    var msg = "您确定要修改页面信息吗？";
    if (confirm(msg)!==true) return;
    var post_data = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"set'+ window.usertype +'Page"';
    post_data += ',"page_name":"' + page_name + '"';
    post_data += ',"page_stitle":"' + page_stitle + '"';
    post_data += ',"page_info":"' + page_info + '"';
    post_data += ',"page_addr":"' + page_addr + '"';
    post_data += ',"page_htm_path":"' + page_htm_path + '"';
    post_data += ',"page_js_path":"' + page_js_path + '"';
    post_data += ',"id":"' + id + '"}';
    ajax(api_server, post_data, set_page_success, true, set_page_error);
}

function del_page_error(obj){
    alert('发生错误！' + obj.info);
    return;
}

function del_page_success(obj){
    alert('用户删除成功！'  + obj.info);
    pagemgr_Init();
}

function del_page(id){
    var msg = "您确定要删除页面吗？";
    if (confirm(msg)!==true) return;
    var post_data = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"del'+ window.usertype +'Page"';
    post_data += ',"id":"' + id + '"}';
    ajax(api_server, post_data, del_page_success, true, del_page_error);
}

function clear_reg(){
    $('#new_page_name').val('');
    $('#new_page_info').val('');
    $('#new_page_stitle').val('');
    $('#new_page_addr').val('');
    $('#new_page_htm_path').val('');
    $('#new_page_js_path').val('');
}

function reg_new_page_success(obj){
    alert('页面注册成功！');
    $('#reg_page').html('注册');
    $('#reg_page').attr('disabled', false);
    clear_reg();
    pagemgr_Init();
}

function reg_new_page_error(obj){
    alert('发生错误：' + obj.info);
    $('#reg_page').html('注册');
    $('#reg_page').attr('disabled', false);
}

function reg_new_page(){
    var page_name = $('#new_page_name').val();
    var page_info = $('#new_page_info').val();
    var page_stitle = $('#new_page_stitle').val();
    var page_addr = $('#new_page_addr').val();
    var page_htm_path = $('#new_page_htm_path').val();
    var page_js_path = $('#new_page_js_path').val();
    if(page_name==''){
        alert('页面名称不能为空！');
        $('#new_page_name').focus();
        return;
    }
    if(page_info==''){
        alert('页面备注不能为空！');
        $('#new_page_info').focus();
        return;
    }
    if(page_stitle==''){
        alert('页面小标题不能为空！');
        $('#new_page_stitle').focus();
        return;
    }
    if(page_addr==''){
        alert('页面小地址不能为空!');
        $('#new_page_addr').focus();
        return;
    }
    if(page_htm_path==''){
        alert('页面htm路径不能为空！');
        $('#new_page_htm_path').focus();
        return;
    }
    if(page_js_path==''){
        alert('页面js路径不能为空！');
        $('#new_page_js_path').focus();
        return;
    }
    $('#reg_page').html('等待...');
    $('#reg_page').attr('disabled', true);
    var post_data = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"reg'+ window.usertype +'Page"';
    post_data += ',"page_name":"' + page_name + '"';
    post_data += ',"page_info":"' + page_info + '"';
    post_data += ',"page_stitle":"' + page_stitle + '"';
    post_data += ',"page_addr":"' + page_addr + '"';
    post_data += ',"page_htm_path":"' + page_htm_path + '"';
    post_data += ',"page_js_path":"' + page_js_path + '"}';
    ajax(api_server, post_data, reg_new_page_success, true, reg_new_page_error);
}