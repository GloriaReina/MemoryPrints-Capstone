using MemoryPrints.Models;
using MemoryPrints.Utils;

namespace MemoryPrints.Repositories
{
    public class UserRoleRepository : BaseRepository, IUserRoleRepository
    {
        public UserRoleRepository(IConfiguration config) : base(config) { }

        public List<UserRole> GetAllUserRoles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name FROM UserRole";
                    var reader = cmd.ExecuteReader();

                    var userRoles = new List<UserRole>();
                    while (reader.Read())
                    {
                        userRoles.Add(new UserRole
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        });
                    }

                    reader.Close();
                    return userRoles;
                }
            }
        }
        public void AddUserRole(UserRole userRole)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "INSERT INTO UserRole (Name) VALUES (@Name)";
                    DbUtils.AddParameter(cmd, "@Name", userRole.Name);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void UpdateUserRole(UserRole userRole)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "UPDATE UserRole SET Name = @Name WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Name", userRole.Name);
                    DbUtils.AddParameter(cmd, "@Id", userRole.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteUserRole(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM UserRole WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
