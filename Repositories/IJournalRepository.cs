using MemoryPrints.Models;
using Microsoft.Data.SqlClient;

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
        List<Journal> SearchByTerm(string searchTerm);
        List<Journal> SearchByDate(DateTime searchDate);
        List<Journal> SearchByCategory(string categoryName);
        List<Journal> SearchByUserRole(string roleName);
        List<Journal> SearchByUser(string searchValue, string searchType);
    }
}