<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="./css/tastoIndietro.css">
    <link rel="stylesheet" type="text/css" href="./css/tutorial.css">
    <title>Tutorial</title>
</head>
<body>
<img id="logo" src="immagini/logo.png" alt="logo">

<?php
        require("tastoIndietro.php");
    ?>
<div id="descrizione">
<div class="intro">
    <h1 class="fine">BENVENUTO IN SNAKE!</h1>
</div>

<div class="sezione">
    <p>Per prima cosa assicurati di aver effettuato l'accesso. Clicca sul pulsante ACCEDI, in caso tu non abbia un profilo effettua la registrazione. Una volta fatto sei pronto per giocare!</p>
</div>

<div class="sezione">
<p>Clicca sull'icona</p>
<img id="user" src="immagini/user.png" alt="">
<p> che vedrai una volta effettuato il LOG IN per visualizzare tutte le tue statistiche!</p>
</div>

<div class="intro">
    <h1>DI COSA SI TRATTA</h1>
</div>

    <div class="sezione">
        <p>
            Nel magico mondo di snake diventi il registra di un serpente affamato! 
            Il tuo obiettivo è farlo diventare il serpente più grande di sempre, 
            facendogli mangiare tutto ciò che gli passa davanti.
            Questo gioco si articola di 3 modalità differenti, accomunate però dall'interfaccia:
            una volta effettuata la tua scelta sulla modalità, avrai finalmente davanti il gioco.
           
        </p>
    </div>

    <div class="intro">
    <h1>LE MODALITÀ</h1>
    </div>

    <div id="mod">
            <div class="sez">
            <img src="immagini/serpEasy.png" alt="serpMed" class="card-image">
            <div class="testo">
            <h2>EASY</h2>
            <p>La prima e più semplice modalità. L'obiettivo è fare più punti possibile mangiando il cibo che si 
                presenterà sul percorso del serpente ma attenzione,
                periodicamente la velocità del serpente aumenterà. I bordi del campo da gioco non rappresentano
                un ostacolo, spunterai dal lato opposto! L'unica cosa a cui dovrai prestare attenzione è il tuo stesso corpo!
            </p>
            </div>
            </div>
            <div class="sez">
            <img src="immagini/serpMedium.png" alt="serpMed" class="card-image">
            <div class="testo">
            <h2>MEDIUM</h2>
            <p>Le cose si fanno serie! I bordi del campo da gioco saranno degli ostacoli, fai attenzione a non 
                sbatterci contro. Vediamo quanto sei forte!
            </p>
            </div>
            </div>
            <div id="ult" class="sez">
            <img src="immagini/serpHard.png" alt="serpMed" class="card-image" >
            <div class="testo">
            <h2>HARD</h2>
            <p>Modalità giocabile solo da veri professionisti. Oltre alle difficoltà presenti già
                nelle modalità precedenti, questa volta compariranno dentro il campo di gioco ulteriori
                ostacoli. Aumenteranno sempre di più, resisti finchè puoi!
            </p>
            </div>
            </div>
    </div>

    <div class="intro">
    <h1>COMANDI</h1>
    </div>

    <div class="sezione">
        <p>
                Puoi iniziare la partita cliccando il pulsante start in basso a sinistra o cliccando 
            il pulsante 'Space' sulla tua tastiera. In caso tu voglia fare pausa, ti basterà ricliccare 'Space' o il pulsante
            apposito. A questo punto non ti resta che giocare! 
        </p>
    </div>

    <div class="sezione">
        <p>
            Potrai muovere il tuo serpente tramite le comode frecce sulla tua tastiera!
        </p>
    </div>
    
    <h1 class="fine">BUON DIVERTIMENTO!</h1>

</div>
    
</body>
</html>