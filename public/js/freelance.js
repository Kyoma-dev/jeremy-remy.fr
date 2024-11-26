document.addEventListener("DOMContentLoaded", () => {
    console.log("Hello, Freelance!");
    const logo = document.getElementById("logo");
    const logoContainer = document.getElementById("logo-container");
    const content = document.getElementById("content");

    const maxLogoSize = 50; // Taille maximale en pourcentage
    const scrollThreshold = 200; // Distance de scroll avant que le contenu apparaisse

    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;

        // Ajustez la taille du logo en fonction du scroll
        const size = Math.min(maxLogoSize, 10 + scrollPosition / 5);
        logo.style.maxWidth = `${size}%`;
        logo.style.maxHeight = `${size}%`;

        // Si le logo atteint la taille maximale
        if (scrollPosition >= scrollThreshold) {
            content.classList.add("visible");
            logoContainer.classList.add("hidden");
            document.body.classList.add("content-visible"); // Passe le fond en blanc
        } else {
            content.classList.remove("visible");
            logoContainer.classList.remove("hidden");
            document.body.classList.remove("content-visible"); // Reviens au fond noir
        }
    });

    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            shape: {
                type: ["circle", "triangle"], // Particules de formes variées
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                },
                image: {
                    src: "{{ asset('images/logo.png') }}", // Image personnalisée (optionnel)
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: 0.5,
                random: true
            },
            size: {
                value: 4,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 4,
                direction: "none",
                random: false,
                straight: false,
                bounce: false,
                attract: {
                    enable: false
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "bubble" // Les particules grossissent au survol
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 200,
                    size: 10,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                }
            }
        },
        retina_detect: true
    });    
    
    const form = document.querySelector('.typeform-style');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Formulaire soumis avec les données :', new FormData(form));
});
});