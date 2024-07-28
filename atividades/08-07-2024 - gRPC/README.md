## Como executar o código
### Pré-requisitos

* **Docker:** Certifique-se de ter o Docker instalado e em execução em sua máquina. Você pode baixar e instalar o Docker a partir do site oficial: [https://www.docker.com/get-started](https://www.docker.com/get-started)

### Instalação

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/software-concorrente-distribuido/aristoteles.git
   cd atividades/'08-07-2024 - gRPC'
   ```

2. **Instale as Dependências:**
   ```bash
   pip install -r requirements.txt
   ```

### Execução

1. **Inicie os Contêineres Docker:**
   ```bash
   docker compose up -d
   ```

2. **Execute o Servidor:**
   Abra um terminal e execute o seguinte comando:
   ```bash
   python server/server.py
   ```

3. **Execute o Cliente:**
   Abra outro terminal e execute o seguinte comando:
   ```bash
   python client/client.py
   ```
