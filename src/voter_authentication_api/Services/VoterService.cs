using VoterAuthenticationAPI.Models;
using VoterAuthenticationAPI.Models.DTOs;

namespace VoterAuthenticationAPI.Services
{
    public class VoterService
    {
        public async Task addVoter(List<VoterDTO> voters)
        {
            await Task.CompletedTask;
        }

        public async Task updateVoter(int electionId, string name, string password, string address)
        {
            await Task.CompletedTask;
        }

        public async Task castVote(int electionId, int candidateId)
        {
            await Task.CompletedTask;
        }
    }
}
