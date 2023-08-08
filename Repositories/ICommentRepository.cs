using MemoryPrints.Models;

namespace MemoryPrints.Repositories
{
    public interface ICommentRepository
    {
        void Add(Comment comment);
        void Delete(int id);
        List<Comment> GetCommentsByJournalId(int journalId);
        void Update(int commentId, Comment comment);
    }
}