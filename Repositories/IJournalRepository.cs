using MemoryPrints.Models;
using Microsoft.Data.SqlClient;

namespace MemoryPrints.Repositories
{
    public interface IJournalRepository
    {
        void Add(Journal journal);
        bool HasReferences(int journalId);
        void Delete(int id);
        List<Journal> GetAllJournals();
        List<Journal> GetAllUnapprovedJournals();
        Journal GetJournalById(int id);
        List<Journal> GetJournalsByUserId(int userId);
        void Update(Journal journal);
        List<Journal> Search(string criterion);

        //List<Journal> SearchByTerm(string searchTerm);
        //List<Journal> SearchByDate(DateTime searchDate);
        //List<Journal> SearchByCategory(string categoryName);
        //List<Journal> SearchByUserRole(string roleName);
        //List<Journal> SearchByUser(string searchValue, string searchType);
    }
}