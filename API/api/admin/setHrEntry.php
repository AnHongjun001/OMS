<?php
    $id = $_request->data['id'];
    $value['api_entry'] = $_request->data['api_entry'];
    $_database->update_('hr_userlist', $value, "ID=$id");
?>