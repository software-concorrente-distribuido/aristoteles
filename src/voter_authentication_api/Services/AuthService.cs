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
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes("AS&(%)D$*N>:*&sdBN%&*danmY(O&OIAsd*&q976fas87hso")),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken = tokenHandler.CreateToken(tokenDescription);
            return tokenHandler.WriteToken(securityToken);
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
