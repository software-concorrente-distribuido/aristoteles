namespace VoterAuthenticationAPI.Models
{
    public class Voter
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Delegate { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set;}
        public DateTime UpdatedAt { get; set; }
    }
}
