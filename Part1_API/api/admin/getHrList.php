<?php
    $result = $_database->select_('hr_userlist', '', 'ID, username, password');
    $_response->append('TableData', $result);
?>