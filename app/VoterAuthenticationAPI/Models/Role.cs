using System.ComponentModel.DataAnnotations;

namespace VoterAuthenticationAPI.Models
{
    public class Role
    {
        [Key, Required]
        public int Id { get; set; }
        public required string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
