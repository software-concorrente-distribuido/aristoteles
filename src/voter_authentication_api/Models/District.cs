namespace VoterAuthenticationAPI.Models
{
    public class District
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public static class DistrictData
    {
        public static List<District> Districts { get; } = new List<District>
    {
        new District
        {
            Id = 1,
            Name = "Ditrito A",
            Description = "Distrito onde estão localizados todos os votantes A",
            CreatedAt = new DateTime(2020, 1, 1),
            UpdatedAt = DateTime.UtcNow
        },
        new District
        {
            Id = 2,
            Name = "Distrito B",
            Description = "Distrito onde estão localizados todos os votantes B",
            CreatedAt = new DateTime(2020, 1, 1),
            UpdatedAt = DateTime.UtcNow
        }
    };
    }
}
