<?php
    class Database{
        private $url;
        private $user;
        private $pswd;
        private $name;
        private $port;
        public $pre;
        public $type;
        
        private $last_sql = '';
        
        public function __construct(){
            $json = file_get_contents('./json/Database.json');
            $json = json_decode($json, true);
            $this->url = $json['url'];
            $this->user = $json['user'];
            $this->pswd = $json['pswd'];
            $this->name = $json['name'];
            $this->port = $json['port'];
            $this->pre = $json['pre'];
            $this->type = '';
        }

        public function connect(){
            $conn = mysqli_connect($this->url, $this->user, $this->pswd, $this->name, $this->port);
            if(!$conn) die('{"code":"2", "info":"服务器错误！"}');
            return $conn;
        }
        
        public function close($conn){
            mysqli_close($conn);
        }
        
        public function get_last_sql(){
            return $this->last_sql;
        }
        
        public function query($sql, $return_result=false){
            $conn = $this->connect();
            $result = mysqli_query($conn, $sql);
            $this->last_sql = $sql;
            $this->close($conn);
            if(!$return_result) return;
            if(mysqli_num_rows($result)>0) 
                $result = mysqli_fetch_all($result, MYSQLI_ASSOC);
            else
                $result = array();
            return $result;
        }
        
        public function select($table_name, $conditions='1', $column_names='*'){
            $table_name = $this->pre . $this->type . $table_name;
            $column_names = $this->treat_column_names($column_names);
            $conditions = $conditions == '' ? '1' : $conditions;
            $sql = "SELECT $column_names FROM $table_name WHERE $conditions";
            return $this->query($sql, true);
        }
        
        public function select_($table_name, $conditions='1', $column_names='*'){
            $table_name = $this->pre . $table_name;
            $column_names = $this->treat_column_names($column_names);
            $conditions = $conditions == '' ? '1' : $conditions;
            $sql = "SELECT $column_names FROM $table_name WHERE $conditions";
            return $this->query($sql, true);
        }
        
        public function update($table_name, $values, $conditions='1'){
            $table_name = $this->pre . $this->type . $table_name;
            $values = $this->treat_values_for_update($values);
            $conditions = $conditions == '' ? '1' : $conditions;
            $sql = "UPDATE $table_name SET $values WHERE $conditions";
            $this->query($sql);
        }
        
        public function update_($table_name, $values, $conditions='1'){
            $table_name = $this->pre . $table_name;
            $values = $this->treat_values_for_update($values);
            $conditions = $conditions == '' ? '1' : $conditions;
            $sql = "UPDATE $table_name SET $values WHERE $conditions";
            $this->query($sql);
        }
        
        public function insert($table_name, $values){
            $table_name = $this->pre . $this->type . $table_name;
            $values = $this->treat_values_for_insert($values);
            $sql = "INSERT INTO $table_name $values";
            $this->query($sql);
        }
        
        public function insert_($table_name, $values){
            $table_name = $this->pre . $table_name;
            $values = $this->treat_values_for_insert($values);
            $sql = "INSERT INTO $table_name $values";
            $this->query($sql);
        }
        
        public function del($table_name, $conditions='1'){
            $table_name = $this->pre . $this->type . $table_name;
            $conditions = $conditions == '' ? '1' : $conditions;
            $sql = "DELETE FROM $table_name WHERE $conditions";
            $this->query($sql);
        }
        
        public function del_($table_name, $conditions='1'){
            $table_name = $this->pre . $table_name;
            $conditions = $conditions == '' ? '1' : $conditions;
            $sql = "DELETE FROM $table_name WHERE $conditions";
            $this->query($sql);
        }
        
        private function treat_column_names($column_names){
            if(!is_array($column_names)) return $column_names;
            $result = '';
            foreach ($column_names as $column_name){
                $new_result = "`$column_name`";
                if($result == '') $result = $new_result;
                else $result = "$result,$new_result";
            }
            return $result;
        }
        
        private function treat_values_for_update($values){
            if(!is_array($values)) return $values;
            $result = '';
            foreach ($values as $key => $value){
                $new_result = "`$key`='$value'";
                if($result == '') $result = $new_result;
                else $result = "$result,$new_result";
            }
            return $result;
        }
        
        private function treat_values_for_insert($values){
            if(!is_array($values)) die('{}');
            $column_results = '';
            $value_results = '';
            foreach ($values as $key => $value){
                $new_column = "`$key`";
                $new_value = "'$value'";
                if($column_results == ''){
                    $column_results = $new_column;
                    $value_results = $new_value;
                }else{
                    $column_results = "$column_results,$new_column";
                    $value_results = "$value_results,$new_value";
                }
            }
            return "($column_results) VALUES ($value_results)";
        }
    }
?>