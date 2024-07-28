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
            throw new Error('Erro ao fazer login.');
        }
    })
    .then(token => {
        localStorage.setItem('authToken', token);

        window.location.href = '../Votacoes/Votacoes.html';
    })
    .catch(error => {
        console.error('Erro:', error.message);
    });
});
