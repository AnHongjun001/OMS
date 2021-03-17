<?php
    $page_name = $_request->data['page_name'];
    $page_info = $_request->data['page_info'];
    $page_stitle = $_request->data['page_stitle'];
    $page_addr = $_request->data['page_addr'];
    $page_htm_path = $_request->data['page_htm_path'];
    $page_js_path = $_request->data['page_js_path'];
    
    if(!isset($page_name) || $page_name=='') $_response->error(2);
    else if(!isset($page_info) || $page_info=='') $_response->error(2);
    else if(!isset($page_stitle) || $page_stitle=='') $_response->error(2);
    else if(!isset($page_addr) || $page_addr=='') $_response->error(2);
    else if(!isset($page_htm_path) || $page_htm_path=='') $_response->error(2);
    else if(!isset($page_js_path) || $page_js_path=='') $_response->error(2);
    else{
        $result = $_database->select_('admin_pagelist', "page_name='$page_name'");
        if(!empty($result)){
            $_response->error('5', '不能注册同名的页面！');
        }else{
            $values['page_name'] = $page_name;
            $values['page_info'] = $page_info;
            $values['page_stitle'] = $page_stitle;
            $values['page_addr'] = $page_addr;
            $values['page_htm_path'] = $page_htm_path;
            $values['page_js_path'] = $page_js_path;
            $_database->insert_('admin_pagelist', $values);
            $result = $_database->select_('admin_pagelist', "page_name='$page_name'");
            if(empty($result)) $_response->error('5', '注册页面失败！');
        }
    }
    
?>