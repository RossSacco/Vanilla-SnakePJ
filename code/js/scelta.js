



let cards = document.querySelectorAll('.slider .card');
let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('prev');

let activeIndex = 0;

function updateCards() {
    cards.forEach((card, index) => {
        if (index === activeIndex) {
            card.style.transform = 'none';
            card.style.zIndex = cards.length.toString();  // Card attiva ha zIndex massimo
            card.style.filter = 'none';
            card.style.opacity = '1';
            // card.style.cursor = 'pointer';
            card.classList.add('rilievo');
        } else {
            let offset = 250 * (index - activeIndex);
            let scale = 1 - 0.2 * Math.abs(index - activeIndex);
            let zIndex = (index > activeIndex) ? (cards.length - (index - activeIndex)) : (index - activeIndex) - 1;

            card.classList.remove('rilievo');
            card.style.transform = `translateX(${offset}px) scale(${scale})`;
            card.style.zIndex = zIndex.toString();
            card.style.filter = 'blur(5px)';
            card.style.opacity = Math.abs(index - activeIndex) > 2 ? '0' : '0.9';
        }
    });
}




nextBtn.addEventListener('click', () => {
    if (activeIndex + 1 < cards.length) {
        activeIndex++;
        updateCards();
    }
});

prevBtn.addEventListener('click', () => {
    if (activeIndex - 1 >= 0) {
        activeIndex--;
        updateCards();
    }
});




updateCards();


