<?php

    if(!isset($_SESSION))
        session_start();

    require_once('config.php');

    $connection = new DB();
    $pdo = $connection->getPDO();

    try{

        if (!(isset($_SESSION['login']) && $_SESSION['login'] === true)) {
            throw new Exception('Not logged in');
        }

        $user = $_SESSION['username'];
        $score = $_POST['score'];
        $modalita = $_POST['modalita'];
        $time = $_POST['time'];

        if(!isset($user) || !isset($score) || !isset($modalita) || !isset($time)){
            throw new Exception('Invalid Data');
        }

        $query = "INSERT INTO game (username, score, modalita, time) VALUES (?,?,?,?)";

        $statement = $pdo->prepare($query);
        $statement->bindValue(1,$user);
        $statement->bindValue(2,$score);
        $statement->bindValue(3,$modalita);
        $statement->bindValue(4,$time);
        $statement->execute();

        $response = [
            'message' => 'Nuova partita salvata con successo',
        ];
    }
    catch(PDOException $e){
        $response = [
            'error' => $e->getMessage()
        ];
    }

    echo json_encode($response);

    $connection->close();
    $pdo = null;


?>