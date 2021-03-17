<?php
    $result = $_database->query("SELECT ID,api_name,api_info,api_entry FROM " . $_database->pre . "hr_apilist", true);
    $cnt = count($result);
    for($i = 0; $i<$cnt; ++$i){
        if(file_exists('./api/admin/' . $result[$i]['api_name'] . '.php')){
            $result[$i]['api_status'] = 1;
        }else{
            $result[$i]['api_status'] = 0;
        }
    }
    $_response->append('TableData', $result);
?>