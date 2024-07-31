using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.Design;
using VoterAuthenticationAPI.Models;
using VoterAuthenticationAPI.Services;

namespace VoterAuthenticationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AdminController : ControllerBase
    {
        private readonly ElectionService _electionService;

        public AdminController(ElectionService electionService)
        {
            _electionService = electionService;
        }
        [HttpGet("getAdminElections")]
        public async Task<ActionResult<List<Election>>> getAdminElections()
        {
            try
            {
                var userResult = await _electionService.GetAdminElectionsAsync();

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
}
