using Microsoft.AspNetCore.Mvc;
using VoterAuthenticationAPI.Common;
using VoterAuthenticationAPI.Data;
using VoterAuthenticationAPI.Models;
using VoterAuthenticationAPI.Models.DTOs;

namespace VoterAuthenticationAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly DataContext _dataContext;

    public AuthController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpPost("sign-in")]
    public async Task<ActionResult<string?>> SignIn(string email, string senha)
    {
        try
        {
            var dbuser = await _dataContext.Users
                .Include(x => x.Role)
                .Include(x => x.Wallet)
                .FirstOrDefaultAsync(x => x.Email == email);

            if (dbuser == null)
            {
                return NotFound();
            }

            if (Utils.Verify(senha, dbuser.Password))
            {
                dbuser.Token = Utils.GenerateJWTToken(dbuser);
                return Ok(dbuser.Token);
            }

            return BadRequest();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("sign-up")]
    public async Task<ActionResult<User>> SignUp(UserDTO userDTO)
    {
        using var transaction = await _dataContext.Database.BeginTransactionAsync();

        try
        {
            await VerificaSeUsuarioExiste(userDTO);

            var password = userDTO.Password != null ? Utils.Encrypt(userDTO.Password) : throw new ArgumentException("Senha não pode ser nula");

            string? token = null;

            var role = await _dataContext.Roles.FindAsync(2);
            role = role ?? throw new ArgumentException("Role não pode ser nula");

            Wallet wallet = WalletService.GenerateWallet();

            var user = new User()
            {
                Name = userDTO.Name,
                Email = userDTO.Email,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                Password = password,
                Token = token,
                Role = role,
                Wallet = wallet
            };

            await _dataContext.Users.AddAsync(user);
            await _dataContext.SaveChangesAsync();
            await Utils.SendWelcomeEmail(user.Name, user.Email);
            await transaction.CommitAsync();

            return Ok(user);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return BadRequest(ex.Message);
        }
    }

    private async Task VerificaSeUsuarioExiste(UserDTO userDTO)
    {
        var dbUser = await _dataContext.Users
                        .Include(x => x.Role)
                        .FirstOrDefaultAsync(x => x.Email == userDTO.Email);

        if (dbUser != null)
        {
            throw new ArgumentException("Usuário já existe");
        }
    }
}
