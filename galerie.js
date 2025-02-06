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

    // Gestion des images
    document.querySelectorAll(".content img").forEach(img => {
        img.addEventListener("click", function () {
            modal.style.display = "flex";
            modalImg.src = this.src;
            modalImg.style.display = "block";
            modalVideo.style.display = "none";

            // Récupère le titre et la description associés
            let title = this.closest(".content").querySelector("h4")?.innerText || "";
            let description = this.closest(".content").querySelector("p")?.innerText || "";
            modalCaption.innerHTML = `<strong>${title}</strong><br>${description}`;
        });
    });

    // Gestion des vidéos
    document.querySelectorAll(".content video").forEach(video => {
        video.addEventListener("click", function (e) {
            e.preventDefault(); // Empêche la vidéo de démarrer en petit format
            modal.style.display = "flex";
            modalVideo.src = this.querySelector("source").src;
            modalVideo.style.display = "block";
            modalImg.style.display = "none";
            modalVideo.play(); // Joue automatiquement la vidéo

            // Récupère le titre et la description associés
            let title = this.closest(".content").querySelector("h4")?.innerText || "";
            let description = this.closest(".content").querySelector("p")?.innerText || "";
            modalCaption.innerHTML = `<strong>${title}</strong><br>${description}`;
        });
    });

    // Fermeture de la modale
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
        modalVideo.pause(); // Met en pause la vidéo
    });

    modal.addEventListener("click", function (e) {
        if (e.target !== modalImg && e.target !== modalVideo) {
            modal.style.display = "none";
            modalVideo.pause(); // Met en pause la vidéo si elle est ouverte
        }
    });
});
