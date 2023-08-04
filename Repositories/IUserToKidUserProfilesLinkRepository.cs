using MemoryPrints.Models;

namespace MemoryPrints.Repositories
{
    public interface IUserToKidUserProfilesLinkRepository
    {
        void AddUserToKidUserProfilesLink(int userId, UserToKidUserProfilesLink userToKidUserProfilesLink);
        void DeleteUserToKidUserProfilesLink(int id);
        List<UserToKidUserProfilesLink> GetAllUserToKidUserProfilesLinks();
        List<UserToKidUserProfilesLink> GetUserToKidUserProfilesLinksByUserId(int userId);
        void UpdateUserToKidUserProfilesLink(UserToKidUserProfilesLink userToKidUserProfilesLink);
    }
}