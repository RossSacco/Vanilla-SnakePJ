
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        if (index === activeIndex) {
            sceltaMod();
        }
    });
});


sceltaMod = () =>{
    let easy = document.getElementById('easy');
    let med = document.getElementById('medium');
    let hard = document.getElementById('hard');
    
    easy.addEventListener("click", function(){
        window.location.href = 'game.php?modalita=easy';
    });
    med.addEventListener("click", function(){
        window.location.href = 'game.php?modalita=medium';
    });
    hard.addEventListener("click", function(){
        window.location.href = 'game.php?modalita=hard';
    });
}
