using MemoryPrints.Models;
using System.ComponentModel.DataAnnotations;

namespace MemoryPrints.Models
{
    public class Journal
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public User? User { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public string Gratitude { get; set; }

        [Required]
        public string Intention { get; set; }

        [Required]
        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        [Required]
        public bool IsApproved { get; set; }

        public DateTime CreationDate { get; set; }

        //can access the list of comments, reactions,childprofiles associated or made by a particular user.
        public List<Comment> Comments { get; set; }= new List<Comment>();
        //public List<JournalReaction> JournalReactions { get; set; }
        //public List<JournalEntryKidProfiles> JournalEntryKidProfiles { get; set; }
    }
}




