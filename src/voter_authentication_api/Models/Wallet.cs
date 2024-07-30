using System.ComponentModel.DataAnnotations;

namespace VoterAuthenticationAPI.Models
{
    public class Wallet
    {
        [Key, Required]
        public int Id { get; set; }
        public string Address { get; set; } = string.Empty;
        public string PrivateKey { get; set; } = string.Empty;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
