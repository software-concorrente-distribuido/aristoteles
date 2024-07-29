document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = encodeURIComponent(document.getElementById('email').value);
    const password = encodeURIComponent(document.getElementById('password').value);

    if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const url = `https://localhost:44359/api/Auth/sign-in?email=${email}&senha=${password}`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'text/plain'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            return response.text().then(errorText => {
                throw new Error(errorText || 'Erro ao fazer login.');
            });
        }
    })
    .then(token => {
        localStorage.setItem('authToken', token);
        window.location.href = '../Votacoes/Votacoes.html';
    })
    .catch(error => {
        showCustomPopup();
    });

    function showCustomPopup() {
        const existingPopup = document.querySelector('.custom-popup');
        if (existingPopup) {
            existingPopup.remove();
        }

        const popup = document.createElement('div');
        popup.className = 'custom-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <span class="popup-close">&times;</span>
                <p>Email e/ou senha incorreto(s)</p>
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
