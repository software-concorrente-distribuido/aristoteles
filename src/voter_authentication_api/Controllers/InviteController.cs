using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VoterAuthenticationAPI.Common;
using VoterAuthenticationAPI.Data;

namespace VoterAuthenticationAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class InviteController : ControllerBase
{
    private readonly DataContext _dataContext;

    public InviteController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpPost("send-invite-link")]
    public async Task<IActionResult> SendInviteLink(string email)
    {
        try
        {
            var dbuser = await _dataContext.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Email == email);
            if (dbuser != null)
            {
                string recoveryToken = Utils.GenerateJWTTokenByEmail(dbuser.Email);
                string recoveryLink = $"https://votoembloco.netlify.app/";
                bool isSent = await Utils.SendLoginLinkEmail(recoveryLink, dbuser.Name, dbuser.Email);
                if (isSent) return Created("", new { recoveryToken, dbuser.Email });
            }
            else
            {
                string recoveryLink = $"https://votoembloco.netlify.app/cadastro/cadastro";
                bool isSent = await Utils.SendSignUpLinkEmail(recoveryLink, email);
                if (isSent) return Created("", new { recoveryLink, email });
            }
            return NotFound();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
}
