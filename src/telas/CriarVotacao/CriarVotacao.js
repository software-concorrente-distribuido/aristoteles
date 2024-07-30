document.addEventListener('DOMContentLoaded', function () {

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

    const opcoesList = document.getElementById('opcoes-list');
    const form = document.querySelector('form');
    const saveButton = document.querySelector('.save-btn');
    const emailInput = document.getElementById('novo-participante');
    const emailContainer = document.getElementById('email-container');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (validateForm()) {
            const formData = new FormData(form);
            const formValues = {};

            formData.forEach((value, key) => {
                formValues[key] = value;
            });

            const selectedOptions = [];
            opcoesList.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                selectedOptions.push(checkbox.value);
            });
            formValues['opcoes'] = selectedOptions;

            const jsonData = {
                titulo: formValues.titulo,
                descricao: formValues.descricao,
                candidatos: formValues.opcoes.map(id => parseInt(id))
            };

            const token = localStorage.getItem('authToken');

            const url = new URL('https://localhost:44359/api/Election/createElection');
            url.searchParams.append('name', encodeURIComponent(jsonData.titulo));
            url.searchParams.append('description', encodeURIComponent(jsonData.descricao));

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(jsonData.candidatos)
            })
                .then(response => {
                    if (response.ok) {
                        return response.json().catch(() => {});
                    } else {
                        throw new Error('Erro ao criar a eleição.');
                    }
                })
                .then(data => {
                    showSuccessPopup();
                })
                .catch(error => {
                    console.error('Erro:', error.message);
                });
        }
    });

    function validateForm() {
        const titulo = document.getElementById('titulo').value.trim();
        const descricao = document.getElementById('descricao').value.trim();
        const selectedOptions = opcoesList.querySelectorAll('input[type="checkbox"]:checked').length;
    
        const errorList = [];
    
        if (titulo === '') {
            errorList.push('Por favor, preencha o título.');
        }
    
        if (descricao === '') {
            errorList.push('Por favor, preencha a descrição.');
        }
    
        if (selectedOptions < 2) {
            errorList.push('Por favor, selecione pelo menos dois candidatos.');
        }
    
        if (errorList.length > 0) {
            showErrorPopup(errorList);
            return false;
        }
    
        return true;
    }

    function showSuccessPopup() {
        const popup = document.getElementById('success-popup');
        const countdownElement = document.getElementById('countdown');
        let countdown = 3;
    
        popup.style.display = 'flex';
    
        const interval = setInterval(() => {
            countdown -= 1;
            countdownElement.textContent = countdown;
    
            if (countdown <= 0) {
                clearInterval(interval);
                window.location.href = '../Votacoes/Votacoes.html';
            }
        }, 1000);
    }

    function showErrorPopup(errors) {
        const popup = document.getElementById('error-popup');
        const errorList = document.getElementById('error-list');
        const closeButton = document.getElementById('popup-close');

        errorList.innerHTML = '';
    
        errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            errorList.appendChild(li);
        });
    
        popup.style.display = 'flex';

        const timeout = setTimeout(() => {
            popup.style.display = 'none';
        }, 5000);

        closeButton.addEventListener('click', () => {
            clearTimeout(timeout);
            popup.style.display = 'none';
        });
    }
});
