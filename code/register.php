<?php 

if (!isset($_SESSION))
    session_start();

require_once('config.php'); 

$connection = new DB(); 
$pdo = $connection -> getPDO(); 


if ($_POST["action"] === "register") {
    
    try {
    
        $keys = ['username', 'password', 'ConfermaPassword'];
        foreach ($keys as $key) {
            if($_POST[$key] == ''){
                throw new Exception("Credenziali non inserite");
            }
        };
    
        $pattern_u= '/^[a-z\d_]{4,20}$/i';

        if (!preg_match($pattern_u, $_POST['username']))
            throw new Exception("Username non valido");

        if(strlen($_POST['username']) < 4){
            throw new Exception("Username troppo breve!");
        }

        if(!assertUsernameAvailability($_POST['username'])){
            throw new Exception("Username non disponibile!");
        }

        $pattern_p = '/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{8,12}$/';
    
        if (!preg_match($pattern_p, $_POST['password'])){
            throw new Exception("Password non valida");
        }

        if(strlen($_POST['password']) < 8){
            throw new Exception("Password troppo breve!");
        }
        if($_POST['password'] != $_POST['ConfermaPassword']){
            throw new Exception("Password di conferma errata");
        }
    

        $passwordHash = password_hash($_POST['password'], PASSWORD_BCRYPT);
        $query = "INSERT INTO utente (username, password) VALUES (?,?)";
    
        $statement = $pdo->prepare($query);
        $statement->bindValue(1, $_POST['username']);
        $statement->bindValue(2, $passwordHash);
        $statement->execute();
    
        
        $response = [
            'message' => 'Registrazione effettuata',
        ];

    }catch (PDOException | Exception $e) {
        $response = [
            'message' => 'Registrazione fallita',
            'error'  => $e->getMessage(),
        ];
    }


}else if($_POST["action"] === "validateusername"){

    try {

        $username_= $_POST['username_reg']; 

        $query = "SELECT username FROM utente WHERE username = '$username_' "; 
    
        $statement = $pdo->prepare($query);
        $statement->execute();
        $row = $statement->fetch(pdo::FETCH_ASSOC);
    
        if(isset($row["username"])){
            throw new Exception("Username non disponibile!");
        }

        $response = [
            'message' => 'Username disponibile'
        ];

    }catch (PDOException | Exception $e){
        $response = [
            'message' => 'Username errato',
            'error'  => $e->getMessage(),
        ];
    }
}


// evito doppioni
function assertUsernameAvailability($username)
{
    $pdo = (new DB())->getPDO();

    try {
        $stmt = $pdo->prepare("     SELECT  username
                                    FROM    utente
                                    WHERE   username = '$username'");

        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (isset($res["username"]))
            return false;
        return true;

    } catch (PDOException $e) {
        return false;
    }

}


echo json_encode($response);

$connection->close();
$pdo = null;

?>