using VoterAuthenticationAPI.Data;
using VoterAuthenticationAPI.Models;
using VoterAuthenticationAPI.Models.DTOs;

namespace VoterAuthenticationAPI.Services
{
    public class CandidatoService
    {
        public async Task AddCandidate(List<CandidatoDTO> candidatos)
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
