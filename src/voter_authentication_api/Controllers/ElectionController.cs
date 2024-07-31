using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VoterAuthenticationAPI.Common;
using VoterAuthenticationAPI.Models;
using VoterAuthenticationAPI.Models.DTOs;
using VoterAuthenticationAPI.Services;

namespace VoterAuthenticationAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ElectionController : ControllerBase
{
    private readonly ElectionService _electionService;

    public ElectionController(ElectionService electionService)
    {
        _electionService = electionService;
    }

    [HttpPost("CreateElection")]
    public async Task<ActionResult<Election>> CreateElectionAsync([FromBody] CreateElectionDTO request)
    {
        try
        {
            return await _electionService.CreateElectionAsync(request.Nome, request.Descricao, request.Voters, request.Candidates);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

}

