document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtendo valores dos campos
    const email = encodeURIComponent(document.getElementById('email').value);
    const password = encodeURIComponent(document.getElementById('password').value);

    // Validando os campos
    if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Construindo a URL com os parâmetros
    const url = `https://localhost:44359/api/Auth/sign-in?email=${email}&senha=${password}`;

    // Requisição fetch para o backend
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'text/plain'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.text(); // Espera-se que a resposta seja o token como string
        } else {
            throw new Error('Erro ao fazer login.');
        }
    })
    .then(token => {
        // Armazena o token no localStorage
        localStorage.setItem('authToken', token);
        
        // Redireciona para a tela de menu principal
        window.location.href = '../Votacoes/Votacoes.html'; // Substitua 'menuPrincipal.html' pela URL correta
    })
    .catch(error => {
        console.error('Erro:', error.message); // Exibe o erro no console
    });
});
