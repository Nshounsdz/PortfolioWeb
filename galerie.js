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

filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}


// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("mediaModal");
    const modalImg = document.getElementById("modalImg");
    const modalVideo = document.getElementById("modalVideo");
    const modalCaption = document.getElementById("modalCaption");
    const closeBtn = document.querySelector(".close");
    let currentPlayingVideo = null; // Stocke la vidéo miniature en lecture

    // ✅ 1️⃣ Fonction pour afficher correctement les éléments lors du scroll
    function revealOnScroll() {
        let elements = document.querySelectorAll(".fade-in");
        let windowHeight = window.innerHeight;

        elements.forEach(el => {
            let elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 50) { // Si l'élément est visible
                el.classList.add("visible");
            }
        });
    }

    // ✅ 2️⃣ Appliquer l'effet fade-in sur le scroll
    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);

    // ✅ 3️⃣ Fonction pour ouvrir la modale avec le bon média et la bonne description
    function openModal(mediaSrc, isVideo, title, originalBox, originalVideo) {
        modal.style.display = "flex";

        if (isVideo) {
            modalVideo.src = mediaSrc;
            modalVideo.style.display = "block";
            modalImg.style.display = "none";
            modalVideo.play();

            // ⛔ Met en pause la vidéo miniature AVANT d'ouvrir la modale
            if (originalVideo && !originalVideo.paused) {
                originalVideo.pause();
                currentPlayingVideo = originalVideo;
            }
        } else {
            modalImg.src = mediaSrc;
            modalImg.style.display = "block";
            modalVideo.style.display = "none";
        }

        // ✅ Crée un conteneur pour le texte et ajoute le titre
        const descriptionContainer = document.createElement("div");
        descriptionContainer.innerHTML = `<strong>${title}</strong>`;

        // ✅ Récupère SEULEMENT les <p> de la box cliquée et les ajoute
        const allParagraphs = originalBox.querySelectorAll("p");
        allParagraphs.forEach(p => {
            const newP = document.createElement("p");
            newP.textContent = p.textContent;
            descriptionContainer.appendChild(newP);
        });

        // ✅ Met à jour la modale avec le bon texte
        modalCaption.innerHTML = "";
        modalCaption.appendChild(descriptionContainer);
    }

    // ✅ 4️⃣ Rendre toute la box `.content` cliquable
    document.querySelectorAll(".content").forEach(box => {
        box.addEventListener("click", function (event) {
            event.preventDefault(); // Empêche la lecture automatique des vidéos miniatures

            const img = this.querySelector("img");
            const video = this.querySelector("video");
            const title = this.querySelector("h4")?.innerText || "";

            if (img) {
                openModal(img.src, false, title, this, null);
            } else if (video) {
                const videoSrc = video.querySelector("source")?.src;
                if (videoSrc) {
                    openModal(videoSrc, true, title, this, video);
                }
            }
        });
    });

    // ✅ 5️⃣ Fonction pour fermer la modale proprement
    function closeModal() {
        modal.style.display = "none";
        modalVideo.pause();
        modalVideo.src = ""; // Réinitialise la source pour éviter la reprise automatique

        // ⛔ Ne relance PAS la vidéo miniature après la fermeture
        currentPlayingVideo = null;
    }

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) {
        if (e.target !== modalImg && e.target !== modalVideo) {
            closeModal();
        }
    });
});