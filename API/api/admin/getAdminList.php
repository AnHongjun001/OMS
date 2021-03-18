<?php
    $result = $_database->select_('admin_userlist', '', 'ID,username,password,api_entry');
    $_response->append('TableData', $result);
?>