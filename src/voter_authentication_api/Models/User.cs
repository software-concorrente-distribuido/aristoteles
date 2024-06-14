using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VoterAuthenticationAPI.Models
{
    public class User
    {
        [Key, Required]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int RoleId { get; set; }
        public required Role Role { get; set; }
        [NotMapped]
        public required string Token { get; set; }
        [NotMapped]
        public required string AppOriginUrl { get; set; }
        public int TenantId { get; set; }
        public required Tenant Tenant { get; set;}
    }
}
