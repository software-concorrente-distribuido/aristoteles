namespace VoterAuthenticationAPI.Models.DTOs
{
    public class CreateElectionDTO
    {
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public List<Voter> Voters { get; set; }  = new List<Voter>();
        public List<Candidato> Candidates { get; set; } = new List<Candidato>();
    }
}
