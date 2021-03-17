var table_output = '';
window.usertype = 'Hr';
window.usertype_ch = 'HR';

usermgr_Init();

function get_entry_info(id){
    var table_output = '';
    table_output += '<td>';
    table_output += '<label><input type="checkbox" value="1" name="entry_' + id + '">浏览权</label>&nbsp;|&nbsp;';
    table_output += '</td>';
    return table_output;
}