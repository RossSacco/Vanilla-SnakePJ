
let matrice = document.getElementById('matrice');

if(get_mod == 'medium' || get_mod == 'hard'){
    matrice.style.boxShadow = '0px 0px 5px 15px #9f3249';
}

let righe = 25;
let colonne = 40;

let interval;
let time;
let crono = 0;

let punti = document.getElementById('punteggio');
let tempo = document.getElementById('tempo');
let highScore = document.getElementById('record');
let score = 0;
let newRecordMod = false;
let newPersonalRecord = false;

let restartButton;
let dimensioneMatrice = righe*colonne;

let gameOver = false;

let posCibo = []; // in altre mod potrebbero esserci più cibi per volta

let numCibo = 4;
let contatoreCibo = 0;

let PausaSpace;
let InvioRest;

let direzione = 1; //va a destra
let vecchiaDir = direzione;


//verso destra: +1
//verso sinistra: -1
//verso il basso: -colonne
//verso l'alto: +colonne

let posTesta = 125; //posizione iniziale
let passati = [posTesta-1,posTesta]; //qui tengo conto delle posizioni



let velocita = 100;


//logica ostacoli
let posOstacoli = [];
let numeroOstacoli = 4; //ogni tot punti incrementale aumenteranno, e con posizioni diverse, fino ad un determinato limite
let puntiIncrementoOstacoli = 3;
let caselleOccupateOstacoli = numeroOstacoli*4; //4 perchè ostacoli 2x2, mi serve per controllare il limite di celle occupate



document.getElementById('start').disabled = false;
document.getElementById('pausa').disabled = true;

function creaMatrice(){
    
    for(let i = 0; i < righe; i++){

         let riga = document.createElement('tr');
        
         for(let j = 0; j < colonne; j++){
             let celle = document.createElement('td');
             riga.appendChild(celle);
         }
         matrice.appendChild(riga);
     }

}

creaMatrice();



let celle = document.querySelectorAll('td');
 
for(let i = 0; i < passati.length; i++){
    celle[passati[i]].classList.add('corpo');
}
celle[posTesta].classList.add('testolina' + 'DX');


function scorri() {
    crono++;
    if(crono < 60){
        tempo.textContent = (crono + ' sec');
    }else{
        let minuti = Math.floor(crono / 60);
        let secondi = crono % 60;
        tempo.textContent = (minuti + ' min ' + secondi + ' sec');
    }
}
function HighScoreSchermata() {

    //la prima lettera della mod mi serve maiuscola
    let modAggiustata = get_mod.charAt(0).toUpperCase() + get_mod.slice(1);

    let action = `rank${modAggiustata}`;
    
    
    fetch('./query.php?' + new URLSearchParams({
        action: action
    }), {method:'GET'})
        .then(res => res.json())
        .then(data => {

            if(data.length){
                
                let migliorPunteggio = data[0].score;
                if(migliorPunteggio < score){
                    newRecordMod = true;
                }
                highScore.textContent = migliorPunteggio;
            }else{
                newRecordMod = true;
                highScore.textContent = score;
            }

        })
        .catch(error => {
            console.log('errore1', error);
        });

}
HighScoreSchermata();

function PersonalRecord() {

    let modAggiustata = get_mod.charAt(0).toUpperCase() + get_mod.slice(1);

    let action = `stats${modAggiustata}`;
    
    

    fetch('./query.php?' + new URLSearchParams({
        action: action
    }), {method:'GET'})
        .then(res => res.json())
        .then(data => {

            if(data.length){
                let VecchioRec = data[0].bestScore;
               
                if(score>VecchioRec){
                    newPersonalRecord = true;
                }
                
            }else{
                newPersonalRecord = true;
            }
        })
        .catch(error => {
            console.log('errore2', error);
        });    
}

//devo generare casualmente la posizione del primo cibo
function conflittoCiboOstacoli(pos, listaOstacoli) {
    for (let ostacolo of listaOstacoli) {
        if (ostacolo.angoloSX === pos || ostacolo.angolo2 === pos || 
            ostacolo.angolo3 === pos || ostacolo.angolo4 === pos) {
            return true;
        }
    }
    return false;
}

//devo generare casualmente la posizione del primo cibo
function gnam() {
    
    if(get_mod == 'easy' || get_mod == 'medium'){
        let primoCibo = Math.floor(Math.random()*dimensioneMatrice);
        //controllo che la prima pos del cibo non corrisponde alla pos iniziale del serpente
        while(passati.find((e) => e == primoCibo)){
            primoCibo = Math.floor(Math.random()*dimensioneMatrice);
        }
        posCibo.push(primoCibo);
        celle[posCibo[0]].classList.add('cibo');
    }else if(get_mod == 'hard'){
        for(contatoreCibo; contatoreCibo < numCibo; contatoreCibo++){
            let primoCibo = Math.floor(Math.random()*dimensioneMatrice);
            //controllo che la prima pos del cibo non corrisponde alla pos iniziale del serpente
            while(((passati.find((e) => e == primoCibo))) || (posCibo.find((e) => e == primoCibo)) ||
                    conflittoCiboOstacoli(primoCibo, posOstacoli)){
    
                primoCibo = Math.floor(Math.random()*dimensioneMatrice);
            }
            posCibo.unshift(primoCibo);
            celle[posCibo[0]].classList.add('cibo');
        }
    }
}

function controlloSovrapposizione(ostacolo, arrayOstacoli, arrayCibo, arrayCorpo) {
    for (let o of arrayOstacoli) {
        if (ostacolo.angoloSX === o.angoloSX || ostacolo.angoloSX === o.angolo2 || 
            ostacolo.angoloSX === o.angolo3 || ostacolo.angoloSX === o.angolo4 ||
            ostacolo.angolo2 === o.angoloSX || ostacolo.angolo2 === o.angolo2 || 
            ostacolo.angolo2 === o.angolo3 || ostacolo.angolo2 === o.angolo4 ||
            ostacolo.angolo3 === o.angoloSX || ostacolo.angolo3 === o.angolo2 || 
            ostacolo.angolo3 === o.angolo3 || ostacolo.angolo3 === o.angolo4 ||
            ostacolo.angolo4 === o.angoloSX || ostacolo.angolo4 === o.angolo2 || 
            ostacolo.angolo4 === o.angolo3 || ostacolo.angolo4 === o.angolo4) {
            return true;
        }
    }

    for (let cibo of arrayCibo) {
        if (ostacolo.angoloSX === cibo || ostacolo.angolo2 === cibo ||
            ostacolo.angolo3 === cibo || ostacolo.angolo4 === cibo) {
            return true;
        }
    }

    for (let corpo of arrayCorpo) {
        if (ostacolo.angoloSX === corpo || ostacolo.angolo2 === corpo ||
            ostacolo.angolo3 === corpo || ostacolo.angolo4 === corpo) {
            return true;
        }
    }

    return false;
}

function generaOstacoli() {

    if(caselleOccupateOstacoli > (dimensioneMatrice/2)){
        return;
    }
    for(let i = 0; i < numeroOstacoli; i++){
        let ostacolo;
        do{
            let angoloSX = Math.floor(Math.random()*(dimensioneMatrice-(colonne)-1));
            let colonnaAngoloSX = angoloSX % colonne;
            //così gli ostacoli non fanno effetto pacman nei lati
            while(colonnaAngoloSX === colonne - 1) {
                angoloSX = Math.floor(Math.random()*(dimensioneMatrice-(colonne)-1));
                colonnaAngoloSX = angoloSX % colonne;
            }
            ostacolo = {
                angoloSX: angoloSX,
                angolo2: angoloSX + 1,
                angolo3: angoloSX + colonne,
                angolo4: angoloSX + colonne + 1
            };
        }while(controlloSovrapposizione(ostacolo, posOstacoli, posCibo, passati));

        posOstacoli.push(ostacolo);
    }

    posOstacoli.forEach(ostacolo =>{
        celle[ostacolo.angoloSX].classList.add('ostacolo');
        celle[ostacolo.angolo2].classList.add('ostacolo');
        celle[ostacolo.angolo3].classList.add('ostacolo');
        celle[ostacolo.angolo4].classList.add('ostacolo');
    });

    caselleOccupateOstacoli += (numeroOstacoli*4);
    
}



let startSpace;
startSpace = function(e){
    if(e.code == 'Space'){
        start();
    }
}

document.addEventListener('keydown', startSpace);

function start() {

    document.getElementById('start').disabled = true;
    document.getElementById('pausa').disabled = false;
    
    //document.removeEventListener('keydown', InvioRest);
    document.removeEventListener('keydown', startSpace);
    document.removeEventListener('keydown', PausaSpace);

    time = setInterval(scorri, 1000);

    if(get_mod == 'easy'){
        interval = setInterval(update, 70);
    }else if(get_mod == 'medium' || get_mod == 'hard'){
        interval = setInterval(update, velocita);
    }

    document.addEventListener('keydown', changeDirection);

    gnam();

}

//non si può passare dove c'è il corpo 

function changeDirection(event) {
    switch(event.key) {
        case ' ':
            pause();
        break;
        case 'ArrowLeft': //sinistra
        if(direzione == 1){
            break;
        }
        vecchiaDir = direzione;
        direzione = -1;
        break;

        case 'ArrowUp': //su 
        if(direzione == colonne){
            break;
        }
        vecchiaDir = direzione;
        direzione = -colonne;
        break;

        case 'ArrowRight': // destra
        if(direzione == - 1){
            break;
        }
        vecchiaDir = direzione;
        direzione = 1;
        break;

        case 'ArrowDown': //giu
        if(direzione == -colonne){
            break;
        }
        vecchiaDir = direzione;
        direzione = +colonne;
        break;
    }
}

function update() {
    
    let str = (direzione == -1) ? 'SX' : (direzione == -colonne)?'SU':(direzione == 1)? 'DX' : 'GIU';
    let VeccStr = (vecchiaDir == -1) ? 'SX' : (vecchiaDir == -colonne)?'SU':(vecchiaDir == 1)? 'DX' : 'GIU';



    if(get_mod == 'medium' || get_mod == 'hard'){

        controlloBordiColpiti();

        if(get_mod  == 'hard'){
            controlloOstacoli();
        }

        if (gameOver) {
            return;
        }
    }

    
    
    //controllo se mi sono automangiato
    controlloAutoColpito();

    if(get_mod == 'easy'){ 
        controlloBordiEasy();
    }

    vittoria();
    //controllo se nella casella c'era cibo
    affamato();
    
    posTesta += direzione;
    
    passati.push(posTesta);

    celle[passati[passati.length-2]].classList.remove('testolina'+ ((vecchiaDir == direzione)? str : VeccStr));
    //se arrivo da affamato
    celle[passati[passati.length-3]].classList.remove('testolina'+ ((vecchiaDir == direzione)? str : VeccStr));

    celle[passati[passati.length-1]].classList.add('corpo');
    celle[passati[passati.length-1]].classList.add('testolina'+ str);

    
   
    celle[passati[0]].classList.remove('corpo');
    passati.shift();
    ;
    vecchiaDir = direzione;

}

function vittoria() {
    if(passati.length == dimensioneMatrice-10){
        gameOver = false;
        fine();
    }
}


function controlloBordiEasy() {
   
    //se in questo momento mi trovo nell'ultima colonna e vado verso destra
   if(((posTesta+1)%colonne==0) && direzione == 1){
        posTesta -= colonne;
   } 
   if(posTesta+1 < colonne && direzione == -colonne){ //se mi trovo nella prima riga e vado verso su
        posTesta += (dimensioneMatrice);
   }
   if(posTesta+1 > (dimensioneMatrice-colonne) && direzione == +colonne){ //se sono nell'ultima riga e vado verso giu
        posTesta -= (dimensioneMatrice);
   }
   if((posTesta)%colonne == 0 && direzione == -1){
        posTesta += colonne;
   }

}

function controlloBordiColpiti() {
   
    //se in questo momento mi trovo nell'ultima colonna e vado verso destra
   if(((posTesta+1)%colonne==0) && direzione == 1){
        gameOver = true;
        fine();
   } 
   if(posTesta+1 < colonne && direzione == -colonne){ //se mi trovo nella prima riga e vado verso su
        gameOver = true;
        fine();
   }
   if(posTesta+1 > (dimensioneMatrice-colonne) && direzione == +colonne){ //se sono nell'ultima riga e vado verso giu
        gameOver = true;
        fine();
   }
   if((posTesta)%colonne == 0 && direzione == -1){
        
        gameOver = true;
        fine();
   }
  
}

function controlloOstacoli(){

    for(let o of posOstacoli){
        if((posTesta+direzione) == o.angoloSX || (posTesta+direzione) == o.angolo2 ||
           (posTesta+direzione) == o.angolo3 || (posTesta+direzione) == o.angolo4){
            gameOver = true;
            fine();
           }
    }

}

let cicloVel = 0;

//in questa modalità ho solo un cibo per volta
function affamato() {
    
    if(posCibo.includes(posTesta+direzione)){
        if(get_mod == 'medium' || get_mod == 'hard'){
            if(get_mod == 'hard'){
                contatoreCibo--;
            }
            cicloVel++;
            if(cicloVel == 3){
                clearInterval(interval);
            
            
            cicloVel = 0;
            if(velocita > 42){
                velocita *= 0.94;
            }              
            
            
            interval = setInterval(update, velocita);
            
            }  
        }


        score++;
        punti.textContent = score;

        if(get_mod == 'hard'){
            if(score == Math.floor(puntiIncrementoOstacoli)){
                
                generaOstacoli();
                puntiIncrementoOstacoli *= 1.70;
            }
    
            if(score == 50){
                numeroOstacoli += 2;
            }
        }
        
        //allungo il corpo
       
       passati.push(posTesta+direzione);
       celle[posTesta+direzione].classList.add('corpo');

        //rimuovo vecchio e aggiungo nuovo cibo
        let index = posCibo.indexOf(posTesta+direzione);
        celle[posCibo[index]].classList.remove('cibo');
        if (index !== -1) {
            posCibo.splice(index, 1);
        }
        gnam();
    }
}


function controlloAutoColpito() {
    
    if(passati.includes(posTesta+direzione)){
        if(get_mod == 'easy' || get_mod == 'medium'){
            document.removeEventListener('keydown', changeDirection);
        }  
        gameOver = true;
        fine();
    }
}



function mostraStart() {


    let gameOverScreen = document.createElement('div');
        gameOverScreen.classList.add("gameOverScreen");

    let backTasto = document.getElementById('ind');
        backTasto.classList.remove("hidden");

    let restart = document.createElement('button');
        restart.id = "restart";
        restart.textContent = "|>";

       
        restart.addEventListener('click', function() {
            restart.remove();
            gameOverScreen.remove();
            backTasto.classList.add("hidden");
            start();
        });

        

        PausaSpace = function(event) {
            if(event.code == 'Space'){
                
                restart.remove();
                gameOverScreen.remove();
                backTasto.classList.add("hidden");
                start();
            }
        }

    document.addEventListener('keydown', PausaSpace);
    gameOverScreen.appendChild(restart);
    document.body.appendChild(gameOverScreen);
}



function pause() {
     clearInterval(interval);
     clearInterval(time);
     
     document.getElementById('pausa').disabled = true;
     
     mostraStart();
     document.removeEventListener('keydown', changeDirection);
     
    
}

function mostraGO() {
        // Creazione dinamica della schermata Game Over

        let backTasto = document.getElementById('ind');
        backTasto.classList.remove("hidden");

        let gameOverScreen = document.createElement('div');
        gameOverScreen.classList.add("gameOverScreen");
        let stringa = (gameOver == true) ? 'GAME OVER' : '!YOU WIN!';
        gameOverScreen.textContent = stringa;

        restartButton = document.createElement('button');
        restartButton.textContent = '|>';
        restartButton.id = 'rest';
        restartButton.classList.add('riprova');

        let vediClassifica = document.createElement('button');
        vediClassifica.classList.add('riprova');
        vediClassifica.textContent = 'C';

        vediClassifica.addEventListener('click', function() {
            window.location.href = './classifica.php';
        });

        let buttonContainer = document.createElement('div');
        buttonContainer.id = 'schermoGO';

        let scritta = document.createElement('p');
        scritta.id = 'scrittaENTER'
        scritta.textContent = 'Press "Enter" to restart';

        let scritteContainer = document.createElement('div');
        scritteContainer.id = 'scritteRec';

        let rr = document.createElement('p');
        rr.classList.add('record');
        rr.textContent = '! New Personal Record !';
        rr.classList.add('hidden');

        let modRec = document.createElement('p');
        modRec.classList.add('record');
        modRec.textContent = '!!! New Mode Record !!!';
        modRec.classList.add('hidden');

       

        if(newPersonalRecord){
            
            rr.classList.remove('hidden');
        }

        if(newRecordMod){
            modRec.classList.remove('hidden');
        }

        scritteContainer.appendChild(rr);
        scritteContainer.appendChild(modRec);

        document.body.appendChild(gameOverScreen);
        document.body.appendChild(buttonContainer);
        document.body.appendChild(scritteContainer);

        buttonContainer.appendChild(restartButton);
        buttonContainer.appendChild(vediClassifica);
        gameOverScreen.appendChild(scritta);

        //restart con il bottone invio da implementare
        InvioRest = function (e) {
            
            if(e.code =='Enter'){
                gameOverScreen.remove();
            restartButton.remove();
            buttonContainer.remove();
            vediClassifica.remove();
            backTasto.classList.add("hidden");
            modRec.classList.add('hidden');
            rr.classList.add('hidden');
            restart();
            }
        }

        document.addEventListener('keydown', InvioRest);

        restartButton.addEventListener('click', function () {
            gameOverScreen.remove();
            restartButton.remove();
            buttonContainer.remove();
            vediClassifica.remove();
            backTasto.classList.add("hidden");
            modRec.classList.add('hidden');
            rr.classList.add('hidden');
            restart();
        });
        
}



function fine() {

    HighScoreSchermata();

    PersonalRecord();
    
    salvaPartita();
    
    clearInterval(interval);
    clearInterval(time);
    document.removeEventListener('keydown', changeDirection);
    
    
    setTimeout(mostraGO, 200);
}  




function restart() {
       
        document.removeEventListener('keydown', InvioRest);
        crono = 0;
        score = 0;
        punti.textContent = '0';
        tempo.textContent = '0';
        gameOver = false;
        posCibo = [];
        direzione = 1;
        vecchiaDir = direzione;
        posTesta = 125;
        passati = [posTesta - 1, posTesta];
        newPersonalRecord = false;
        newRecordMod = false;

        contatoreCibo = 0;
        
        posOstacoli = [];
        numeroOstacoli = 4; //ogni tot punti incrementale aumenteranno, e con posizioni diverse, fino ad un determinato limite
        puntiIncrementoOstacoli = 3;
        caselleOccupateOstacoli = numeroOstacoli*4;
        
       
        clearInterval(interval);
        clearInterval(time);

        velocita = 100;
        cicloVel = 0;
    
        
        document.removeEventListener('keydown', PausaSpace);
        document.removeEventListener('keydown', startSpace);
        document.removeEventListener('keydown', changeDirection);
    
        document.getElementById('start').disabled = false;
        document.getElementById('pausa').disabled = true;
        
        matrice.innerHTML = "";
    
        
        celle.forEach(cell => {
            cell.classList.remove('corpo', 'testolinaDX', 'testolinaSX', 'cibo');
        });
    
       
        creaMatrice();
        celle = document.querySelectorAll('td');
        for (let i = 0; i < passati.length; i++) {
            celle[passati[i]].classList.add('corpo');
        }
        celle[posTesta].classList.add('testolinaDX');

       
        HighScoreSchermata();
        document.addEventListener('keydown', startSpace);
    
        
}
    

function salvaPartita() {
    
    let formdata = new FormData();

    formdata.append("score", score);
    formdata.append("modalita", get_mod);
    formdata.append("time", crono);
    formdata.append("action", "insertDB");

    fetch('./salvataggio.php', {method:'POST', body: formdata})
        .then(res=> res.json())
        .then(data =>{
            if(data.error){
                console.log(data.error);
            }
        });
}
   
    