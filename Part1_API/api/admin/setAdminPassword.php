<?php
    
    $queryname=$_request->data['id'];
    $Array['password']=$_request->data['password'];
    $_database->update_('admin_userlist',$Array,"ID='$queryname'");
    
    $_response->error(0,'管理员用户密码修改成功！');
    
?>