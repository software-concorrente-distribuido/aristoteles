using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration.UserSecrets;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace VoterAuthenticationAPI.Common
{
    public class Utils
    {
        public static string Encrypt(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public static bool Verify(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }

        public static string GenerateJWTToken(long userId)
        {
            IdentityOptions options = new IdentityOptions();
            // We will setup the parameters of token generation
            SecurityTokenDescriptor tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]{
                        new Claim("userId", userId.ToString())
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

        public static string GenerateJWTTokenByEmail(string email)
        {
            IdentityOptions options = new IdentityOptions();
            // We will setup the parameters of token generation
            SecurityTokenDescriptor tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]{
                        new Claim("email", email)
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

        public static async Task<bool> SendWelcomeEmail(string fullname, string email)
        {
            using EmailService emailService = new EmailService();
            emailService._body.Append("<html>");
            emailService._body.Append($"Olá, {fullname}! <br /><br />");
            emailService._body.Append("Seu cadastro foi efetuado com sucesso!  <br /><br />");
            emailService._body.Append("Atenciosamente, <br /><br />");
            emailService._body.Append("Aristóteles");
            emailService._body.Append("</html>");
            return await emailService.SendEmailAsync(fullname, email, $"Bem-vindo, {fullname}");
        }

        public static async Task<bool> SendRecoveryLinkEmail(string link, string fullname, string userEmal)
        {
            using EmailService emailService = new EmailService();
            emailService._body.Append("<html>");
            emailService._body.Append($"Olá, {fullname}! <br /><br />");
            emailService._body.Append("Por favor, selecione o link abaixo para cadastrar sua nova senha. <br /><br />");
            emailService._body.Append("<a href='" + link + "' target='_blank'>Clique aqui</a> <br /><br />");
            emailService._body.Append("Esse link estará disponível por 24h <br /><br />");
            emailService._body.Append("Atenciosamente, <br /><br />");
            emailService._body.Append("Aristóteles");
            emailService._body.Append("</html>");
            return await emailService.SendEmailAsync(fullname, userEmal, $"Recuperação de senha");
        }
    }
}
