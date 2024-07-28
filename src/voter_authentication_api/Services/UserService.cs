using Microsoft.EntityFrameworkCore;
using VoterAuthenticationAPI.Common;
using VoterAuthenticationAPI.Data;
using VoterAuthenticationAPI.Models;
using VoterAuthenticationAPI.Models.DTOs;

namespace VoterAuthenticationAPI.Services
{
    public class UserService
    {
        private readonly DataContext _dataContext;

        public UserService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Candidato>?> BuscaCandidatosUsuario(string? nome)
        {
            var userResult = new List<User>();
            var candidatoResult = new List<Candidato>();

            if (string.IsNullOrEmpty(nome))
            {
                userResult = await _dataContext.Users.ToListAsync();
            }
            else
            {
                userResult = await _dataContext.Users
                    .Where(x => x.Name.Contains(nome))
                    .ToListAsync();
            }

            if (userResult != null)
            {
                foreach (var user in userResult)
                {
                    var candidatoMap = new Candidato
                    {
                        Id = user.Id,
                        Name = user.Name,
                        Email = user.Email
                    };

                    candidatoResult.Add(candidatoMap);
                }
            }

            return candidatoResult;
        }

        public async Task<User?> BuscaUsuario(string email)
        {
            var dbUser = await _dataContext.Users.FirstOrDefaultAsync(x => x.Email == email);

            return dbUser;
        }

        public async Task CadastraUsuario(UserDTO userDTO)
        {
            var transaction = await _dataContext.Database.BeginTransactionAsync();

            var dbUser = await BuscaUsuario(userDTO.Email);

            if (dbUser != null)
            {
                throw new ArgumentException("Usuário já existe");
            }

            var password = userDTO.Password != null ? AuthService.Encrypt(userDTO.Password) : throw new ArgumentException("Senha não pode ser nula");
            string? token = null;


            Wallet wallet = WalletService.GenerateWallet();

            var user = new User()
            {
                Name = userDTO.Name,
                Email = userDTO.Email,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                Password = password,
                Token = token,
                Wallet = wallet
            };

            await _dataContext.Users.AddAsync(user);
            await _dataContext.SaveChangesAsync();
            await transaction.CommitAsync();
        }
    }
}
