using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VoterAuthenticationAPI.Models;
using VoterAuthenticationAPI.Models.DTOs;
using VoterAuthenticationAPI.Services;

namespace VoterAuthenticationAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class VoterController : ControllerBase
{
    private readonly VoterService _voterService;

    public VoterController(VoterService voterService)
    {
        _voterService = voterService
;
    }

    [HttpPost("addVoter")]
    public async Task<ActionResult> addVoter(List<VoterDTO> voters)
    {
        try
        {
            await _voterService.addVoter(voters);

            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }

    [HttpPost("updateVoter")]
    public async Task<ActionResult> updateVoter(int electionId, string name, string password, string address)
    {
        try
        {
            await _voterService.updateVoter(electionId, name, password, address);

            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }

    [HttpPost("castVote")]
    public async Task<ActionResult> castVote(int electionId, int candidateId)
    {
        try
        {
            await _voterService.castVote(electionId, candidateId);

            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
}

