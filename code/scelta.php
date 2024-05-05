<?php

    if(!isset($_SESSION)){
        session_start();
    }

    if(!isset($_SESSION['login']) || $_SESSION['login'] === false){
        header("location: loginForm.php");
        exit;
    }


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake</title>
    <link rel="stylesheet" type="text/css" href="./css/scelta.css">
    <link rel="stylesheet" type="text/css" href="./css/tastoIndietro.css">
</head>
<body>
    <?php
        require("tastoIndietro.php");
    ?>
    <img src="immagini/logo.png" alt="" id="log">
    <h2>Clicca sulla modalità che desideri</h2>
    <div class="slider">
        <div class="card" id="easy" >
            <img src="immagini/serpEasy.png" alt="serpMed" class="card-image">
            <h1>EASY</h1>
            <p>*Velocità costante </br> *Effetto PacMac </br> *Attento a non morderti la coda!</p>
        </div>
        <div class="card" id="medium" >
            <img src="immagini/serpMedium.png" alt="serpMed" class="card-image">
            <h1>MED</h1>
            <p>*Attento ai bordi </br>*Il cibo dà energia, striscerai sempre più veloce</p>
        </div>
        <div class="card" id ="hard" >
            <img src="immagini/serpHard.png" alt="serpMed" class="card-image" id="hh">
            <p id="tw">SOLO PER PROFESSIONISTI</p>
            <h1>HARD</h1>
            <p>*Attento ai bordi </br>*Aumento periodico della velocità </br>*Ostacoli appaiono sul campo di gioco </p>
        </div>
        <button id="next">></button>
        <button id="prev">&lt;</button>
    </div>
    

   
    <script src = "js/scelta.js"></script>
    <script src = "js/cards.js"></script>
    
    <script>

        

    </script>
    
</body>
</html>