<?php
    class Request{
        public $data;
        public $username;
        public $usertype;
        public $token;
        public $method;
        
        function __construct($post_data){
            if($this->is_json($post_data)) $this->data = json_decode($post_data, true);
            else die('{}');
            if(!isset($this->data['_username'])) die('{"code":"2", "info":"非法访问！"}');
            if(!isset($this->data['_usertype'])) die('{"code":"2", "info":"非法访问！"}');
            if(!isset($this->data['_token'])) die('{"code":"2", "info":"非法访问！"}');
            if(!isset($this->data['_request'])) die('{"code":"2", "info":"非法访问！"}');
            $this->username = $this->data['_username'];
            $this->usertype = $this->data['_usertype'];
            $this->token = $this->data['_token'];
            $this->method = $this->data['_request'];
            if($this->usertype!='hr' && $this->usertype!='user' && $this->usertype!='admin'){
                if($this->method!='getBaseInfo' && $this->method!='test') die('{}');
            }
            unset($this->data['_username']);
            unset($this->data['_usertype']);
            unset($this->data['_token']);
            unset($this->data['_request']);
        }
        
        private function is_json($string){
            json_decode($string);
            return (json_last_error() == JSON_ERROR_NONE);
        }
    }
?>