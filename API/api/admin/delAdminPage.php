<?php
    $id = $_request->data['id'];
    $_database->del_('admin_pagelist', "ID=$id");
?>