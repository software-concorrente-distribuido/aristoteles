using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VoterAuthenticationAPI.Common;
using VoterAuthenticationAPI.Data;
using VoterAuthenticationAPI.Services;

namespace VoterAuthenticationAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class InviteController : ControllerBase
{
    private readonly UserService _userService;

    public InviteController(UserService userService)
    {
        _userService = userService;
    }

    [Authorize]
    [HttpPost("send-invite-link")]
    public async Task<ActionResult> SendInviteLink(List<string> emails)
    {
        var results = new List<object>();
        try
        {
            foreach (var email in emails)
            {
                var dbuser = await _userService.BuscaUsuario(email);

                if (dbuser != null)
                {
                    string recoveryLink = $"https://votoembloco.netlify.app/";
                    bool isSent = await AuthService.SendLoginLinkEmail(recoveryLink, dbuser.Name, dbuser.Email);
                    if (isSent)
                    {
                        results.Add(new { recoveryLink, dbuser.Email });
                    }
                }
                else
                {
                    string recoveryLink = $"https://votoembloco.netlify.app/cadastro/cadastro";
                    bool isSent = await AuthService.SendSignUpLinkEmail(recoveryLink, email);
                    if (isSent)
                    {
                        results.Add(new { recoveryLink, email });
                    }
                }
            }

            if (results.Count > 0)
            {
                return Ok();
            }
            return NotFound();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
}
