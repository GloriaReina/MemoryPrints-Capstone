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

        [HttpGet("user/{userId}")]
        public IActionResult GetByUserId(int userId)
        {
            List<Journal> journalList = _journalRepository.GetJournalsByUserId(userId).OrderByDescending(j => j.CreationDate)
        .ToList(); 
            if (journalList == null)
            {
                return NotFound();
            }
            return Ok(journalList);
        }

        [HttpPost]
        public IActionResult Add(Journal journal)
        {
            journal.CreationDate = DateTime.Now;
            _journalRepository.Add(journal);
            return CreatedAtAction("Get", new { id = journal.Id }, journal);
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
    }
}
