using MemoryPrints.Models;

namespace MemoryPrints.Repositories
{
    public interface IJournalRepository
    {
        void Add(Journal journal);
        void Delete(int id);
        List<Journal> GetAllJournals();
        Journal GetJournalById(int id);
        List<Journal> GetJournalsByUserId(int userId);
        void Update(Journal journal);
    }
}