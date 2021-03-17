<?php

    $changeid=$_request->data['id'];
    $_database->del_('hr_apilist',"ID=$changeid");
    
    $_response->error(0,'HR用户api记录删除成功！');

?>