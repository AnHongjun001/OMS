<?php
    include './plugin/debug/debug.php';
    header("Content-type:text/html;charset=utf-8");
    
    include './class/Database/Database.php';
    include './class/BaseInfo/BaseInfo.php';
    
    $_database = new Database();
    $_baseinfo = new BaseInfo($_database);
    
    print md5('123456');
    
    /*
    $_baseinfo->usertype = 'admin';
    $_database->type = 'admin' . '_';
    $emm = 0;
    $results = $_database->select_('admin_apilist');
    foreach ($results as $result){
        $id = $result['ID'];
        $value['api_entry'] = pow(2, $id-1);
        $emm += pow(2, $id-1);
        $_database->update_('admin_apilist', $value, 'ID=' . $id);
    }
    $hehe['api_entry'] = $emm;
    $_database->update_('admin_userlist', $hehe);
    
    $entry = 0;
    for($i = 0; $i<63; ++$i){
        $entry |= pow(2, $i);
    }
    print $entry;
    */
?>