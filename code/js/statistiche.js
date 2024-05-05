
document.addEventListener("DOMContentLoaded", function () {
    populateStats( 'easy', 'statsEasy');
    populateStats( 'medium', 'statsMedium');
    populateStats( 'hard', 'statsHard');
});




function populateStats(cardId, action){


    fetch('./query.php?' + new URLSearchParams({
        action: action
    }),{method: 'GET'})
    .then(res => res.json())
    .then(data => {
        let cardElem = document.getElementById(cardId);

        if(data.length){
            data.forEach(player => {
                    
                
                    cardElem.querySelector('.bestscore').textContent = player.bestScore;

                    let hours = Math.floor(player.tempo / 3600);
                    let minutes = Math.floor((player.tempo % 3600) / 60);
                    let seconds = player.tempo % 60;
                    let formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

                     cardElem.querySelector('.time').textContent = formattedTime;
                     cardElem.querySelector('.time').classList.remove('muovo');
                     cardElem.querySelector('.totalGame').textContent = player.totalGame;
                
            });
        }else{
                     cardElem.querySelector('.bestscore').textContent = 'ND';
                     cardElem.querySelector('.time').textContent = 'ND';
                     cardElem.querySelector('.time').classList.add('muovo');
                     cardElem.querySelector('.totalGame').textContent = 'ND';
        }

    });
}