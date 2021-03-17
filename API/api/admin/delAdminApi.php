<?php

    $changeid=$_request->data['id'];
    $_database->del_('admin_apilist',"ID=$changeid");
    
    $_response->error(0,'管理员用户api记录删除成功！');

?>