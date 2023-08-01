using MemoryPrints.Models;

namespace MemoryPrints.Repositories
{
    public interface IUserRepository
    {
        void AddUser(User user);
        User AuthenticateUser(string email, string password);
        bool ChangePassword(string email, string currentPassword, string newPassword);
        void DeleteUser(int userId);
        List<User> GetAllUsers();
        User GetUserById(int id);
        List<User> GetUsersByUserRole(int userRoleId);
        void UpdateUser(User user);
    }
}