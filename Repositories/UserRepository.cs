using MemoryPrints.Models;
using MemoryPrints.Utils;
using Microsoft.Data.SqlClient;

namespace MemoryPrints.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration config) : base(config) { }

        public void AddUser(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO [User] (DisplayName, FirstName, LastName, RelationShip, Email, Password, CreateDateTime, ImageLocation, UserRoleId)
                OUTPUT INSERTED.Id
                VALUES (@DisplayName, @FirstName, @LastName, @RelationShip, @Email, @Password, @CreateDateTime, @ImageLocation, @UserRoleId)";

                    cmd.Parameters.AddWithValue("@DisplayName", user.DisplayName);
                    cmd.Parameters.AddWithValue("@FirstName", user.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", user.LastName);
                    cmd.Parameters.AddWithValue("@RelationShip", user.RelationShip);
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@Password", user.Password);
                    cmd.Parameters.AddWithValue("@CreateDateTime", user.CreateDateTime);
                    cmd.Parameters.AddWithValue("@ImageLocation", user.ImageLocation);
                    cmd.Parameters.AddWithValue("@UserRoleId", user.UserRoleId);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void DeleteUser(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM [User] WHERE Id = @UserId";
                    cmd.Parameters.AddWithValue("@UserId", userId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void UpdateUser(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                UPDATE [User]
                SET DisplayName = @DisplayName,
                    FirstName = @FirstName,
                    LastName = @LastName,
                    RelationShip = @RelationShip,
                    Email = @Email,
                    Password = @Password,
                    ImageLocation = @ImageLocation,
                    UserRoleId = @UserRoleId
                WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@DisplayName", user.DisplayName);
                    cmd.Parameters.AddWithValue("@FirstName", user.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", user.LastName);
                    cmd.Parameters.AddWithValue("@RelationShip", user.RelationShip);
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@Password", user.Password);
                    cmd.Parameters.AddWithValue("@ImageLocation", user.ImageLocation);
                    cmd.Parameters.AddWithValue("@UserRoleId", user.UserRoleId);
                    cmd.Parameters.AddWithValue("@Id", user.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public User GetUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, DisplayName, FirstName, LastName, RelationShip, Email, Password,
                       CreateDateTime, ImageLocation, UserRoleId
                FROM [User]
                WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", id);

                    var reader = cmd.ExecuteReader();

                    User user = null;

                    if (reader.Read())
                    {
                        user = new User
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            RelationShip = DbUtils.GetString(reader, "RelationShip"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Password = DbUtils.GetString(reader, "Password"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserRoleId = DbUtils.GetInt(reader, "UserRoleId"),
                        };
                    }

                    reader.Close();
                    return user;
                }
            }
        }
        public List<User> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, DisplayName, FirstName, LastName, RelationShip, Email, Password,
                       CreateDateTime, ImageLocation, UserRoleId
                FROM [User]";

                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();

                    while (reader.Read())
                    {
                        var user = new User
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            RelationShip = DbUtils.GetString(reader, "RelationShip"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Password = DbUtils.GetString(reader, "Password"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserRoleId = DbUtils.GetInt(reader, "UserRoleId"),
                        };
                        users.Add(user);
                    }

                    reader.Close();
                    return users;
                }
            }
        }

        public List<User> GetAllKidUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                  SELECT Id, DisplayName, FirstName, LastName, RelationShip, Email, Password,
                       CreateDateTime, ImageLocation, UserRoleId
                FROM [User]
                WHERE UserRoleId = 3";

                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();

                    while (reader.Read())
                    {
                        var user = new User
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            RelationShip = DbUtils.GetString(reader, "RelationShip"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Password = DbUtils.GetString(reader, "Password"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserRoleId = DbUtils.GetInt(reader, "UserRoleId"),
                        };
                        users.Add(user);
                    }

                    reader.Close();
                    return users;
                }
            }
        }

        public List<User> GetUsersByUserRole(int userRoleId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, DisplayName, FirstName, LastName, RelationShip, Email, Password,
                       CreateDateTime, ImageLocation, UserRoleId
                FROM [User]
                WHERE UserRoleId = @UserRoleId";

                    cmd.Parameters.AddWithValue("@UserRoleId", userRoleId);

                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();

                    while (reader.Read())
                    {
                        var user = new User
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            RelationShip = DbUtils.GetString(reader, "RelationShip"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Password = DbUtils.GetString(reader, "Password"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserRoleId = DbUtils.GetInt(reader, "UserRoleId"),
                        };
                        users.Add(user);
                    }

                    reader.Close();
                    return users;
                }
            }
        }
        /*verify user credentials during the login process. It takes an email and password as input and checks if there is a matching user record in the database. If a matching user is found, the method returns a User object representing the authenticated user.*/
        public User AuthenticateUser(string email, string password)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, DisplayName, FirstName, LastName, RelationShip, Email, Password,
                       CreateDateTime, ImageLocation, UserRoleId
                FROM [User]
                WHERE Email = @Email AND Password = @Password";

                    cmd.Parameters.AddWithValue("@Email", email);
                    cmd.Parameters.AddWithValue("@Password", password);

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        var user = new User
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            RelationShip = DbUtils.GetString(reader, "RelationShip"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Password = DbUtils.GetString(reader, "Password"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserRoleId = DbUtils.GetInt(reader, "UserRoleId"),
                        };

                        reader.Close();
                        return user;
                    }

                    reader.Close();
                    return null;
                }
            }
        }
        public bool ChangePassword(string email, string currentPassword, string newPassword)
        {
            // Step 1: Authenticate the user using the provided email and current password
            var user = AuthenticateUser(email, currentPassword);

            if (user == null)
            {
                // Authentication failed, user does not exist or provided incorrect current password
                return false;
            }

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // Step 2: Update the user's password in the database
                    cmd.CommandText = @"
                UPDATE [User]
                SET Password = @NewPassword
                WHERE Email = @Email";

                    cmd.Parameters.AddWithValue("@NewPassword", newPassword);
                    cmd.Parameters.AddWithValue("@Email", email);

                    int rowsAffected = cmd.ExecuteNonQuery();

                    /*returns the number of rows affected by the update.successful updates = one row is affected, => return true to indicate that the password has been changed. Otherwise, false.*/
                    return rowsAffected > 0;
                }
            }
        }

    }
}
