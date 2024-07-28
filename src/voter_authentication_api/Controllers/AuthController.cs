using Microsoft.AspNetCore.Mvc;
using VoterAuthenticationAPI.Common;
using VoterAuthenticationAPI.Data;
using VoterAuthenticationAPI.Models;
using VoterAuthenticationAPI.Models.DTOs;
using VoterAuthenticationAPI.Services;

namespace VoterAuthenticationAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserService _userService;

    public AuthController(UserService userService)
    {
        _userService = userService;
    }

    [HttpPost("sign-in")]
    public async Task<ActionResult<string?>> SignIn(string email, string senha)
    {
        try
        {
            var dbuser = await _userService.BuscaUsuario(email);

            if (dbuser == null)
            {
                return NotFound();
            }

            if (AuthService.Verify(senha, dbuser.Password))
            {
                dbuser.Token = AuthService.GenerateJWTToken(dbuser);
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
    public async Task<ActionResult> SignUp(UserDTO userDTO)
    {
        try
        {
            await _userService.CadastraUsuario(userDTO);

            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
