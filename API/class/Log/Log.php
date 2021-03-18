<?php
    class Log{
        function __construct(){
            file_put_contents('log.txt', '');
        }
        
        public function append($data){
            file_put_contents('log.txt', "$data\n", FILE_APPEND);
        }
    }
?>