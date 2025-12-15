const reveals = document.querySelectorAll('.reveal');

function handleReveal() {
    for (let el of reveals) {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 100) {
            el.classList.add('visible');
        }
    }
}

window.addEventListener('scroll', handleReveal);
window.addEventListener('load', handleReveal);