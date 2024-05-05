<?php

if (!isset($_SESSION))
    session_start();

require_once('config.php'); 

$connection = new DB();
$pdo = $connection->getPDO();

try {

    // input 
    $username = $_POST['username_login'];
    $password = $_POST['password_login'];

    // valori nulli
    if(!($username && $password)){
        throw new Exception("Credenziali non inserite");
    }

    $query = "  SELECT password 
                FROM utente
                WHERE username = '$username'
             ";
             
    $statement = $pdo->prepare($query);
    $statement->execute();

    $account = $statement->fetch(pdo::FETCH_ASSOC);
    
    //controllo esistenza account 
    if ($statement->rowCount() == 0) {
        throw new Exception("Credenziali errate");
    } else {
       
        if (password_verify($password, $account["password"])) {
            $_SESSION['login'] = true;
            $_SESSION['username'] = $username;

            $response = [
                'login'   => true,
                'message' => 'Logged in',
            ];

            
        } else {
            throw new Exception("Password errata");
        }
    }

} catch (PDOException | Exception $e){
    $response = [
        'login'   => false,
        'message' => 'Ops... Login fallito',
        'error'  => $e->getMessage()
    ];
}

echo json_encode($response);

$connection->close();
$pdo = null;
    

?>