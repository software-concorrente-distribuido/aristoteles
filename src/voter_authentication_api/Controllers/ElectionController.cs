﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VoterAuthenticationAPI.Common;
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

    [HttpPost("sign-in")]
    public async Task<ActionResult> CreateElectionAsync(string nome, string descricao)
    {
        try
        {
            await _electionService.CreateElectionAsync(nome, descricao);

            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

}

