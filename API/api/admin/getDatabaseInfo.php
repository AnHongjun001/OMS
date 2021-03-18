<?php
    $dbinfo = file_get_contents('./json/Database.json');
    $dbinfo = json_decode($dbinfo, true);
    $_response->append('dburl', $dbinfo['url']);
    $_response->append('dbuser', $dbinfo['user']);
    $_response->append('dbpswd', $dbinfo['pswd']);
    $_response->append('dbname', $dbinfo['name']);
    $_response->append('dbport', $dbinfo['port']);
    $_response->append('dbpre', $dbinfo['pre']);
?>