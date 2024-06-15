using System.ComponentModel.DataAnnotations;

namespace VoterAuthenticationAPI.Models
{
    public class Wallet
    {
        [Key, Required]
        public int Id { get; set; }
        public string Address { get; set; } = string.Empty;
        public byte[]? PrivateKey { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
