using MemoryPrints.Models;
using MemoryPrints.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemoryPrints.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JournalReactionController : ControllerBase
    {
        private readonly IJournalReactionRepository _journalReactionRepository;
        public JournalReactionController(IJournalReactionRepository journalReactionRepository)
        {
            _journalReactionRepository = journalReactionRepository;
        }

        [HttpGet("journal/{journalId}")]
        public IActionResult GetJournalReactionsByJournalId(int journalId)
        {
            List <JournalReaction> journalReactions = _journalReactionRepository.GetJournalReactionsByJournalId(journalId);
            return Ok(journalReactions);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetJournalReactionsByUserId(int userId)
        {
            var journalReactions = _journalReactionRepository.GetJournalReactionsByUserId(userId);
            if (journalReactions == null)
            {
                return NotFound();
            }
            return Ok(journalReactions);
        }


        [HttpPost]
        public IActionResult AddJournalReaction(JournalReaction journalReaction)
        {
            _journalReactionRepository.AddJournalReaction(journalReaction);
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateJournalReaction(JournalReaction journalReaction)
        {
            _journalReactionRepository.UpdateJournalReaction(journalReaction);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteJournalReaction(int id)
        {
            _journalReactionRepository.DeleteJournalReaction(id);
            return Ok();
        }

        [HttpGet("emojiCount/{emojiCode}")]
        public IActionResult GetEmojiCountByEmojiCode(string emojiCode)
        {
            _journalReactionRepository.GetEmojiCountByEmojiCode(emojiCode);
            return Ok();
        }
    }
}
