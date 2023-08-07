using MemoryPrints.Models;

namespace MemoryPrints.Repositories
{
    public interface IUserToKidUserProfilesLinkRepository
    {
        //void AddUserToKidUserProfilesLink(int userId, UserToKidUserProfilesLink userToKidUserProfilesLink);
        void AddUserToKidUserProfilesLink( UserToKidUserProfilesLink userToKidUserProfilesLink);
        //void AddUserToKidUserProfilesLink(int userId, int childUserId);

        void DeleteUserToKidUserProfilesLink(int id);
        List<UserToKidUserProfilesLink> GetAllUserToKidUserProfilesLinks();
        List<UserToKidUserProfilesLink> GetUserToKidUserProfilesLinksByUserId(int userId);
        void UpdateUserToKidUserProfilesLink(UserToKidUserProfilesLink userToKidUserProfilesLink);
    }
}