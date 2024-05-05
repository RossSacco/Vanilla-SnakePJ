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
    <title>Statistiche</title>
    <link rel="stylesheet" type="text/css" href="./css/classifica.css">
    <link rel="stylesheet" type="text/css" href="./css/tastoIndietro.css">
    <link rel="stylesheet" type="text/css" href="./css/statistiche.css">
</head>
<body>

    <?php
        require("tastoIndietro.php");
    ?>

    <img src="immagini/logo.png" alt="" id="log">

    <h2>Ecco le Tue Statistiche</h2>

    <div class="slider">
        <div class="card" id="easy">
            <img src="immagini/serpEasy.png" alt="serpMed" class="card-image">
            <h1>EASY</h1>

            <div class="dati">

            <div class="bb">
            <label>BESTSCORE:</label><div class="bestscore">0</div>
            </div>
            <div class="tt">
            <label>TEMPO TOTALE:</label><div class="time">0</div>
            </div>
            <div class="ss">
            <label>TOTALE PARTITE:</label><div class="totalGame">0</div>
            </div>
            </div>
            
        </div>
        <div class="card" id="medium" >
            <img src="immagini/serpMedium.png" alt="serpMed" class="card-image">
            <h1>MED</h1>
            <div class="dati">
            <div class="bb">
            <label>BESTSCORE:</label><div class="bestscore">0</div>
            </div>
            <div class="tt">
            <label>TEMPO TOTALE:</label><div class="time">0</div>
            </div>
            <div class="ss">
            <label>TOTALE PARTITE:</label><div class="totalGame">0</div>
            </div>
            </div>
            
        </div>
        <div class="card" id ="hard" >
            <img src="immagini/serpHard.png" alt="serpMed" class="card-image" id="hh">
            <h1>HARD</h1>
            <div class="dati">
                <div class="bb">
            <label>BESTSCORE:</label><div class="bestscore">0</div>
            </div>
            <div class="tt">
            <label>TEMPO TOTALE:</label><div class="time">0</div>
            </div>
            <div class="ss">
            <label>TOTALE PARTITE:</label><div class="totalGame">0</div>
            </div>
            </div>
           
        </div>
        
    </div>

    <button id="next">></button>
    <button id="prev">&lt;</button>


    <script src = "js/scelta.js"></script>
    <script src = "js/statistiche.js"></script>
</body>
</html>