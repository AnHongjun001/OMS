<?php
    $result = $_database->select_('hr_pagelist');
    $_response->append('TableData', $result);
?>