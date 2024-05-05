<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Classifica</title>
    <link rel="stylesheet" type="text/css" href="./css/classifica.css">
    <link rel="stylesheet" type="text/css" href="./css/tastoIndietro.css">
</head>
<body>
    <?php
        require("tastoIndietro.php");
    ?>

<img src="immagini/logo.png" alt="" id="log">

<h2>Classifica della Modalità</h2>

<div class="slider">
        <div class="card" id="easy">
            <img src="immagini/serpEasy.png" alt="serpMed" class="card-image">
            <h1>EASY</h1>
            <table id='tabEasy'>
            <thead>
                <tr>
                    <th>°</th>
                    <th>GIOCATORE</th>
                    <th>SCORE</th>
                    <th>TEMPO</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            </table>
            <p></p>
        </div>
        <div class="card" id="medium" >
            <img src="immagini/serpMedium.png" alt="serpMed" class="card-image">
            <h1>MED</h1>
            <table id='tabMed'>
            <thead>
                <tr>
                    <th>°</th>
                    <th>GIOCATORE</th>
                    <th>SCORE</th>
                    <th>TEMPO</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            </table>
            <p></p>
        </div>
        <div class="card" id ="hard" >
            <img src="immagini/serpHard.png" alt="serpMed" class="card-image" id="hh">
            <h1>HARD</h1>
            <table id='tabHard'>
            <thead>
                <tr>
                    <th>°</th>
                    <th>GIOCATORE</th>
                    <th>SCORE</th>
                    <th>TEMPO</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            </table>
            <p></p>
        </div>
        
    </div>

    <button id="next">></button>
    <button id="prev">&lt;</button>


<script src = "js/scelta.js"></script>
<script src = "js/classifica.js"></script>
</body>
</html>