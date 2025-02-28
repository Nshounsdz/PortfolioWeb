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