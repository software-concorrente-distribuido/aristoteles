using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using VoterAuthenticationAPI.Models;

namespace VoterAuthenticationAPI.Common
{
    public class AuthService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private static readonly string SecretKey = "AS&(%)D$*N>:*&sdBN%&*danmY(O&OIAsd*&q976fas87hso";

        public AuthService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public static string Encrypt(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public static bool Verify(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }

        public static string GenerateJWTToken(User user)
        {
            SecurityTokenDescriptor tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]{
                        new Claim("userId", user.Id.ToString()),
                        new Claim("userName", user.Name),
                        new Claim("userEmail", user.Email),
                        new Claim("userWallet", user.WalletId.ToString())
                    }
                ),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey)),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken = tokenHandler.CreateToken(tokenDescription);
            return tokenHandler.WriteToken(securityToken);
        }

        public string GetUserIdFromToken()
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(SecretKey);
            var token = _httpContextAccessor?.HttpContext?.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            try
            {
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true
                }, out SecurityToken validatedToken);

                var userIdClaim = principal.Claims.FirstOrDefault(c => c.Type == "userId");

                if (userIdClaim == null)
                {
                    throw new Exception("Não foi possível acessar.");
                }

                return userIdClaim.Value;
            }
            catch
            {
                throw new Exception("Não foi possível acessar.");
            }
        }

        public static async Task<bool> SendSignUpLinkEmail(string link, string userEmal)
        {
            using EmailService emailService = new EmailService();
            emailService._body.Append("<html>");
            emailService._body.Append($"Olá! <br /><br />");
            emailService._body.Append("Por favor, selecione o link abaixo para se cadastrar na plataforma e votar. <br /><br />");
            emailService._body.Append("<a href='" + link + "' target='_blank'>Clique aqui</a> <br /><br />");
            emailService._body.Append("Esse link estará disponível por 24h <br /><br />");
            emailService._body.Append("Atenciosamente, <br /><br />");
            emailService._body.Append("Aristóteles");
            emailService._body.Append("</html>");
            return await emailService.SendEmailAsync(userEmal, $"Convite para votação");
        }

        public static async Task<bool> SendLoginLinkEmail(string link, string fullname, string userEmal)
        {
            using EmailService emailService = new EmailService();
            emailService._body.Append("<html>");
            emailService._body.Append($"Olá, {fullname}! <br /><br />");
            emailService._body.Append("Por favor, selecione o link abaixo para votar. <br /><br />");
            emailService._body.Append("<a href='" + link + "' target='_blank'>Clique aqui</a> <br /><br />");
            emailService._body.Append("Esse link estará disponível por 24h <br /><br />");
            emailService._body.Append("Atenciosamente, <br /><br />");
            emailService._body.Append("Aristóteles");
            emailService._body.Append("</html>");
            return await emailService.SendEmailAsync(userEmal, $"Convite para cadastro e votação");
        }
    }
}
