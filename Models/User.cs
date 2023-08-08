using System.ComponentModel.DataAnnotations;

namespace MemoryPrints.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string RelationShip { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public DateTime? CreateDateTime { get; set; }

        public string ImageLocation { get; set; }

        public int UserRoleId { get; set; }
        public UserRole? UserRole { get; set; }

    }
}
