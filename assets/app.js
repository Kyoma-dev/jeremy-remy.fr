import './bootstrap.js';
import './styles/app.css';

console.log(THREE); // Devrait afficher les classes de Three.js dans la console

console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');

const isMobileOrTablet = () => window.innerWidth <= 991; // Mobile ou tablette

// Sélectionne les fruits, le texte d'instruction, et toutes les quotes
const fruits = document.querySelectorAll('.fruit');
const instruction = document.getElementById('instruction');
const quotes = document.querySelectorAll('.quote');
const aboutTitle = document.querySelector('.tree_text');

if (isMobileOrTablet() && aboutTitle) {
    aboutTitle.textContent = 'LISTE DES SAVOIRS';
}

// Si l'utilisateur est sur un mobile ou une tablette, afficher toutes les quotes
if (isMobileOrTablet()) {
    quotes.forEach(quote => {
        quote.classList.remove('hidden'); // Enlève la classe 'hidden' pour afficher toutes les quotes
        quote.style.opacity = 1; // Rend la quote visible
    });
    if (instruction) {
        instruction.style.display = 'none'; // Cacher l'instruction sur mobile/tablette
    }
} else {
    fruits.forEach(fruit => {
        fruit.addEventListener('click', () => {
            // Récupération de la classe de la quote associée
            const quoteClass = fruit.getAttribute('data-quote');

            // Masquer le message initial
            if (instruction) {
                instruction.style.display = 'none';
            }

            // Masquer toutes les quotes
            quotes.forEach(quote => {
                quote.style.opacity = 0; // Rendre les quotes invisibles
                quote.style.transition = 'opacity 0.5s ease-in-out'; // Transition de fondu
                quote.classList.add('hidden'); // Ajoute la classe 'hidden' pour les cacher
            });

            // Afficher la quote correspondante
            const selectedQuote = document.querySelector(`.${quoteClass}`);
            if (selectedQuote) {
                selectedQuote.classList.remove('hidden'); // Enlève la classe 'hidden' pour afficher la quote
                setTimeout(() => {
                    selectedQuote.style.opacity = 1; // Affiche progressivement
                }, 50);
            } else {
                console.error(`Quote with class .${quoteClass} not found!`);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('contactForm');
    const flashMessage = document.createElement('div');
    flashMessage.id = 'flashMessage';
    flashMessage.style.marginTop = '20px';
    flashMessage.style.padding = '15px';
    flashMessage.style.borderRadius = '5px';
    flashMessage.style.textAlign = 'center';
    flashMessage.style.fontSize = '1.2em';
    form.parentNode.insertBefore(flashMessage, form);

    if (form) {
        form.reset();
    }
    

    form.addEventListener('submit', async function (e) {
        e.preventDefault(); // Empêche le rechargement de la page

        const response = grecaptcha.getResponse();
        if (response.length === 0) {
            alert("Veuillez compléter le captcha.");
            return;
        }

        const formData = new FormData(form);

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: formData,
            });

            const result = await res.text(); // Utilisez await res.json() si la réponse est un JSON

            if (res.ok) {
                flashMessage.textContent = 'Votre message a été envoyé avec succès.';
                flashMessage.className = 'flash-message success';
                form.style.display = 'none'; // Cache le formulaire après l'envoi
            } else {
                flashMessage.textContent = 'Erreur lors de l\'envoi de l\'e-mail.';
                flashMessage.className = 'flash-message error';
            }
        } catch (error) {
            flashMessage.textContent = 'Une erreur est survenue. Veuillez réessayer plus tard.';
            flashMessage.className = 'flash-message error';
        }

        flashMessage.style.display = 'block';
    });
    
    // Slider
    const carousel = document.querySelector('.carousel');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const slideshowTrack = document.querySelector('.slideshow-track');
    let isMouseDown = false;
    let startX;
    let scrollLeft;
    let currentIndex = 0;

    // Fonction pour mettre à jour la position du carousel
    function updateCarousel() {
        const cardWidth = carousel.children[0].getBoundingClientRect().width;
        carousel.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    }

    // Événement pour le bouton précédent
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = carousel.children.length - 1; // Aller à la dernière carte si on dépasse
        }
        updateCarousel();
    });

    // Événement pour le bouton suivant
    nextButton.addEventListener('click', () => {
        if (currentIndex < carousel.children.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Revenir à la première carte si on dépasse
        }
        updateCarousel();
    });

    // Logique pour le glissement et le "grab"
    slideshowTrack.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.pageX - slideshowTrack.offsetLeft;
        scrollLeft = slideshowTrack.scrollLeft;
        slideshowTrack.style.cursor = 'grabbing';
    });

    slideshowTrack.addEventListener('mouseleave', () => {
        isMouseDown = false;
        slideshowTrack.style.cursor = 'grab';
    });

    slideshowTrack.addEventListener('mouseup', () => {
        isMouseDown = false;
        slideshowTrack.style.cursor = 'grab';
    });

    slideshowTrack.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - slideshowTrack.offsetLeft;
        const walk = (x - startX) * 2; // Ajuste la sensibilité du déplacement
        slideshowTrack.scrollLeft = scrollLeft - walk;
    });

    // Logique pour le touch sur mobile et tablette
    slideshowTrack.addEventListener('touchstart', (e) => {
        isMouseDown = true;
        startX = e.touches[0].pageX - slideshowTrack.offsetLeft;
        scrollLeft = slideshowTrack.scrollLeft;
    });

    slideshowTrack.addEventListener('touchend', () => {
        isMouseDown = false;
    });

    slideshowTrack.addEventListener('touchmove', (e) => {
        if (!isMouseDown) return;
        const x = e.touches[0].pageX - slideshowTrack.offsetLeft;
        const walk = (x - startX) * 2;
        slideshowTrack.scrollLeft = scrollLeft - walk;
    });

    // Mise à jour de la position lors du redimensionnement de la fenêtre
    window.addEventListener('resize', updateCarousel);

    // Initialisation du carousel à la position correcte
    updateCarousel();

    const header = document.querySelector('.contact-header h1');
    header.style.transition = 'transform 1s ease, opacity 1s ease';

    const contactIcons = document.querySelectorAll('.contact-icons i');

    const landingIcons = document.querySelector('.landing_button i');

    const slideshowItems = document.querySelectorAll('.slideshow-item');

    const navbar = document.querySelector('.navbar');

    const contactForm = document.querySelector('.contact-form');

    window.addEventListener('scroll', () => {
        const formRect = contactForm.getBoundingClientRect();
        const rect = header.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // Animation pour le header
        if (rect.top <= windowHeight && rect.bottom >= 0) {
            header.style.transform = 'scale(1)';
            header.style.opacity = '1';
        } else {
            header.style.transform = 'scale(2.5)';
            header.style.opacity = '0';
        }

        if (formRect.top <= windowHeight && formRect.bottom >= 0) {
            // Applique l'effet de glissement si le formulaire est visible
            contactForm.classList.add('visible');
        }

        // Animation pour les icônes des contacts
        contactIcons.forEach((icon, index) => {
            const iconRect = icon.getBoundingClientRect();

            if (iconRect.top <= windowHeight && iconRect.bottom >= 0) {
                // Applique l'effet de "pop" avec un délai pour chaque icône
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                    icon.style.opacity = '1';
                }, index * 200); // Délai de 200 ms entre chaque icône
            } else {
                // Réinitialise l'effet si l'icône sort de la vue
                icon.style.transform = 'scale(0)';
                icon.style.opacity = '0';
            }
        });

        slideshowItems.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();

            if (itemRect.top <= windowHeight && itemRect.bottom >= 0) {
                // Applique l'effet de "pop" avec un délai pour chaque item
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 200); // Délai de 200 ms entre chaque item
            }
        });

        if (window.scrollY > 50) {
            navbar.classList.add('navbar-shrink');
        } else {
            navbar.classList.remove('navbar-shrink');
        }

    });
});
