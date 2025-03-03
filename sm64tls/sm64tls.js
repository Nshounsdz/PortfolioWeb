const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible'); // Enlève la classe lorsqu'il n'est plus visible
        }
    });
}, {
    threshold: 0.1 // Ajustez le seuil selon vos besoins
});

fadeElements.forEach(el => observer.observe(el));

window.onscroll = function() {
    var button = document.getElementById("topButton");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        button.style.display = "block"; // Afficher le bouton
    } else {
        button.style.display = "none"; // Cacher le bouton
    }
};

    // Fonction pour revenir en haut
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.getElementById("music-popup").classList.add("show");
        setTimeout(hidePopup, 10000);
    }, 1000);
});

function playMusic() {
    const music = document.getElementById("background-music");
    music.volume = 0.5;
    music.play().catch(error => console.log("Lecture bloquée :", error));
    document.getElementById("volume-control").style.display = "block";
    document.getElementById("toggle-music").textContent = "Stop";
}

function toggleMusic() {
    const music = document.getElementById("background-music");
    const button = document.getElementById("toggle-music");
    if (music.paused) {
        music.play();
        button.textContent = "Stop";
    } else {
        music.pause();
        button.textContent = "Reprendre";
    }
}

function adjustVolume(value) {
    document.getElementById("background-music").volume = value;
}

function hidePopup() {
    document.getElementById("music-popup").classList.remove("show");
    document.getElementById("toggle-popup").style.display = "block";
}

function showPopup() {
    document.getElementById("music-popup").classList.add("show");
    document.getElementById("toggle-popup").style.display = "none";
}