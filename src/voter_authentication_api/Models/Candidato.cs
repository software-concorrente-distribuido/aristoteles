﻿namespace VoterAuthenticationAPI.Models
{
    public class Candidato
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}