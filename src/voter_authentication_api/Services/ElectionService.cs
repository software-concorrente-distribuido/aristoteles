using VoterAuthenticationAPI.Models;

namespace VoterAuthenticationAPI.Services
{
    public class ElectionService
    {
        public async Task<Election> getElection(int electionId)
        {
            return await Task.FromResult<Election>(null);
        }

        public async Task<Candidato> getElectionCandidate(int electionId, int candidateId)
        {
            return await Task.FromResult<Candidato>(null);
        }

        public async Task<Voter> getElectionVoter(int electionId, int candidateId)
        {
            return await Task.FromResult<Voter>(null);
        }

        public async Task<List<Election>> getVoterElections(string voterAdress)
        {
            return await Task.FromResult<List<Election>>(null);
        }

        public async Task<List<Election>> getCandidateElections(string candidateAdress)
        {
            return await Task.FromResult<List<Election>>(null);
        }

        public async Task createElection(string name, string description)
        {
            await Task.CompletedTask;
        }

        public async Task startElection(int electionId)
        {
            await Task.CompletedTask;
        }

        public async Task endElection(int electionId, string descricao)
        {
            await Task.CompletedTask;
        }
    }
}
