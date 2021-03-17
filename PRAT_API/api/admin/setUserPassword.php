<?php
    
    $queryname=$_request->data['id'];
    $Array['password']=$_request->data['password'];
    $_database->update_('user_userlist',$Array,"ID='$queryname'");
    
    $_response->error(0,'个人用户密码修改成功！');
    
?>