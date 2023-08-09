using MemoryPrints.Models;
using MemoryPrints.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemoryPrints.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JournalEntryChildProfilesController : ControllerBase
    {
        private readonly IJournalEntryChildProfilesLinkRepository _journalEntryChildProfilesLinkRepository;

        public JournalEntryChildProfilesController(IJournalEntryChildProfilesLinkRepository journalEntryChildProfilesLinkRepository)
        {
            _journalEntryChildProfilesLinkRepository = journalEntryChildProfilesLinkRepository;
        }

        [HttpGet("journal/{journalId}")]
        public IActionResult GetJournalEntryKidProfilesByJournalId(int journalId)
        {
            return Ok(_journalEntryChildProfilesLinkRepository.GetJournalEntryKidProfilesByJournalId(journalId));

        }

        [HttpGet("childuser/{childUserId}")]
        public IActionResult GetJournalEntryKidProfilesByChildUserId(int childUserId)
        {
            return Ok(_journalEntryChildProfilesLinkRepository.GetJournalEntryKidProfilesByChildUserId(childUserId));
        }

        [HttpPost]
        public IActionResult AddJournalEntryKidProfile(JournalEntryChildProfiles journalEntryChildProfile)
        {
            _journalEntryChildProfilesLinkRepository.AddJournalEntryKidProfile(journalEntryChildProfile);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteJournalEntryKidProfile(int id)
        {
            _journalEntryChildProfilesLinkRepository.DeleteJournalEntryKidProfile(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateJournalEntryChildProfile(int id, JournalEntryChildProfiles updatedProfile)
        {
            if (id != updatedProfile.Id)
            {
                // If the ids do not match, return a BadRequest response
                return BadRequest();
            }

                _journalEntryChildProfilesLinkRepository.Update(updatedProfile);

                // Return a NoContent response indicating that the update was successful
                return NoContent();
        }
        

    }
}
