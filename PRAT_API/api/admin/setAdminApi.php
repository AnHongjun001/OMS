<?php
        
    $changeid=$_request->data['id'];
    $Array['api_name']=$_request->data['api_name'];
    $Array['api_info']=$_request->data['api_info'];
    $Array['api_entry']=$_request->data['api_entry'];
    $_database->update_('admin_apilist',$Array,"ID=$changeid");
    
    $_response->error(0,'管理员用户api信息修改成功！');
    
?>