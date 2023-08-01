using MemoryPrints.Models;

namespace MemoryPrints.Repositories
{
    public interface IJournalReactionRepository
    {
        void AddJournalReaction(JournalReaction journalReaction);
        void DeleteJournalReaction(int id);
        int GetEmojiCountByEmojiCode(string emojiCode);
        List<JournalReaction> GetJournalReactionsByJournalId(int journalId);
        List<JournalReaction> GetJournalReactionsByUserId(int userId);
        void UpdateJournalReaction(JournalReaction journalReaction);
    }
}