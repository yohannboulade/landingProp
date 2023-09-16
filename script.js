// script.js
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".fade-in");
    const windowHeight = window.innerHeight;

    function checkVisibility() {
        elements.forEach(function (element) {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight) {
                element.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();
});

// Ajoutez ce script à votre page ou fichier JavaScript
document.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.querySelector('[name=email]').value;
    const listId = '2548262';
    console.log(email);
    fetch('/.netlify/functions/addEmailToList', {
      method: 'POST',
      body: JSON.stringify({ email, listId }),
    })
      .then(response => response.json())
      .then(data => console.log(data.message))
      .catch(error => console.error('Erreur :', error));
});
