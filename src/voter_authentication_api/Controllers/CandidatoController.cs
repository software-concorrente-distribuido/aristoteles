using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using VoterAuthenticationAPI.Common;
using VoterAuthenticationAPI.Data;
using VoterAuthenticationAPI.Models;
using VoterAuthenticationAPI.Services;

namespace VoterAuthenticationAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class CandidatoController : ControllerBase
{
    private readonly UserService _userService;

    public CandidatoController(UserService userService)
    {
        _userService = userService;
    }

    [Authorize]
    [HttpGet("get-cadastro-candidatos")]
    public async Task<ActionResult<List<Candidato>>> GetAllAsync(string? nome)
    {
        try
        {
            var userResult = await _userService.BuscaCandidatosUsuario(nome);

            if (userResult != null){
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

