using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VoterAuthenticationAPI.Models;
using VoterAuthenticationAPI.Services;

namespace VoterAuthenticationAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ElectionController : ControllerBase
{
    private readonly UserService _userService;
    private readonly ElectionService _electionService;

    public ElectionController(UserService userService, ElectionService electionService)
    {
        _userService = userService;
        _electionService = electionService;
    }

    [Authorize]
    [HttpGet("get-cadastro-candidatos")]
    public async Task<ActionResult<List<Candidato>>> GetAllAsync(string? nome)
    {
        try
        {
            var userResult = await _userService.BuscaCandidatosUsuario(nome);

            if (userResult != null)
            {
                return Ok(userResult);
            }

            return NotFound();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
}

