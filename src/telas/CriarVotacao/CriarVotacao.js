document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu i');
    const menuContent = document.querySelector('.menu-content');
    const addButton = document.querySelector('.add-btn');
    const emailInput = document.getElementById('novo-participante');
    const emailContainer = document.getElementById('email-container');
    const opcoesList = document.getElementById('opcoes-list');
    const form = document.querySelector('form');
    const saveButton = document.querySelector('.save-btn');

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

    const logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
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

    form.addEventListener('submit', function(event) {
        event.preventDefault();
    
        if (validateForm()) {
            const formData = new FormData(form);
            const formValues = {};
    
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
    
            const emailBadges = emailContainer.querySelectorAll('.email-badge');
            const emails = [];
            
            emailBadges.forEach(badge => {
                emails.push(badge.textContent.trim());
            });
            formValues['emails'] = emails;

            const selectedOptions = [];
            opcoesList.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                selectedOptions.push(checkbox.value);
            });
            formValues['opcoes'] = selectedOptions;
    
            console.log(formValues);
        }
    });

    function validateForm() {
        const titulo = document.getElementById('titulo').value.trim();
        const descricao = document.getElementById('descricao').value.trim();
        const emails = emailContainer.querySelectorAll('.email-badge').length;
        const selectedOptions = opcoesList.querySelectorAll('input[type="checkbox"]:checked').length;

        if (titulo === '') {
            alert('Por favor, preencha o título.');
            return false;
        }

        if (descricao === '') {
            alert('Por favor, preencha a descrição.');
            return false;
        }

        if (emails < 2) {
            alert('Por favor, adicione pelo menos dois e-mails de votantes.');
            return false;
        }

        if (selectedOptions < 2) {
            alert('Por favor, selecione pelo menos dois candidatos.');
            return false;
        }

        return true;
    }
});

function loadCandidatos(token) {
    const url = 'https://localhost:44359/api/Candidato/get-cadastro-candidatos';

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erro ao carregar os candidatos.');
        }
    })
    .then(candidatos => {
        const opcoesList = document.getElementById('opcoes-list');
        opcoesList.innerHTML = '';

        candidatos.forEach(candidato => {
            const label = document.createElement('label');
            label.classList.add('radio-container');
            label.innerHTML = `
                ${candidato.name} - ${candidato.email}
                <input type="checkbox" name="opcao" value="${candidato.id}">
                <span class="checkmark"></span>
            `;
            opcoesList.appendChild(label);
        });
    })
    .catch(error => {
        console.error('Erro:', error.message);
    });
}
