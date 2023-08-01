namespace MemoryPrints.Models
{
    public class JournalEntryKidProfiles
    {
        public int Id { get; set; }

        public int JournalId { get; set; }
        public Journal Journal { get; set; }

        public int ChildUserId { get; set; }
        public User ChildUser { get; set; }
    }
}
