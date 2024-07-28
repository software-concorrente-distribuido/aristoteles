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
[Authorize]
public class CandidatoController : ControllerBase
{
    private readonly CandidatoService _candidatoService;
    private readonly UserService _userService;

    public CandidatoController(CandidatoService candidatoService, UserService userService)
    {
        _candidatoService = candidatoService;
        _userService = userService;
    }

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

    [HttpPost("addCandidate")]
    public async Task<ActionResult> AddCandidate(int electionId, string name, string adress)
    {
        try
        {
            await _candidatoService.AddCandidate(electionId, name, adress);

            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }

    [HttpDelete("removeCandidateElection")]
    public async Task<ActionResult> removeCandidateElection(int electionId, int candidateId)
    {
        try
        {
            await _candidatoService.removeCandidateElection(electionId, candidateId);
          
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }

    [HttpPut("updateCandidate")]
    public async Task<ActionResult> updateCandidate(string nome)
    {
        try
        {
            await _candidatoService.updateCandidate(nome);

            Ok();

            return NotFound();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
}

