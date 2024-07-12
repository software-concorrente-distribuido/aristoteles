using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using VoterAuthenticationAPI.Common;
using VoterAuthenticationAPI.Data;
using VoterAuthenticationAPI.Models;

namespace VoterAuthenticationAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class CandidatoController : ControllerBase
{
    private readonly DataContext _dataContext;

    public CandidatoController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet("get-cadastro-candidatos")]
    public async Task<ActionResult<List<Candidato>>> GetAllAsync(string? nome)
    {
        try
        {
            var userResult = new List<User>();
            if (string.IsNullOrEmpty(nome))
            {
                userResult = await _dataContext.Users.ToListAsync();
            }
            else
            {
                userResult = await _dataContext.Users
                    .Where(x => x.Name.Contains(nome))
                    .ToListAsync();
            }

            if (userResult.Count > 0)
            {
                var candidatoResult = new List<Candidato>();
                var candidatoMap = new Candidato();
                foreach (var user in userResult)
                {
                    candidatoMap.Id = user.Id;
                    candidatoMap.Name = user.Name;
                    candidatoMap.Email = user.Email;

                    candidatoResult.Add(candidatoMap);
                }

                return Ok(candidatoResult);
            }

            return NotFound();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
}

