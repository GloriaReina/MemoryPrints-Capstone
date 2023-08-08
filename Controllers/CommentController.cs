using MemoryPrints.Models;
using MemoryPrints.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemoryPrints.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet("GetCommentsByJournalId")]
        public IActionResult GetCommentsByJournalId(int journalId)
        {
            var comment = _commentRepository.GetCommentsByJournalId(journalId).OrderByDescending(c => c.CreationDate)
            .ToList();


            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        [HttpPost]
        public IActionResult AddComment(Comment comment)
        {
            comment.CreationDate = DateTime.Now;
            _commentRepository.Add(comment);

            return NoContent();
        }


        [HttpPut("{id}")]
        public IActionResult EditComment(int id, Comment updateCommentValue)
        {
            _commentRepository.Update(id,updateCommentValue);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.Delete(id);
            return NoContent();
        }

    }
}
