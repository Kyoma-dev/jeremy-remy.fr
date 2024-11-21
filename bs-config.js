module.exports = {
    proxy: "localhost", // Remplace par ton URL locale (par exemple localhost/symfony si tu utilises WAMP)
    files: [
        "templates/**/*.twig", // Surveiller les fichiers Twig
        "src/**/*.php",        // Surveiller les fichiers PHP
        "public/css/**/*.css", // Surveiller les fichiers CSS
        "public/js/**/*.js"    // Surveiller les fichiers JS
    ],
    reloadDelay: 200, // Délai de rechargement après un changement
    open: false, // Ne pas ouvrir automatiquement un nouvel onglet
    notify: false // Désactiver les notifications de BrowserSync
};
