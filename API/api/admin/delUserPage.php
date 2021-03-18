<?php
    $id = $_request->data['id'];
    $_database->del_('user_pagelist', "ID=$id");
?>