document.addEventListener('DOMContentLoaded', function() {
    const cadastroForm = document.getElementById('cadastro-form');
    const nomeInput = document.getElementById('nome');
    const emailCadastroInput = document.getElementById('email');
    const senhaCadastroInput = document.getElementById('senha');
    const cadastroContainer = document.getElementById('cadastro-container');
    const successContainer = document.getElementById('success-container');

    if (!cadastroForm || !nomeInput || !emailCadastroInput || !senhaCadastroInput) {
        console.error('Um ou mais elementos do formulário não foram encontrados.');
        return;
    }

    cadastroForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nome = nomeInput.value.trim();
        const email = emailCadastroInput.value.trim();
        const senha = senhaCadastroInput.value.trim();

        if (!nome || !email || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const distrito = document.querySelector('input[name="distrito"]:checked');
        const distritoValue = distrito ? distrito.value : null;

        if (!distritoValue) {
            alert('Por favor, selecione um distrito.');
            return;
        }

        const requestBody = {
            Name: nome,
            Email: email,
            Password: senha
        };

        fetch('https://localhost:44359/api/Auth/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                return response.text().then(errorText => {
                    throw new Error(errorText);
                });
            }
        })
        .then(token => {
            localStorage.setItem('authToken', token);

            cadastroContainer.classList.add('fade-out');
            setTimeout(() => {
                cadastroContainer.style.display = 'none';
                successContainer.style.display = 'block';
                successContainer.classList.add('fade-in');

                setTimeout(() => {
                    window.location.href = '../Login/index.html';
                }, 3000);
            }, 500);
        })
        .catch(error => {
            if (error.message === "Usuário já existe") {
                showCustomPopup("Usuário já existe. Tente com um e-mail diferente.");
            } else {
                console.error('Erro:', error.message);
            }
        });
    });

    function showCustomPopup(message) {
        const popup = document.createElement('div');
        popup.className = 'custom-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <span class="popup-close">&times;</span>
                <p>${message}</p>
            </div>
        `;

        document.body.appendChild(popup);

        popup.querySelector('.popup-close').addEventListener('click', () => {
            document.body.removeChild(popup);
        });

        setTimeout(() => {
            if (document.body.contains(popup)) {
                document.body.removeChild(popup);
            }
        }, 5000);
    }
});
