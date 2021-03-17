<?php

    $changeid=$_request->data['id'];
    $_database->del_('user_apilist',"ID=$changeid");
    
    $_response->error(0,'个人用户api记录删除成功！');

?>