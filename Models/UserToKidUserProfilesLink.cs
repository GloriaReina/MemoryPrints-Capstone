namespace MemoryPrints.Models
{
    public class UserToKidUserProfilesLink
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

        public int ChildUserId { get; set; }
        public User ChildUser { get; set; }
    }
}
