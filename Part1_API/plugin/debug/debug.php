<?php
    if(!isset($_POST['data']))
        $_POST['data'] = file_get_contents('./plugin/debug/debug.json');
?>