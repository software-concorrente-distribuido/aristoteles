using VoterAuthenticationAPI.Data;
using VoterAuthenticationAPI.Models;

namespace VoterAuthenticationAPI.Services
{
    public class CandidatoService
    {
        public async Task AddCandidate(int electionId, string name, string adress)
        {
            await Task.CompletedTask;
        }
        public async Task removeCandidateElection(int electionId, int candidateId)
        {
            await Task.CompletedTask;
        }
        public async Task updateCandidate(string nome)
        {
            await Task.CompletedTask;
        }

    }
}
