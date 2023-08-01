using MemoryPrints.Models;

namespace MemoryPrints.Repositories
{
    public interface IUserRoleRepository
    {
        void AddUserRole(UserRole userRole);
        void DeleteUserRole(int id);
        List<UserRole> GetAllUserRoles();
        void UpdateUserRole(UserRole userRole);
    }
}