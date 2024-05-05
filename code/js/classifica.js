

document.addEventListener("DOMContentLoaded", function () {
    populateRanking('tabEasy', 'rankEasy', 'easy');
    populateRanking('tabMed', 'rankMedium', 'medium');
    populateRanking('tabHard', 'rankHard', 'hard');
});

function populateRanking(tableId, action, cardId) {
    fetch('./query.php?' + new URLSearchParams({
        action: action
    }), { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            let table = document.getElementById(tableId);
            let tbody = table.getElementsByTagName('tbody')[0];
            let cardElem = document.getElementById(cardId);
            let scritta = cardElem.querySelector('p');


            if (data.length) {
                tbody.innerHTML = "";
                let i = 1;
                let tr, td;

                data.forEach(player => {
                    tr = tbody.insertRow();
                    td = tr.insertCell();
                    td.innerText = i++ + "°";
                    
                    td = tr.insertCell();
                    td.innerText = player.username;
                    td = tr.insertCell();
                    td.innerText = player.score;
                    td = tr.insertCell();

                    let hours = Math.floor(player.time / 3600);
                    let minutes = Math.floor((player.time % 3600) / 60);
                    let seconds = player.time % 60;

                    let formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                    td.innerText = formattedTime;

                    scritta.textContent = '';
                });
            } else {
               scritta.textContent = 'Nessun Giocatore in Classifica';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            
        });
}
