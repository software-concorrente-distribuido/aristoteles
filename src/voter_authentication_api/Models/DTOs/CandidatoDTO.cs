namespace VoterAuthenticationAPI.Models.DTOs
{
    public class CandidatoDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Delegate { get; set; } = string.Empty;
    }
}
