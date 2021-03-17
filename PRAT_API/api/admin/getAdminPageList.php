<?php
    $result = $_database->select_('admin_pagelist');
    $_response->append('TableData', $result);
?>