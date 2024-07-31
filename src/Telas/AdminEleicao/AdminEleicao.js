document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu i');
    const menuContent = document.querySelector('.menu-content');

    menuIcon.addEventListener('click', function() {
        menuContent.classList.toggle('show');
        
        const isVisible = menuContent.classList.contains('show');
        
        menuContent.style.maxHeight = isVisible ? menuContent.scrollHeight + "px" : "0";
    });

    document.addEventListener('click', function(event) {
        if (!menuIcon.contains(event.target) && !menuContent.contains(event.target)) {
            menuContent.classList.remove('show');
            menuContent.style.maxHeight = "0";
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const emailContainer = document.querySelector('#email-container');

    const logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', function (event) {
            event.preventDefault();
            localStorage.removeItem('authToken');
            window.location.href = '../Login/index.html';
        });
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '../Login/index.html';
    } else {
        loadCandidatos(token);
    }
});
