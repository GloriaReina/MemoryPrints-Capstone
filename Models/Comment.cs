using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MemoryPrints.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        public int JournalId { get; set; }
        //public Journal? Journal { get; set; }

        [Required]
        [DisplayName("Author")]
        public int UserId { get; set; }
        public User? User { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime CreationDate { get; set; }
    }
}
