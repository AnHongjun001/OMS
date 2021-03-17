<?php
    error_reporting(E_ALL^E_NOTICE^E_WARNING);
    //验证用户身份
    $username = $_request->username;
    $token = $_request->token;
    $result = $_database->select('userlist', "username='$username' AND token='$token'");
    if(empty($result)){
        $_response->error(2, '身份验证失败：用户名或token密钥错误!');
        $_response->print_json();
        exit(0);
    }
    
    //验证token值
    $correct_token = $_request->username . $_request->password . $_request->usertype . $result[0]['time'] . $_baseinfo->token_key;
    $correct_token = md5($correct_token);
    if($correct_token != $_request->token){
        $_response->error(2, '非法访问：使用了伪造的token！');
        $_response->print_json();
        exit(0);
    }
    if(time()>$result[0]['time']){
        $_response->error(1, '需要登陆：访问超时，请重新登陆！(有效登录时间：' . $_baseinfo->effect_time . '秒)');
        $_response->print_json();
        exit(0);
    }
    $user_entry = number_format($result[0]['api_entry']);
    
    //检查API是否合法
    $api_name = $_request->method;
    $result = $_database->select('apilist', "api_name='$api_name'", 'ID,api_entry');
    if(empty($result)){
        $_response->error(2, '非法访问：调用了未注册的API！');
        $_response->print_json();
        exit(0);
    }
    $api_entry = number_format($result[0]['api_entry']);
    
    //验证API权限
    if($api_entry == 0 || ($user_entry & $api_entry) != $api_entry){
        $_response->error(2, 'API请求错误：对不起，您的权限不够。');
        $_response->print_json();
        exit(0);
    }
    
?>