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
        private readonly IJournalReactionRepository _journalReactionRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly IJournalEntryChildProfilesLinkRepository _journalEntryChildProfilesLinkRepository;
        public JournalController(IJournalRepository journalRepository, IJournalReactionRepository journalReactionRepository, ICommentRepository commentRepository, IJournalEntryChildProfilesLinkRepository journalEntryChildProfilesLinkRepository)
        {
            _journalRepository = journalRepository;
            _journalReactionRepository= journalReactionRepository;
            _commentRepository= commentRepository;
            _journalEntryChildProfilesLinkRepository= journalEntryChildProfilesLinkRepository;
        }

        [HttpGet]
        public IActionResult GetAllJournals()
        {
            return Ok(_journalRepository.GetAllJournals());
        }

        [HttpGet("unapproved")]
        public IActionResult GetAllUnapprovedJournals()
        {
            return Ok(_journalRepository.GetAllUnapprovedJournals());
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
            var journalList = _journalRepository.GetJournalsByUserId(userId).OrderByDescending(j => j.CreationDate)
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
            journal.IsApproved = false;
            _journalRepository.Add(journal);
            return CreatedAtAction("GetByJournalId", new { id = journal.Id }, journal);
        }

        [HttpPut("{journalId}")]
        public IActionResult Update(Journal journal)
        {
           
            _journalRepository.Update(journal);
            return NoContent();
        }


        [HttpPut("{id}/approve")]
        public IActionResult ApproveJournal(int id)
        {
            var journal = _journalRepository.GetJournalById(id);

            if (journal == null)
            {
                return NotFound();
            }

            // Set IsApproved to true
            journal.IsApproved = true;

            // Update the journal
            _journalRepository.Update(journal);

            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (_journalRepository.HasReferences(id))
            {
                // Delete references from related tables
                _commentRepository.Delete(id);
                _journalReactionRepository.DeleteJournalReaction(id);
                _journalEntryChildProfilesLinkRepository.DeleteJournalEntryKidProfile(id);
               
            }

           

            // Delete the journal itself
            _journalRepository.Delete(id);
            return NoContent();
        }


        [HttpGet("search")]
        public IActionResult Search(string q)
        {
            return Ok(_journalRepository.Search(q));
        }


        //[HttpGet("searchbyterm")]
        //public IActionResult SearchByTerm(string searchTerm)
        //{
        //    return Ok(_journalRepository.SearchByTerm(searchTerm));
        //}

        //[HttpGet("searchbydate")]
        //public IActionResult SearchByDate(DateTime searchDate)
        //{
        //    return Ok(_journalRepository.SearchByDate(searchDate));
        //}

        //[HttpGet("searchbycategory")]
        //public IActionResult SearchByCategory(string categoryName)
        //{
        //    return Ok(_journalRepository.SearchByCategory(categoryName));
        //}

        //[HttpGet("searchbyuserrole")]
        //public IActionResult SearchByUserRole(string roleName)
        //{
        //    return Ok(_journalRepository.SearchByUserRole(roleName));
        //}

        //[HttpGet("searchbyuser")]
        //public IActionResult SearchByUser(string searchValue, string searchType)
        //{
        //    return Ok(_journalRepository.SearchByUser(searchValue, searchType));
        //}
    }
}
