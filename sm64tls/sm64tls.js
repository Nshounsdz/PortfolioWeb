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

// 🎵 Liste des musiques avec leur image de fond associée
const musicList = [
    { src: "media/musics/B3313 1.0 OST - 3rd Floor (Beta).mp3", title: "B3313 1.0 OST - 3rd Floor (Beta)", image: "media/musics/B3313 1.0 OST - 3rd Floor (Beta).png" },
    { src: "media/musics/B3313 1.0 OST - Grim Green Forest.mp3", title: "B3313 1.0 OST - Grim Green Forest", image: "media/musics/B3313 1.0 OST - Grim Green Forest.png" },
    { src: "media/musics/B3313 1.0 OST - His Domain  Plexal Hallway.mp3", title: "B3313 1.0 OST - His Domain  Plexal Hallway", image: "media/musics/B3313 1.0 OST - His Domain  Plexal Hallway.png" },
    { src: "media/musics/B3313 1.0 OST - Nebula Castle Lobby.mp3", title: "B3313 1.0 OST - Nebula Castle Lobby", image: "media/musics/B3313 1.0 OST - Nebula Castle Lobby.png" },
    { src: "media/musics/B3313 1.0 OST - Parallel Lobby.mp3", title: "B3313 1.0 OST - Parallel Lobby", image: "media/musics/B3313 1.0 OST - Parallel Lobby.png" },
    { src: "media/musics/B3313 1.0 OST - Wet-Dry Docks Dry Town.mp3", title: "B3313 1.0 OST - Wet-Dry Docks Dry Town", image: "media/musics/B3313 1.0 OST - Wet-Dry Docks Dry Town.png" },
];

const musicElement = document.getElementById("background-music");
const musicTitleElement = document.getElementById("music-title");
const musicPopup = document.getElementById("music-popup");
const playButton = document.querySelector("#music-popup button:first-of-type");
const volumeSlider = document.getElementById("volume-slider");

let lastMusicIndex = -1; // Stocke l'index de la dernière musique jouée

// 🔀 Fonction pour choisir une musique aléatoire différente de la précédente
function getRandomMusic() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * musicList.length);
    } while (newIndex === lastMusicIndex);

    lastMusicIndex = newIndex;
    return musicList[newIndex];
}

// ▶️ Fonction pour démarrer la musique et changer l’image du pop-up
function playMusic() {
    const randomMusic = getRandomMusic();
    musicElement.src = randomMusic.src;
    musicElement.volume = volumeSlider.value;
    musicTitleElement.textContent = "🎵 " + randomMusic.title;

    // Vérifie si l'élément musicPopup existe avant de modifier son style
    if (musicPopup) {
        musicPopup.style.backgroundImage = `url('${randomMusic.image}')`;
    }

    musicElement.play().then(() => {
        console.log("Lecture démarrée :", randomMusic.title);
        playButton.textContent = "⏸ Pause";
        playButton.setAttribute("onclick", "toggleMusic()");
    }).catch(error => {
        console.log("Erreur de lecture :", error);
    });
}

// ⏯ Fonction pour mettre en pause ou relancer la musique
function toggleMusic() {
    if (musicElement.paused) {
        musicElement.play();
        playButton.textContent = "⏸ Pause";
    } else {
        musicElement.pause();
        playButton.textContent = "▶️ Play";
    }
}

// 🔊 Fonction pour ajuster le volume
function adjustVolume(value) {
    musicElement.volume = value;
}

// 🔁 Quand une musique est terminée, choisir une autre et changer l'image
musicElement.addEventListener("ended", playMusic);

// 🎶 Attendre que l'utilisateur clique sur "Oui" pour démarrer
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("music-popup").classList.add("show");
    document.getElementById("volume-control").style.display = "block";
});



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
