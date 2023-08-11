using MemoryPrints.Models;
using MemoryPrints.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemoryPrints.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            List<User> users = _userRepository.GetAllUsers();
            return Ok(users);
        }

        [HttpPost]
        public IActionResult AddUser(User user)
        {
            user.CreateDateTime = DateTime.Now;

            // Register the user without kidUserId
            _userRepository.AddUser(user);

            // Return the user object in the response
            return CreatedAtAction("GetUserById", new { id = user.Id }, user);
        }




        [HttpPut("user/{id}")]
        public IActionResult UpdateUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _userRepository.UpdateUser(user);
            return NoContent();
        }

        [HttpDelete("users/{id}")]
        public IActionResult DeleteUser(int id)
        {
            _userRepository.DeleteUser(id);
            return Ok();
        }

        [HttpGet("users/{id}")]
        public IActionResult GetUserById(int id)
        {
            User user = _userRepository.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }


            return Ok(user);
        }

       

        [HttpGet ("users/kids")]
        public IActionResult GetAllKidUsers()
        {
            List<User> users = _userRepository.GetAllKidUsers();
            return Ok(users);
        }

        [HttpGet("users/role/{userRoleId}")]
        public IActionResult GetUsersByUserRole(int userRoleId)
        {
            List<User> users = _userRepository.GetUsersByUserRole(userRoleId);
            return Ok(users);
        }

        [HttpGet("authenticate")]
        public IActionResult AuthenticateUser(string email, string password)
        {
            var user = _userRepository.AuthenticateUser(email, password);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user); // Return the authenticated user information
        }


        [HttpPut("users/changepassword")]
        public IActionResult ChangePassword(string email, string currentPassword, string newPassword)
        {
            bool passwordChanged = _userRepository.ChangePassword(email, currentPassword, newPassword);

            if (!passwordChanged)
            {
                return BadRequest("Failed to change password. Please make sure you provided the correct email and current password.");
            }

            return Ok("Password changed successfully.");
        }


    }
}


//[HttpPost]
//public IActionResult AddUser(User user)
//{
//    user.CreateDateTime = DateTime.Now;

//    _userRepository.AddUser(user);

//    return CreatedAtAction("authenticate", new { email = user.Email }, user);
//}


//[HttpPost]
//public IActionResult AddUser(User user)
//{
//    _userRepository.AddUser(user);
//    return Ok();
//}



/*For anthentication,if dont want to send sensitive info in http request then use FromBody=>
 * 
 * [FromBody] attribute in ASP.NET Core is used to specify that the data for a parameter in a controller action method should be bound from the request body. 
 * 
 */

//[HttpPost("users/authenticate")]
//public IActionResult AuthenticateUser([FromBody] User user)
//{
//    // Your authentication logic using the provided user.Email and user.Password
//    User authenticatedUser = _userRepository.AuthenticateUser(user.Email, user.Password);

//    if (authenticatedUser != null)
//    {
//        // Authentication successful
//        return Ok(authenticatedUser);
//    }
//    else
//    {
//        // Authentication failed
//        return Unauthorized();
//    }
//}