<?php
        
    $changeid=$_request->data['id'];
    $Array['api_name']=$_request->data['api_name'];
    $Array['api_info']=$_request->data['api_info'];
    $Array['api_entry']=$_request->data['api_entry'];
    $_database->update_('hr_apilist',$Array,"ID=$changeid");
    
    $_response->error(0,'HR用户api信息修改成功！');
    
?>