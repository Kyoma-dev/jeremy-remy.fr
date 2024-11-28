// Ajout d'une redirection sur clic
document.getElementById('left').addEventListener('click', function() {
    window.location.href = '{{ path("app_freelance") }}';
});

document.getElementById('right').addEventListener('click', function() {
    window.location.href = '{{ path("app_portfolio") }}';
});
