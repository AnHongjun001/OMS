<?php
    $title = array();
    $next  = array();
    $son   = array();
    $ico   = array();
    $page  = array();
    $cnt = 0;
    
    function treat_navigation($navigation){
        global $title, $next, $son, $ico, $page, $cnt;
        $max_n = count($navigation);
        foreach ($navigation as $key => $value){
            $max_n--;
            $now = $cnt++;
            $title[$now] = $key;
            $ico[$now] = isset($value['ico']) ? $value['ico'] : '';
            $page[$now] = isset($value['page']) ? $value['page'] : '';
            if(isset($value['son'])){
                $son[$now] = $cnt;
                treat_navigation($value['son']);
            }else{
                $son[$now] = -1;
            }
            $next[$now] = $max_n == 0 ? -1 : $cnt;
        }
    }
    
    $navigation_json = file_get_contents('./json/admin.navigation.json');
    $navigation_json = json_decode($navigation_json, true);
    treat_navigation($navigation_json);
    $_response->append('title', $title);
    $_response->append('next', $next);
    $_response->append('son', $son);
    $_response->append('ico', $ico);
    $_response->append('page', $page);
    $_response->append('active', 0);
?>
