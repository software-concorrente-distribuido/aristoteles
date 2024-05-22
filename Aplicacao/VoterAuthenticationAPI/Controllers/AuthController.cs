using Microsoft.AspNetCore.Mvc;
using VoterAuthenticationAPI.Common;
using VoterAuthenticationAPI.Data;
using VoterAuthenticationAPI.Models;

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
    public async Task<ActionResult<User>> SignIn(string email, string senha)
    {
        try
        {
            var dbuser = await _dataContext.Users.Include(x => x.Role).FirstOrDefaultAsync(x => x.Email == email);

            if (dbuser == null)
            {
                return NotFound();
            }

            if (Utils.Verify(senha, dbuser.Password))
            {
                dbuser.Token = Utils.GenerateJWTToken(dbuser.Id);
                return Ok(dbuser);
            }

            return BadRequest();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("sign-up")]
    public async Task<ActionResult<User>> SignUp(User user)
    {
        var transaction = await _dataContext.Database.BeginTransactionAsync();
        try
        {
            var dbuser = await _dataContext.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Email == user.Email);

            if (dbuser != null) return Conflict();

            Tenant tenant = new Tenant()
            {
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            user.Tenant = tenant;
            user.CreatedAt = DateTime.Now;
            user.UpdatedAt = DateTime.Now;

            if (!string.IsNullOrEmpty(user.Password))
                user.Password = Utils.Encrypt(user.Password);
            await _dataContext.Users.AddAsync(user);
            await _dataContext.SaveChangesAsync();

            user.Token = Utils.GenerateJWTToken(user.Id);

            user.Role = await _dataContext.Roles.FirstOrDefaultAsync(x => x.Id == user.RoleId);

            await Utils.SendWelcomeEmail(user.Name, user.Email);

            await transaction.CommitAsync();

            return Created("", user);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return BadRequest(ex);
        }
    }

    [HttpPost("send-recovery-link")]
    public async Task<IActionResult> SendRecoveryLink(string email)
    {
        try
        {
            var dbuser = await _dataContext.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Email == email);
            if (dbuser != null)
            {
                string recoveryToken = Utils.GenerateJWTTokenByEmail(dbuser.Email);
                string recoveryLink = $"{dbuser.AppOriginUrl}/auth/reset-password/{recoveryToken}";
                bool isSent = await Utils.SendRecoveryLinkEmail(recoveryLink, dbuser.Name, dbuser.Email);
                if (isSent) return Created("", new { recoveryToken, dbuser.Email });
            }
            return NotFound();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
}
