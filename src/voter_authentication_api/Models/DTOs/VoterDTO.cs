namespace VoterAuthenticationAPI.Models.DTOs
{
    public class VoterDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Delegate { get; set; } = string.Empty;
        public byte[]? PasswordHash { get; set; }
    }
}
