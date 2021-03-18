<?php
    include './plugin/debug/debug.php';
    header("Content-type:text/html;charset=utf-8");
    
    include './class/Database/Database.php';
    include './class/Request/Request.php';
    include './class/Response/Response.php';
    include './class/BaseInfo/BaseInfo.php';
    include './class/Log/Log.php';
    
    if(!isset($_POST['data'])) die('{"code":"2", "info":"非法访问！"}');
    
    $_database = new Database();
    $_request = new Request($_POST['data']);
    $_response = new Response();
    $_baseinfo = new BaseInfo($_database);
    $_log = new Log();
    
    $_baseinfo->usertype = $_request->usertype;
    $_database->type = $_request->usertype . '_';
    $include_path = './api/';
    
    if($_request->method!='login' && $_request->method!='getBaseInfo' && $_request->method!='test'){
        $include_path .= $_request->usertype . '/';
        include './plugin/security/security.php';
    }
    
    $include_path .= $_request->method . '.php';
    if(!file_exists($include_path)){
        $_response->error(2);
        $_response->print_json();
        exit(0);
    }
    
    include $include_path;
    
    $_response->print_json();
?>