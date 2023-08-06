using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MemoryPrints.Models;
using MemoryPrints.Repositories;
using Microsoft.Extensions.Hosting;
using Azure;


namespace MemoryPrints.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JournalController : ControllerBase
    {
        private readonly IJournalRepository _journalRepository;
        public JournalController(IJournalRepository journalRepository)
        {
            _journalRepository = journalRepository;
        }

        [HttpGet]
        public IActionResult GetAllJournals()
        {
            return Ok(_journalRepository.GetAllJournals());
        }

        [HttpGet("{id}")]
        public IActionResult GetByJournalId(int id)
        {
            Journal journal = _journalRepository.GetJournalById(id);
            if (journal == null)
            {
                return NotFound();
            }
            return Ok(journal);
        }

        //[HttpGet("user/{userId}")]
        //public IActionResult GetByUserId(int userId)
        //{
        //   var journalList = _journalRepository.GetJournalsByUserId(userId).OrderByDescending(j => j.CreationDate)
        //.ToList(); 
        //    if (journalList == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(journalList);
        //}

        [HttpGet("user/{userId}")]
        public IActionResult GetByUserId(string userIdString)
        {
            if (int.TryParse(userIdString, out int userId))
            {
                var journalList = _journalRepository.GetJournalsByUserId(userId).OrderByDescending(j => j.CreationDate).ToList();

                if (journalList == null)
                {
                    return NotFound();
                }

                return Ok(journalList);
            }
            else
            {
                // The userIdString is not a valid integer.
                return BadRequest("Invalid userId parameter.");
            }
        }

        [HttpPost]
        public IActionResult Add(Journal journal)
        {
            journal.CreationDate = DateTime.Now;
            journal.IsApproved = false;
            _journalRepository.Add(journal);
            return CreatedAtAction("GetByJournalId", new { id = journal.Id }, journal);
        }

        [HttpPut("{journalId}")]
        public IActionResult Update(int journalId,Journal journal)
        {
            if (journalId != journal.Id)
            {
                return BadRequest();
            }
            _journalRepository.Update(journal);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _journalRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("searchbyterm")]
        public IActionResult SearchByTerm(string searchTerm)
        {
            return Ok(_journalRepository.SearchByTerm(searchTerm));
        }

        [HttpGet("searchbydate")]
        public IActionResult SearchByDate(DateTime searchDate)
        {
            return Ok(_journalRepository.SearchByDate(searchDate));
        }

        [HttpGet("searchbycategory")]
        public IActionResult SearchByCategory(string categoryName)
        {
            return Ok(_journalRepository.SearchByCategory(categoryName));
        }

        [HttpGet("searchbyuserrole")]
        public IActionResult SearchByUserRole(string roleName)
        {
            return Ok(_journalRepository.SearchByUserRole(roleName));
        }

        [HttpGet("searchbyuser")]
        public IActionResult SearchByUser(string searchValue, string searchType)
        {
            return Ok(_journalRepository.SearchByUser(searchValue, searchType));
        }
    }
}
