<?php

if (!isset($_SESSION))
    session_start();

    

    $player = $_SESSION['username'];
?> 


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SNAKE</title>
    <link rel="stylesheet" type="text/css" href="./css/home.css">
</head>
<body>

    <img src="immagini/3xpr.gif" alt="" class="gigi">

     <?php
    if (isset($_SESSION['login'])  && $_SESSION['login'] === true) { ?>
        <button id="logout_button" onclick="logout()">
            <p>Logout</p>
            <img   src="immagini/sign-out-alt.png" alt="">
        </button>
    <?php } ?>

    
    <?php
    if (isset($_SESSION['login'])  && $_SESSION['login'] === true) { ?>
    <div id="saluto">
        <img src="immagini/user.png" alt="" title="Le tue statistiche" onclick="window.location.href='statistiche.php'">
        <p>Ciao <?php echo $player; ?>! </p>
    </div>
    <?php } ?>
   
   
    
<div class="home">
     
     <img src="immagini/logo.png" alt="logo">

    

    <div id="dashboard">
        
        <?php
            if (isset($_SESSION['login'])  && $_SESSION['login'] === true) { ?>
                <button  onclick="window.location.href='scelta.php'">GIOCA ORA</button>
        <?php } else { ?>
            <button  onclick="window.location.href='loginForm.php'">ACCEDI</button>
        <?php } ?>

        <button  onclick="window.location.href='tutorial.php'">TUTORIAL</button>
        <button onclick="window.location.href='classifica.php'">CLASSIFICA</button>
        <?php
    if (isset($_SESSION['login'])  && $_SESSION['login'] === true) { ?>
        <button onclick="window.location.href='statistiche.php'">STATS</button>
    <?php } ?>
        
    </div>
</div>

<script src="js/logout.js"></script>



</body>
</html>