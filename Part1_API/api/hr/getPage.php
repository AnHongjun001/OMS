<?php
    $page = $_request->data['page'];
    $result = $_database->select('pagelist', "page_name='$page'");
    if(empty($result)){
        $_response->append('addr', array('出错啦', '页面不存在！'));
        $_response->append('js', $_baseinfo->js_path . 'default.js');
        $_response->append('htm', $_baseinfo->htm_path . 'default.htm');
        $_response->append('stitle', '该页面不存在');
    }else{
        $page_js_path = $result[0]['page_js_path'];
        $page_htm_path = $result[0]['page_htm_path'];
        $page_js_path = str_replace('$js_path$', $_baseinfo->js_path . $_baseinfo->usertype . '/', $page_js_path);
        $page_htm_path = str_replace('$htm_path$', $_baseinfo->htm_path . $_baseinfo->usertype . '/', $page_htm_path);
        $_response->append('addr', explode(',', $result[0]['page_addr']));
        $_response->append('js', $page_js_path);
        $_response->append('htm', $page_htm_path);
        $_response->append('stitle', $result[0]['page_stitle']);
    }
?>