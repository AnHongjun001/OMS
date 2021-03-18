var table_output = '';
window.usertype = 'Admin';
window.usertype_ch = '管理员';

usermgr_Init();

function get_entry_info(id){
    var table_output = '';
    table_output += '<td>';
    table_output += '<label><input type="checkbox" value="1" name="entry_' + id + '">浏览权</label>&nbsp;|&nbsp;';
        
    table_output += '<label><input type="checkbox" value="4" name="entry_' + id + '">用户注册权</label>&nbsp;';
    table_output += '<label><input type="checkbox" value="256" name="entry_' + id + '">用户删除权</label>&nbsp;';
    table_output += '<label><input type="checkbox" value="64" name="entry_' + id + '">用户密码修改权</label>&nbsp;';
    table_output += '<label><input type="checkbox" value="128" name="entry_' + id + '">用户权限修改权</label>&nbsp;|&nbsp;';
    
    table_output += '<label><input type="checkbox" value="8" name="entry_' + id + '">页面注册权</label>&nbsp;';
    table_output += '<label><input type="checkbox" value="512" name="entry_' + id + '">页面删除权</label>&nbsp;';
    table_output += '<label><input type="checkbox" value="1024" name="entry_' + id + '">页面信息修改权</label>&nbsp;|&nbsp;';
    
    table_output += '<label><input type="checkbox" value="8" name="entry_' + id + '">API注册权</label>&nbsp;';
    table_output += '<label><input type="checkbox" value="32" name="entry_' + id + '">API删除权</label>&nbsp;';
    table_output += '<label><input type="checkbox" value="16" name="entry_' + id + '">API信息修改权</label>&nbsp;|&nbsp;';
    
    table_output += '<label><input type="checkbox" value="2048" name="entry_' + id + '">数据库信息修改权</label>&nbsp;';
    table_output += '<label><input type="checkbox" value="2" name="entry_' + id + '">全局信息修改权</label>&nbsp;';
    
    table_output += '</td>';
    return table_output;
}
