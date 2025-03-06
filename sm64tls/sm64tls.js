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
        document.getElementById("volume-control").style.display = "block";
    }, 1000);
});

let hidePopupTimeout;

function startHidePopupTimer() {
    hidePopupTimeout = setTimeout(hidePopup, 10000);
}

function cancelHidePopupTimer() {
    clearTimeout(hidePopupTimeout);
}

document.getElementById("music-popup").addEventListener("mouseleave", startHidePopupTimer);
document.getElementById("music-popup").addEventListener("mouseenter", cancelHidePopupTimer);

document.getElementById("toggle-popup").addEventListener("click", function() {
    showPopup();
    cancelHidePopupTimer();
});

function playMusic() {
    const music = document.getElementById("background-music");
    music.volume = 0.5;
    music.play().catch(error => console.log("Lecture bloquée :", error));
    const playButton = document.querySelector("#music-popup button:first-of-type");
    playButton.textContent = "Stop";
    playButton.setAttribute("onclick", "toggleMusic()")
}

function toggleMusic() {
    const music = document.getElementById("background-music");
    const button = document.querySelector("#music-popup button:first-of-type");
    if (music.paused) {
        music.play();
        button.textContent = "Stop";
    } else {
        music.pause();
        button.textContent = "Play";
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

const body = document.body;

// Variable pour stocker l'état du clic
let isClicked = false;

// Événement pour détecter le clic gauche
body.addEventListener('mousedown', () => {
    if (event.button === 0) { // 0 pour le clic gauche
        isClicked = true;
        body.style.cursor = 'url("media/mouse/hand_closed.rgba16.png"), auto'; // Curseur personnalisé pendant le clic
    }
});

// Événement pour détecter la fin du clic
body.addEventListener('mouseup', () => {
    isClicked = false;
    body.style.cursor = 'url("media/mouse/hand_open.rgba16.png"), auto'; // Retour au curseur par défaut après le relâchement
});


let lastX = 0, lastY = 0;
const minDistance = 45; // Distance minimale entre chaque étoile
let gifIndex = 0; // Index pour alterner entre les GIFs

// Liste des GIFs à alterner
const gifPaths = [
    "media/mouse/redstar.gif", // Remplace avec le bon chemin du premier GIF
    "media/mouse/sparkles.gif"  // Remplace avec le bon chemin du deuxième GIF
];

document.addEventListener("mousemove", function(event) {
    const dist = Math.sqrt((event.pageX - lastX) ** 2 + (event.pageY - lastY) ** 2);
    
    if (dist > minDistance) { // Vérifie si la distance minimale est atteinte
        lastX = event.pageX;
        lastY = event.pageY;
        createMouseTrail(event.pageX, event.pageY);
    }
});

function createMouseTrail(x, y) {
    const img = document.createElement("img");
    img.src = gifPaths[gifIndex]; // Alterne entre les GIFs
    img.classList.add("mouse-trail");
    
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;

    document.body.appendChild(img);

    // Alterne entre les GIFs (0 → 1 → 0 → 1 ...)
    gifIndex = (gifIndex + 1) % gifPaths.length;

    // Lance l'animation après un petit délai
    setTimeout(() => {
        img.style.transform = "translate(-50%, 30px)"; // L'étoile tombe de 30px
        img.style.opacity = "0"; // Disparition progressive

        setTimeout(() => {
            img.remove();
        }, 500); // Supprime l'étoile après l'animation
    }, 500);
}
