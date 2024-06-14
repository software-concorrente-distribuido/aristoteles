document.addEventListener('DOMContentLoaded', function() {

    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();

        if (email === '' || password === '') {
            alert('Por favor, preencha todos os campos do formulário de login.');
            return;
        }

        console.log(`Login - Email: ${email}, Senha: ${password}`);

        window.location.href = "../Votacoes/Votacoes.html"
    });

});
