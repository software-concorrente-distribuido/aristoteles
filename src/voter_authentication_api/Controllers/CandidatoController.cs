using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using VoterAuthenticationAPI.Common;
using VoterAuthenticationAPI.Data;
using VoterAuthenticationAPI.Models;
using VoterAuthenticationAPI.Models.DTOs;
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

    
}

