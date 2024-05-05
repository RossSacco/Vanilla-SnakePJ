<?php


    define('DB_CONNECTION_STRING','mysql:host=127.0.0.1;dbname=DB_Sacco');
    define('DB_USER','root');
    define('DB_PASS','');
        
    class DB{
        public $pdo;

        function __construct(){
            try {
                $this->pdo = new PDO(DB_CONNECTION_STRING,DB_USER,DB_PASS, array(PDO::ATTR_PERSISTENT => false));
            } 
            catch (PDOException $e) {
                $msg = ['error' => $e->getMessage()];
                die(json_encode($msg));
            }
        }

        function getPDO(){
            return $this->pdo;
        }


        function close(){
            $this->pdo = null;
        }
    }

?>