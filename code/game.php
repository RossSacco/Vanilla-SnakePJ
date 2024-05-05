
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
    <link rel="stylesheet" type="text/css" href="./css/gameNG.css">
    <link rel="stylesheet" type="text/css" href="./css/tastoIndietro.css">
</head>
<body>

    <div id="ind" class="hidden">
    <?php
        require("tastoIndietro.php");
    ?>
    </div>


    <img src="immagini/logo.png" alt="">
    
    <div id="game">
        <div id="stats">
            <label>SCORE:</label><div id="punteggio">0</div>
            <label>TIME:</label><div id="tempo">0</div>
            <label>HIGHSCORE:</label><div id="record">0</div>
            <div id="controls">
                <button id="start" onclick="start()">START</button>
                <button id="pausa" onclick="pause()">PAUSE</button>
                <label id="inf">or press 'Space'</label>
            </div>
        </div>
        
        
        <table id="matrice">
        
        </table>

    </div>


    <script> let get_mod = '<?php echo $_GET['modalita']; ?>';</script>
    <script src="js/game.js"></script>

</body>
</html>

