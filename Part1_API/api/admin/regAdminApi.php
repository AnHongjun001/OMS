<?php
    $api_name = $_request->data['api_name'];
    $api_info = $_request->data['api_info'];
    if($api_name=='') $response->error(2);
    else if($api_info=='') $response->error(2);
    else{
        $sql = "SELECT ID from " . $_database->pre . "admin_apilist WHERE api_name='" . $api_name . "'";
        $result = $_database->query($sql, true);
        if(!empty($result)){
            $_response->error('5', '不能注册同名的API！');
        }else{
            $sql = "INSERT INTO " . $_database->pre . "admin_apilist (api_name, api_info) VALUES ('$api_name', '$api_info')";
            $_database->query($sql);
            $sql = "SELECT ID from " . $_database->pre . "admin_apilist WHERE api_name='" . $api_name . "'";
            $result = $_database->query($sql, true);
            if(empty($result)) $_response->error('5', '注册API失败！');
        }
    }
?>