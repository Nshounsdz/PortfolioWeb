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
    let currentPlayingVideo = null;

    // Fonction pour afficher les bons éléments
    function filterSelection(category) {
        const columns = document.querySelectorAll(".column");

        if (category === "all") {
            columns.forEach(col => col.classList.add("show"));
        } else {
            columns.forEach(col => {
                col.classList.remove("show");
                if (col.classList.contains(category)) {
                    col.classList.add("show");
                }
            });
        }
    }

    // Appliquer le filtre "all" au chargement pour éviter que les éléments ne disparaissent
    filterSelection("all");

    // Gestion des boutons de filtre
    document.querySelectorAll("#myBtnContainer .btn").forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll("#myBtnContainer .btn").forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const category = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            filterSelection(category);
        });
    });

    // Fonction pour ouvrir la modale avec le bon média
    function openModal(mediaSrc, isVideo, title, description, originalVideo) {
        modal.style.display = "flex";

        if (isVideo) {
            modalVideo.src = mediaSrc;
            modalVideo.style.display = "block";
            modalImg.style.display = "none";
            modalVideo.play();

            if (originalVideo && !originalVideo.paused) {
                originalVideo.pause();
                currentPlayingVideo = originalVideo;
            }
        } else {
            modalImg.src = mediaSrc;
            modalImg.style.display = "block";
            modalVideo.style.display = "none";
        }

        modalCaption.innerHTML = `<strong>${title}</strong><br>${description}`;
    }

    // Sélectionne toutes les boxes `.content`
    document.querySelectorAll(".content").forEach(box => {
        box.addEventListener("click", function (event) {
            event.preventDefault();

            const img = this.querySelector("img");
            const video = this.querySelector("video");
            const title = this.querySelector("h4")?.innerText || "";
            const description = this.querySelector("p")?.innerText || "";

            if (img) {
                openModal(img.src, false, title, description, null);
            } else if (video) {
                const videoSrc = video.querySelector("source")?.src;
                if (videoSrc) {
                    openModal(videoSrc, true, title, description, video);
                }
            }
        });
    });

    // Fermeture de la modale
    function closeModal() {
        modal.style.display = "none";
        modalVideo.pause();
        modalVideo.src = "";
        currentPlayingVideo = null;
    }

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) {
        if (e.target !== modalImg && e.target !== modalVideo) {
            closeModal();
        }
    });
});
