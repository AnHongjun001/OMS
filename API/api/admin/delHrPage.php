<?php
    $id = $_request->data['id'];
    $_database->del_('hr_pagelist', "ID=$id");
?>