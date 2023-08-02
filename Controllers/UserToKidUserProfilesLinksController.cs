using MemoryPrints.Models;
using MemoryPrints.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemoryPrints.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserToKidUserProfilesLinksController : ControllerBase
    {
            private readonly
            IUserToKidUserProfilesLinkRepository _userToKidUserProfilesLinkRepository;

            public UserToKidUserProfilesLinksController(IUserToKidUserProfilesLinkRepository userToKidUserProfilesLinkRepository)
            {
                _userToKidUserProfilesLinkRepository = userToKidUserProfilesLinkRepository;
            }

            [HttpGet]
            public IActionResult GetAllUserToKidUserProfilesLinks()
            {
            return Ok
          (_userToKidUserProfilesLinkRepository.GetAllUserToKidUserProfilesLinks());
              
            }

            [HttpGet("{userId}")]
            public IActionResult GetUserToKidUserProfilesLinksByUserId(int userId)
            {
            return Ok(_userToKidUserProfilesLinkRepository.GetUserToKidUserProfilesLinksByUserId(userId));
                
            }

            [HttpPost]
            public IActionResult AddUserToKidUserProfilesLink(UserToKidUserProfilesLink userToKidUserProfilesLink)
            {
                _userToKidUserProfilesLinkRepository.AddUserToKidUserProfilesLink(userToKidUserProfilesLink);
                return Ok();
            }

            [HttpPut("{id}")]
            public IActionResult UpdateUserToKidUserProfilesLink(int id,UserToKidUserProfilesLink userToKidUserProfilesLink)
            {
            if (id != userToKidUserProfilesLink.Id)
            {
                return BadRequest();
            }
            _userToKidUserProfilesLinkRepository.UpdateUserToKidUserProfilesLink(userToKidUserProfilesLink);
                return Ok();
            }

            [HttpDelete("{id}")]
            public IActionResult DeleteUserToKidUserProfilesLink(int id)
            {
                _userToKidUserProfilesLinkRepository.DeleteUserToKidUserProfilesLink(id);
                return Ok();
            }

        
    }
}
