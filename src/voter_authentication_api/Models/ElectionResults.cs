namespace VoterAuthenticationAPI.Models
{
    public class ElectionResults
    {
        public Election? election { get; set; }
        public List<Candidato>? candidates { get; set; }
    }
}
