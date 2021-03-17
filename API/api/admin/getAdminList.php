<?php
    $result = $_database->select_('admin_userlist', '', 'ID,username,password');
    $_response->append('TableData', $result);
?>