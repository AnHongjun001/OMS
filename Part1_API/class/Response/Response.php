<?php
    class Response{
        private $data;
        private $error_code = array(
            0 => 'Success!',
            1 => 'Need Login!',
            2 => 'Illegal Request!',
            3 => 'Login Error!',
            4 => 'No Entry!'
        );
        
        function __construct(){
            $this->data = array();
            $this->data['code'] = 0;
            $this->data['info'] = $this->error_code[0];
        }
        
        public function append($key, $value){
            $this->data[$key] = $value;
        }
        
        public function error($error_code, $error_msg=''){
            if($error_code) $this->clear();
            $this->data['code'] = $error_code;
            if($error_msg=='') $this->data['info'] = $this->error_code[$error_code];
            else $this->data['info'] = $error_msg;
        }
        
        public function get_data(){
            return $this->data;
        }
        
        public function set_data($data){
            $this->data = $data;
            $this->data['code'] = 0;
            $this->data['info'] = $this->error_code[0];
        }
        
        public function print_json(){
            print json_encode($this->data, JSON_UNESCAPED_UNICODE);
        }
        
        private function clear(){
            $this->data = array();
        }
    }
?>