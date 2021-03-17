<?php
    $Array['_value']=$_request->data['title'];
    $_database->update_('baseinfo', $Array, "_key='title'");
    
    $Array['_value']=$_request->data['firm_name'];
    $_database->update_('baseinfo', $Array, "_key='firm_name'");
    
    $Array['_value']=$_request->data['logo'];
    $_database->update_('baseinfo',$Array,"_key='logo'");
    
    $Array['_value']=$_request->data['setup_date'];
    $_database->update_('baseinfo',$Array,"_key='setup_date'");
    
    $Array['_value']=$_request->data['token_key'];
    $_database->update_('baseinfo',$Array,"_key='token_key'");
    
    $Array['_value']=$_request->data['effect_time'];
    $_database->update_('baseinfo',$Array,"_key='effect_time'");
    
    $Array['_value']=$_request->data['view_server'];
    $_database->update_('baseinfo',$Array,"_key='view_server'");
    
    $Array['_value']=$_request->data['api_server'];
    $_database->update_('baseinfo',$Array,"_key='api_server'");
    
    $Array['_value']=$_request->data['copyright_format'];
    $_database->update_('baseinfo',$Array,"_key='copyright_format'");
    
    $Array['_value']=$_request->data['js_path'];
    $_database->update_('baseinfo',$Array,"_key='js_path'");
    
    $Array['_value']=$_request->data['htm_path'];
    $_database->update_('baseinfo',$Array,"_key='htm_path'");
    
    $_response->error(0, '站点全局信息修改成功！');
?>