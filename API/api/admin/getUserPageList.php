<?php
    $result = $_database->select_('user_pagelist');
    $_response->append('TableData', $result);
?>