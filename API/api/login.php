<?php
    $username = $_request->username;
    $result = $_database->select('userlist', "username='$username'", 'password');
    if(empty($result) || $_request->token!=$result[0]['password']) $_response->error(3, '账户名或密码错误！');
    else{
        $time = time() + $_baseinfo->effect_time;
        $text = $_request->username . $_request->password . $_request->usertype . $time . $_baseinfo->token_key;
        $token = md5($text);
        $values['token'] = $token;
        $values['time'] = $time;
        $_database->update('userlist', $values, "username='$username'");
        $_response->append('token', $token);
    }
?>