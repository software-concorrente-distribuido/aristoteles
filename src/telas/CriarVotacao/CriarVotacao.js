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


document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu i');
    const menuContent = document.querySelector('.menu-content');
    const addButton = document.querySelector('.add-btn');
    const emailInput = document.getElementById('novo-participante');
    const emailContainer = document.getElementById('email-container');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    const addEmailBadge = (email) => {
        const badge = document.createElement('div');
        badge.classList.add('email-badge');
        badge.innerHTML = `
            ${email} 
            <i class="fas fa-times"></i>
        `;

        badge.querySelector('i').addEventListener('click', () => {
            emailContainer.removeChild(badge);
        });

        emailContainer.appendChild(badge);
    }

    addButton.addEventListener('click', () => {
        const email = emailInput.value.trim();
        if (validateEmail(email)) {
            addEmailBadge(email);
            emailInput.value = '';
        } else {
            alert('Por favor, insira um e-mail válido.');
        }
    });

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
