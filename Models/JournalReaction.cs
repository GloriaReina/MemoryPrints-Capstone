namespace MemoryPrints.Models
{
    public class JournalReaction
    {
        public int Id { get; set; }

        public int JournalId { get; set; }
        public Journal Journal { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public string EmojiCode { get; set; }

        public string EmojiName { get; set; }

        public DateTime CreationDate { get; set; }
    }
}
