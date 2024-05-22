using System.ComponentModel.DataAnnotations;

namespace VoterAuthenticationAPI.Models
{
    public class Tenant
    {
        [Key, Required]
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
