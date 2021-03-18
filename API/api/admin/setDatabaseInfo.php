<?php
    $json['user'] = $_request->data['db_user'];
    $json['pswd'] = $_request->data['db_pswd'];
    $json['url'] = $_request->data['db_url'];
    $json['port'] = $_request->data['db_port'];
    $json['name'] = $_request->data['db_name'];
    $json['pre'] = $_request->data['db_pre'];
    file_put_contents('./json/Database.json', json_encode($json));
?>