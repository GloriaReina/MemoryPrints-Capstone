using MemoryPrints.Models;
using MemoryPrints.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemoryPrints.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRoleController : ControllerBase
    {
        private readonly IUserRoleRepository _userRoleRepository;
        public UserRoleController(IUserRoleRepository userRoleRepository)
        {
            _userRoleRepository = userRoleRepository;
        }

        [HttpGet]
        public IActionResult GetAllUserRoles()
        {
            return Ok( _userRoleRepository.GetAllUserRoles());
        }

        [HttpPost]
        public IActionResult AddUserRole( UserRole userRole)
        {
            _userRoleRepository.AddUserRole(userRole);
            return NoContent();
        }

        [HttpDelete("userroles/{id}")]
        public IActionResult DeleteUserRole(int id)
        {
            _userRoleRepository.DeleteUserRole(id);
            return NoContent();
        }

        [HttpPut("userroles/{id}")]
        public IActionResult UpdateUserRole(int id, UserRole userRole)
        {
            if (id != userRole.Id)
            {
                return BadRequest();
            }

            _userRoleRepository.UpdateUserRole(userRole);
            return NoContent();
        }

    }
}
