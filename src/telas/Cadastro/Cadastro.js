document.addEventListener('DOMContentLoaded', function() {

    const cadastroForm = document.getElementById('cadastro-form');
    const nomeInput = document.getElementById('nome');
    const emailCadastroInput = document.getElementById('email');
    const senhaCadastroInput = document.getElementById('senha');

    if (!cadastroForm || !nomeInput || !emailCadastroInput || !senhaCadastroInput) {
        console.error('Um ou mais elementos do formulário não foram encontrados.');
        return;
    }

    cadastroForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let nome = nomeInput.value.trim();
        let email = emailCadastroInput.value.trim();
        let senha = senhaCadastroInput.value.trim();

        if (nome === '' || email === '' || senha === '') {
            alert('Por favor, preencha todos os campos do formulário de cadastro.');
            return;
        }

        console.log(`Cadastro - Nome: ${nome}, Email: ${email}, Senha: ${senha}`);
        window.location.href = "../Votacoes/Votacoes.html"
    });
});
