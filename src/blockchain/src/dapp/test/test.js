const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Contrato de Votação", function () {
    const TOLERANCE = 30; // Tolerância por delay entre a execução dos testes e a consulta
    const DURATION = 604800;
    let Voting;
    let voting;
    let admin;
    let candidate1;
    let candidate2;
    let voter1;
    let voter2;

    beforeEach(async function () {
        [admin, candidate1, candidate2, voter1, voter2] = await ethers.getSigners();

        Voting = await ethers.getContractFactory("Voting");
        voting = await Voting.deploy();
        await voting.deployed();
    });

    async function createElection(name, description, withPeriod = false) {
        const currentTime = Math.round(Date.now() / 1000);
        if (withPeriod) {
            await voting["createElection(string,string,uint256,uint256)"](
                name, description, currentTime + DURATION, currentTime + 2 * DURATION
            );
        } else {
            await voting["createElection(string,string)"](name, description);
        }
    }

    // Eleição

    describe("Admin", function () {
        describe("Gestão de Election", function () {

            // Criação da Eleição

            it("Deve criar uma eleição sem período pré-definido", async function () {
                await createElection("Eleição A", "Descrição A");
                const election = await voting.getElection(0);
                expect(election.name).to.equal("Eleição A");
                expect(election.description).to.equal("Descrição A");
                expect(election.admin).to.equal(admin.address);
                expect(election.isStarted).to.equal(false);
                expect(election.startedAt).to.equal(0);
            });

            it("Deve criar uma com período pré-definido", async function () {
                const currentTime = Math.round(Date.now() / 1000);
                await createElection("Eleição A", "Descrição A", true);
                const election = await voting.getElection(0);
                const [startPeriod, endPeriod] = await voting.getElectionPeriod(0);
                expect(election.name).to.equal("Eleição A");
                expect(election.description).to.equal("Descrição A");
                expect(election.admin).to.equal(admin.address);
                expect(election.isStarted).to.equal(false);
                expect(startPeriod.toNumber()).to.equal(currentTime + DURATION);
                expect(endPeriod.toNumber()).to.equal(currentTime + 2 * DURATION);
            });

            // Manipulação do período da eleição

            it("Deve iniciar uma eleição", async function () {
                await createElection("Eleição A", "Descrição A");
                await voting.connect(admin).startElection(0);
                const election = await voting.getElection(0);
                expect(parseInt(election.startedAt)).to.be.greaterThan(0);
                expect(election.isStarted).to.equal(true);
            });

            it("Deve estender o período de uma eleição", async function () {
                await createElection("Eleição A", "Descrição A");
                await voting.startElection(0);
                var election = await voting.getElection(0);
                var currentEnd = election.endedAt.toNumber();
                await voting.extendElectionPeriod(0, DURATION);
                const expectedEndAt = currentEnd + DURATION;
                election = await voting.getElection(0);
                expect(parseInt(election.endedAt)).to.equal(expectedEndAt);
            });

            it("Deve terminar uma eleição", async function () {
                await createElection("Eleição A", "Descrição A");
                await voting.connect(admin).startElection(0);
                await voting.connect(admin).endElection(0, "Descrição Genérica");
                const election = await voting.getElection(0);
                expect(election.isStarted).to.equal(false);
                expect(parseInt(election.endedAt)).to.be.greaterThan(0);
                const currentTime = Math.round(Date.now() / 1000);
                expect(parseInt(election.endedAt)).to.be.closeTo(currentTime, TOLERANCE);
            });
        });

        // Candidatos

        describe("Gestão de Candidate", function () {
            it("Deve adicionar um candidato a uma eleição", async function () {
                await createElection("Eleição A", "Descrição A");
                await voting.connect(admin).addCandidate(0, "Candidate 1", candidate1.address);
                const candidate = await voting.getElectionCandidate(0, 0);
                expect(candidate.name).to.equal("Candidate 1");
                expect(candidate.delegate).to.equal(candidate1.address);
            });

            it("Deve remover um candidato de uma eleição", async function () {
                await createElection("Eleição A", "Descrição A");
                await voting.connect(admin).addCandidate(0, "Candidate 1", candidate1.address);
                await voting.connect(admin).removeCandidateElection(0, 0);
                await expect(voting.connect(admin).getElectionCandidate(0, 0)).to.be.revertedWith("Candidate does not exist");
            });
        });

        // Eleitores

        describe("Gestão de Voter", function () {
            it("Deve adicionar um eleitor", async function () {
                await createElection("Eleição A", "Descrição A");
                await voting.connect(admin).addVoter(0, "Voter 1", "password1", voter1.address);
                const voter = await voting.getElectionVoter(0, 0);
                expect(voter.name).to.equal("Voter 1");
                expect(voter.delegate).to.equal(voter1.address);
            });
        });


        describe("Eleitor", function () {
            describe("Votação", function () {
                it("Deve permitir o voto numa eleição", async function () {
                    await createElection("Eleição A", "Descrição A");
                    await voting.connect(admin).addVoter(0, "Voter 1", "password1", voter1.address);
                    await voting.connect(admin).startElection(0);
                    await voting.connect(voter1).castVote(0, 0);
                    const hasVoted = await voting.hasVotedInElection(0, voter1.address);
                    expect(hasVoted).to.be.true;
                });

                it("Deve permitir apenas um voto por eleitor por eleição", async function () {
                    await createElection("Eleição A", "Descrição A");
                    await voting.connect(admin).addVoter(0, "Voter 1", "password1", voter1.address);
                    await voting.connect(admin).startElection(0);
                    const election = await voting.getElection(0);
                    await voting.connect(voter1).castVote(0, 0);
                    await expect(voting.connect(voter1).castVote(0, 0)).to.be.revertedWith("Voter has already voted");
                });
            });
        });

        describe("Integração entre funções", function () {
            it("Deve adicionar e atualizar um eleitor", async function () {
                await createElection("Eleição A", "Descrição A");
                await voting.connect(admin).addVoter(0, "Voter 1", "password1", voter1.address);
                await voting.connect(admin).updateVoter(0, 0, "Voter 1 Updated", "password2");
                const voter = await voting.getElectionVoter(0, 0);
                expect(voter.name).to.equal("Voter 1 Updated");
            });

            it("Deve adicionar um candidato e permitir que ele se retire de uma eleição", async function () {
                await createElection("Eleição A", "Descrição A");
                await voting.connect(admin).addCandidate(0, "Candidate 1", candidate1.address);
                await voting.connect(admin).startElection(0);
                await voting.connect(candidate1).withdrawFromElection(0, 0);
                await expect(voting.connect(admin).getElectionCandidate(0, 0)).to.be.revertedWith("Candidate does not exist");
            });

        });

        // Testes de integridade dos dados

        describe("Integridade dos dados", function () {
            it("Deve manter a integridade dos dados ao adicionar e remover candidatos", async function () {
                await createElection("Eleição A", "Descrição A");
                await voting.connect(admin).addCandidate(0, "Candidate 1", candidate1.address);
                await voting.connect(admin).removeCandidateElection(0, 0);
                await expect(voting.connect(admin).getElectionCandidate(0, 0)).to.be.revertedWith("Candidate does not exist");
            });
        });

        // Testes de segurança

        describe("Segurança", function () {
            it("Deve permitir apenas o administrador adicionar um candidato", async function () {
                await createElection("Eleição A", "Descrição A");
                await expect(voting.connect(voter1).addCandidate(0, "Candidate 1", candidate1.address)).to.be.revertedWith("Only Admins can perform this action");
            });

            it("Deve permitir apenas o administrador adicionar um eleitor", async function () {
                await createElection("Eleição A", "Descrição A");
                await expect(voting.connect(candidate1).addVoter(0, "Voter 1", "password1", voter1.address)).to.be.revertedWith("Only Admins can perform this action");
            });

        });

        // Fluxo de votação

        describe("Fluxo de Votação", function () {
            it("Deve criar uma eleição, adicionar candidatos e votantes. Ela é iniciada, o eleitor vota e ela é encerrada.", async function () {
                await createElection("Eleição A", "Descrição A");
                await voting.connect(admin).addCandidate(0, "Candidate 1", candidate1.address);
                await voting.connect(admin).addCandidate(0, "Candidate 2", candidate2.address);
                await voting.connect(admin).addVoter(0, "Voter 1", "password1", voter1.address);
                await voting.connect(admin).startElection(0);
                await voting.connect(voter1).castVote(0, 0);
                await voting.connect(admin).endElection(0, "Descrição Encerrada");

                const election = await voting.getElection(0);
                expect(election.isStarted).to.equal(false);
                const hasVoted = await voting.hasVotedInElection(0, voter1.address);
                expect(hasVoted).to.be.true;
                const candidate = await voting.getElectionCandidate(0, 0);
                expect(candidate.votes.toNumber()).to.equal(1);
            });

            it("Deve retornar todas as eleições em que um eleitor está cadastrado", async function () {
                await createElection("Eleição A", "Descrição A");
                await createElection("Eleição B", "Descrição B");
                await voting.connect(admin).addCandidate(0, "Candidate 1", candidate1.address);
                await voting.connect(admin).addCandidate(1, "Candidate 1", candidate1.address);
                await voting.connect(admin).addVoter(0, "Voter 1", "password1", voter1.address);
                await voting.connect(admin).addVoter(1, "Voter 1", "password1", voter1.address);
                await voting.connect(admin).startElection(0);
                await voting.connect(admin).startElection(1);
                const electionA = await voting.connect(admin).getElection(0)
                const electionB = await voting.connect(admin).getElection(1)
                const elections = await voting.getCandidateElections(voter1.address);
                expect(elections.length).to.equal(2);
                expect(electionA.name).to.equal("Eleição A");
                expect(electionB.name).to.equal("Eleição B");
            });

            it("Deve retornar todas as eleições que um candidato está cadastrado", async function () {
                await createElection("Eleição A", "Descrição A");
                await createElection("Eleição B", "Descrição B");
                await voting.connect(admin).addCandidate(0, "Candidate 1", candidate1.address);
                await voting.connect(admin).addCandidate(1, "Candidate 1", candidate1.address);
                const elections = await voting.getCandidateElections(candidate1.address);
                expect(elections.length).to.equal(2);
                const electionA = await voting.connect(admin).getElection(0)
                const electionB = await voting.connect(admin).getElection(1)
                expect(electionA.name).to.equal("Eleição A");
                expect(electionB.name).to.equal("Eleição B");
            });


            it("Deve retornar todas as eleições em andamento", async function () {
                await createElection("Eleição A", "Descrição A");
                await createElection("Eleição B", "Descrição B");
                await voting.connect(admin).startElection(0);
                const elections = await voting.getStartedElections();
                expect(elections.length).to.equal(2);
                expect(elections[0].name).to.equal("Eleição A");
            });

            it("Deve retornar as eleições encerradas com os candidatos e o número de votos de cada um", async function () {
                await createElection("Eleição A", "Descrição A");
                await voting.connect(admin).addCandidate(0, "Candidate 1", candidate1.address);
                await voting.connect(admin).addCandidate(0, "Candidate 2", candidate2.address);
                await voting.connect(admin).addVoter(0, "Voter 1", "password1", voter1.address);
                await voting.connect(admin).addVoter(0, "Voter 2", "password2", voter2.address);
                await voting.connect(admin).startElection(0);
                await voting.connect(voter1).castVote(0, 0);
                await voting.connect(voter2).castVote(0, 0);
                await voting.connect(admin).endElection(0, "Election ended for test purposes.");
                const electionResults = await voting.getElectionsWithResults();
                expect(electionResults.length).to.equal(1);
                expect(electionResults[0][0].name).to.equal("Eleição A");
                expect(electionResults[0][1][0].delegate).to.equal(candidate1.address);
                expect(electionResults[0][1][1].delegate).to.equal(candidate2.address);
                expect(electionResults[0][1][0].votes).to.equal(2);
                expect(electionResults[0][1][1].votes).to.equal(0);
            });
        });
    });
});
