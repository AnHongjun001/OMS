<?php
    class BaseInfo{
        public $title;
        public $logo;
        public $firm_name;
        public $setup_date;
        public $current_date;
        public $token_key;
        public $effect_time;
        public $copyright_format;
        public $cprt;
        
        public $view_server;
        public $api_server;
        
        public $htm_path;
        public $js_path;
        
        public $usertype;
        
        function __construct($_database){
            $result = $_database->select('baseinfo');
            $this->title            = $result[0]['_value'];
            $this->logo             = $result[1]['_value'];
            $this->firm_name        = $result[2]['_value'];
            $this->setup_date       = $result[3]['_value'];
            $this->token_key        = $result[4]['_value'];
            $this->effect_time      = $result[5]['_value'];
            $this->current_date     = date('Y.m.d');
            $this->view_server      = $result[7]['_value'];
            $this->api_server       = $result[8]['_value'];
            $this->htm_path         = $result[9]['_value'];
            $this->js_path          = $result[10]['_value'];
            
            $copyright = $this->copyright_format = $result[6]['_value'];
            $copyright = str_replace('$title$', $this->title, $copyright);
            $copyright = str_replace('$firm_name$', $this->firm_name, $copyright);
            $copyright = str_replace('$setup_date$', $this->setup_date, $copyright);
            $copyright = str_replace('$current_date$', $this->current_date, $copyright);
            $this->cprt = $copyright;
        }
    }
?>