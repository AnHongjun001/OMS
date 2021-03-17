<?php
    $result = $_database->select_('user_userlist', '', 'ID, username, password');
    $_response->append('TableData', $result);
?>