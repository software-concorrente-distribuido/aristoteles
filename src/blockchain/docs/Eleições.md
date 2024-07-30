# Documentação do Smart Contract de Votação

## Visão Geral

Este smart contract facilita a criação, gestão e execução de eleições. Ele permite o registro de candidatos, eleitores, e fornece funcionalidades para votação e gestão do período eleitoral.

## Detalhes do Contrato

### Identificador de Licença SPDX
```solidity
// SPDX-License-Identifier: MIT
```

### Versão do Solidity
```solidity
pragma solidity ^0.8.24;
```

### Contrato: `Voting`

### Constantes

- `MAX_TIMESTAMP`: Uma constante que representa um valor indefinido para o final de uma eleição, quando ela é criada sem período por `createElection`.

```solidity
uint public constant MAX_TIMESTAMP = 9999999999;
```

### Estruturas

- `Election`: Representa uma eleição com várias propriedades, incluindo ID, nome, descrição, endereço do administrador, endereço da cédula, horários de início e término, status e timestamps de criação e atualização.

```solidity
struct Election {
    uint id;
    string name;
    string description;
    address admin;
    address ballotAddress;
    uint startedAt;
    uint endedAt;
    bool isStarted;
    uint createdAt;
    uint updatedAt;
}
```

- `Candidate`: Representa um candidato com um ID, nome, endereço do delegado, contagem de votos e timestamps de criação e atualização.

```solidity
struct Candidate {
    uint id;
    string name;
    address delegate;
    uint votes;
    uint createdAt;
    uint updatedAt;
}
```

- `Voter`: Representa um eleitor com um ID, nome, endereço do delegado, hash da senha e timestamps de criação e atualização.

```solidity
struct Voter {
    uint id;
    string name;
    address delegate;
    bytes32 passwordHash;
    uint createdAt;
    uint updatedAt;
}
```

- `ElectionResults`: Estrutura que contém uma eleição (Election) e uma lista de candidatos (Candidate[]).

```solidity
struct ElectionResults {
    Election election;
    Candidate[] candidates;
}
```

### Mapeamentos

#### Elections

O mapeamento `elections` é usado para armazenar os detalhes sobre cada eleição. Cada eleição possui um `id` e as propriedades `name`, `description`, `admin`, `ballotAddress`, `createdAt`, `startedAt`, `endedAt`, `isStarted` e `updatedAt`.

```json
{
  "elections": {
    "1": {
      "id": 1,
      "name": "Presidential Election",
      "description": "Election for the president",
      "admin": "0xAdminAddress1",
      "ballotAddress": "0xBallotAddress1",
      "createdAt": 1234567890,
      "startedAt": 0,
      "endedAt": 9999999999,
      "isStarted": false,
      "updatedAt": 1234567890
    },
    "2": {
      "id": 2,
      "name": "Congressional Election",
      "description": "Election for the congress",
      "admin": "0xAdminAddress2",
      "ballotAddress": "0xBallotAddress2",
      "createdAt": 1234567891,
      "startedAt": 0,
      "endedAt": 9999999999,
      "isStarted": false,
      "updatedAt": 1234567891
    }
  }
}
```

#### Election Candidates

O mapeamento `electionCandidates` armazena os candidatos de cada eleição. É um mapeamento aninhado, onde o primeiro nível é o ID da eleição e o segundo nível é o ID do candidato. Cada candidato possui um `id`, `name`, `delegate`, `votes`, `createdAt` e `updatedAt`.

```json
{
  "electionCandidates": {
    "1": {
      "1": {
        "id": 1,
        "name": "Candidate A",
        "delegate": "0xCandidateAddress1",
        "votes": 0,
        "createdAt": 1234567890,
        "updatedAt": 1234567890
      },
      "2": {
        "id": 2,
        "name": "Candidate B",
        "delegate": "0xCandidateAddress2",
        "votes": 0,
        "createdAt": 1234567891,
        "updatedAt": 1234567891
      }
    }
  }
}
```

#### Election Candidates Count

O mapeamento `electionCandidatesCount` armazena o número de candidatos para cada eleição. É um mapeamento do ID da eleição para um número inteiro que representa a contagem de candidatos.

```json
{
  "electionCandidatesCount": {
    "1": 2
  }
}
```

## Election Voters

O mapeamento `electionVoters` armazena os eleitores de cada eleição. É um mapeamento aninhado, onde o primeiro nível é o ID da eleição e o segundo nível é o ID do eleitor. Cada eleitor possui um `id`, `name`, `delegate`, `passwordHash`, `createdAt` e `updatedAt`.

```json
{
  "electionVoters": {
    "1": {
      "1": {
        "id": 1,
        "name": "Voter A",
        "delegate": "0xVoterAddress1",
        "passwordHash": "0xHashedPassword1",
        "createdAt": 1234567890,
        "updatedAt": 1234567890
      },
      "2": {
        "id": 2,
        "name": "Voter B",
        "delegate": "0xVoterAddress2",
        "passwordHash": "0xHashedPassword2",
        "createdAt": 1234567891,
        "updatedAt": 1234567891
      }
    }
  }
}
```

#### Election Voters Count

O mapeamento `electionVotersCount` armazena o número de eleitores para cada eleição. É um mapeamento do ID da eleição para um número inteiro que representa a contagem de eleitores.

```json
{
  "electionVotersCount": {
    "1": 2
  }
}
```

#### Has Voted

O mapeamento `hasVoted` armazena se um eleitor já votou em uma eleição específica. É um mapeamento aninhado onde o primeiro nível é o ID da eleição e o segundo nível é o endereço do eleitor, com um booleano indicando se o eleitor votou.

```json
{
  "hasVoted": {
    "1": {
      "0xVoterAddress1": true,
      "0xVoterAddress2": false
    }
  }
}
```

Este mapeamento indica que na eleição com ID 1, o eleitor com o endereço `0xVoterAddress1` já votou, enquanto o eleitor com o endereço `

0xVoterAddress2` ainda não votou.

### Funções

#### Públicas

- `getElection(uint _electionId)`: Retorna a estrutura `Election` para o ID da eleição fornecido.
- `getElectionCandidate(uint _electionId, uint _candidateId)`: Retorna a estrutura `Candidate` para os IDs da eleição e do candidato fornecidos.
- `getElectionVoter(uint _electionId, uint _voterId)`: Retorna a estrutura `Voter` para os IDs da eleição e do eleitor fornecidos.
- `getElectionsCount()`: Retorna o número total de eleições.
- `getElectionCandidatesCount(uint _electionId)`: Retorna o número de candidatos para o ID da eleição fornecido.
- `getElectionVotersCount(uint _electionId)`: Retorna o número de eleitores para o ID da eleição fornecido.
- `hasVotedInElection(uint _electionId, address _voterAddress)`: Retorna se o eleitor votou na eleição fornecida.
- `getMaxTimestamp()`: Retorna o timestamp máximo.

#### Interfaces 

- `getVoterElections(address _voterAddress)`: Retorna um array de estruturas Election para as eleições em que um eleitor específico está registrado como delegado.
- `getCandidateElections(address _delegate)`: Retorna um array de estruturas Election para as eleições em que um candidato específico está registrado como delegado.
- `getStartedElections()`: Retorna um array de estruturas Election para as eleições que estão em andamento.
- `getElectionsWithResults()`: Retorna um array de estruturas ElectionResults para as eleições que já terminaram, incluindo os resultados dos candidatos.


#### Gestão de Eleição

- `hasElectionStarted(uint _electionId)`: Verifica se a eleição começou.
- `hasElectionEnded(uint _electionId)`: Verifica se a eleição terminou.
- `startElection(uint _electionId)`: Inicia a eleição. Somente o administrador pode chamar.
- `endElection(uint _electionId, string memory _desc)`: Encerra a eleição e atualiza sua descrição. Somente o administrador pode chamar.
- `getElectionPeriod(uint _electionId)`: Retorna os períodos de início e término da eleição.
- `extendElectionPeriod(uint _electionId, uint time)`: Estende o período da eleição por um tempo especificado. Somente o administrador pode chamar.
- `setElectionPeriod(uint _electionId, uint _startPeriod, uint _endPeriod)`: Define os períodos de início e término da eleição. Somente o administrador pode chamar.
- `endElections()`: Encerra todas as eleições em andamento cujo tempo de término já passou.

#### Gestão de Candidatos

- `addCandidate(uint _electionId, string memory _name, address _delegate)`: Adiciona um candidato à eleição. Somente o administrador pode chamar.
- `removeCandidateElection(uint _electionId, uint _candidateId)`: Remove um candidato da eleição. Somente o administrador pode chamar.
- `updateCandidate(uint _electionId, uint _candidateId, string memory _name)`: Atualiza os detalhes de um candidato. Somente o administrador pode chamar.
- `withdrawFromElection(uint _electionId, uint _candidateId)`: Permite que um candidato se retire da eleição. Somente o candidato pode chamar.

#### Gestão de Eleitores

- `addVoter(uint _electionId, string memory _name, string memory _password, address _delegate)`: Adiciona um eleitor à eleição. Somente o administrador pode chamar.
- `castVote(uint _electionId, uint _candidateId)`: Permite que um eleitor vote em um candidato em uma eleição.

### Modificadores

- `onlyAdmin(uint _electionId)`: Garante que o chamador seja o administrador da eleição.
- `onlyCandidate(uint _electionId, uint _candidateId)`: Garante que o chamador seja o delegado do candidato.
- `onlyVoter(uint _electionId, uint _voterId)`: Garante que o chamador seja o delegado do eleitor.

### Implantação

O construtor do contrato inicializa o `electionsCount` com zero.

```solidity
constructor() {
    electionsCount = 0;
}
```

### Uso

1. **Criando uma Eleição:**
   - Chame `createElection` com ou sem horários de início e término predefinidos.
2. **Gerenciando Candidatos:**
   - Adicione, atualize ou remova candidatos usando `addCandidate`, `updateCandidate` e `removeCandidateElection`.
3. **Gerenciando Eleitores:**
   - Adicione ou atualize eleitores usando `addVoter` e `updateVoter`.
5. **Iniciando e Terminando Eleições:**
   - Inicie uma eleição usando `startElection`.
   - Encerre uma eleição usando `endElection`.
6. **Votação:**
   - Os eleitores podem votar usando `castVote`.

### O quê cada Papel pode executar no Sistema

#### Administrador (Admin)
- Criar, iniciar e encerrar eleições.
- Adicionar, atualizar e remover candidatos.
- Adicionar e atualizar eleitores.
- Estender ou definir o período eleitoral.

#### Candidato (Candidate)
- Retirar-se de uma eleição na qual esteja registrado.

#### Eleitor (Voter)
- Votar em candidatos em eleições nas quais estejam registrados.
