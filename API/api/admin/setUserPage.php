<?php
    $id = $_request->data['id'];
    $value['page_name'] = $_request->data['page_name'];
    $value['page_info'] = $_request->data['page_info'];
    $value['page_stitle'] = $_request->data['page_stitle'];
    $value['page_addr'] = $_request->data['page_addr'];
    $value['page_htm_path'] = $_request->data['page_htm_path'];
    $value['page_js_path'] = $_request->data['page_js_path'];
    $_database->update_('user_pagelist', $value, "ID=$id");
?>