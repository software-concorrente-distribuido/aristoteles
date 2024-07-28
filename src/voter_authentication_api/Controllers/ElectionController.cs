using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VoterAuthenticationAPI.Models;
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

    [HttpGet("getElection")]
    public async Task<ActionResult<Election>> GetElection(int electionId)
    {
        try
        {
            var userResult = await _electionService.getElection(electionId);

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

    [HttpGet("getElectionCandidate")]
    public async Task<ActionResult<Candidato>> GetElectionCandidate(int electionId, int candidateId)
    {
        try
        {
            var userResult = await _electionService.getElectionCandidate(electionId, candidateId);

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

    [HttpGet("getElectionVoter")]
    public async Task<ActionResult<Voter>> GetElectionVoter(int electionId, int voterId)
    {
        try
        {
            var userResult = await _electionService.getElectionVoter(electionId, voterId);

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

    [HttpGet("getElectionDistrict")]
    public async Task<ActionResult<District>> GetElectionDistrict(int electionId, int districtId)
    {
        try
        {
            var userResult = await _electionService.getElectionDistrict(electionId, districtId);

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

    [HttpGet("getVoterElections")]
    public async Task<ActionResult<List<Election>>> GetVoterElections(string voterAdress)
    {
        try
        {
            var userResult = await _electionService.getVoterElections(voterAdress);

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

    [HttpGet("getCandidateElections")]
    public async Task<ActionResult<List<Election>>> GetCandidateElections(string candidateAdress)
    {
        try
        {
            var userResult = await _electionService.getCandidateElections(candidateAdress);

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

    [HttpGet("getDistrictElections")]
    public async Task<ActionResult<List<Election>>> GetDistrictElections(int districtId)
    {
        try
        {
            var userResult = await _electionService.getDistrictElections(districtId);

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

    [HttpPost("createElection")]
    public async Task<ActionResult> CreateElection(string name, string description, List<int> districtIds)
    {
        try
        {
            await _electionService.createElection(name, description, districtIds);

            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }

    [HttpPost("startElection")]
    public async Task<ActionResult> StartElection(int electionId)
    {
        try
        {
            await _electionService.startElection(electionId);

            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }

    [HttpPost("endElection")]
    public async Task<ActionResult> EndElection(int electionId, string descricao)
    {
        try
        {
            await _electionService.endElection(electionId, descricao);

            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
}

