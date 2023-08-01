using MemoryPrints.Models;

namespace MemoryPrints.Repositories
{
    public interface IJournalEntryChildProfilesLinkRepository
    {
        void AddJournalEntryKidProfile(JournalEntryChildProfiles journalEntryChildProfile);
        void DeleteJournalEntryKidProfile(int id);
        List<JournalEntryChildProfiles> GetJournalEntryKidProfilesByChildUserId(int childUserId);
        List<JournalEntryChildProfiles> GetJournalEntryKidProfilesByJournalId(int journalId);
    }
}