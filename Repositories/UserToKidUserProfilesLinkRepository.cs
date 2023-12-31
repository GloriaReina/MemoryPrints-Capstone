﻿using MemoryPrints.Models;
using MemoryPrints.Utils;

namespace MemoryPrints.Repositories
{
    public class UserToKidUserProfilesLinkRepository : BaseRepository, IUserToKidUserProfilesLinkRepository
    {
        public UserToKidUserProfilesLinkRepository(IConfiguration config) : base(config) { }
        public List<UserToKidUserProfilesLink> GetAllUserToKidUserProfilesLinks()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, UserId, ChildUserId
                                FROM UserToKidUserProfilesLink";

                    var reader = cmd.ExecuteReader();

                    var userToKidUserProfilesLinks = new List<UserToKidUserProfilesLink>();
                    while (reader.Read())
                    {
                        userToKidUserProfilesLinks.Add(new UserToKidUserProfilesLink()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            ChildUserId = DbUtils.GetInt(reader, "ChildUserId")
                        });
                    }

                    reader.Close();
                    return userToKidUserProfilesLinks;
                }
            }
        }
        public List<UserToKidUserProfilesLink> GetUserToKidUserProfilesLinksByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT upl.Id, upl.UserId, upl.ChildUserId, parent.FirstName AS ParentFirstName, parent.LastName AS ParentLastName, child.FirstName AS ChildFirstName, child.LastName AS ChildLastName
                      FROM UserToKidUserProfilesLink upl
                      LEFT JOIN [User] parent ON parent.id = upl.UserId
                      LEFT JOIN [User] child ON child.id = upl.ChildUserId
                     WHERE upl.UserId = @userId";

                    DbUtils.AddParameter(cmd, "@userId", userId);

                    var reader = cmd.ExecuteReader();

                    var userToKidUserProfilesLinks = new List<UserToKidUserProfilesLink>();
                    while (reader.Read())
                    {
                        userToKidUserProfilesLinks.Add(new UserToKidUserProfilesLink()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            ChildUserId = DbUtils.GetInt(reader, "ChildUserId")
                        });
                    }

                    reader.Close();
                    return userToKidUserProfilesLinks;
                }
            }
        }


        //public void AddUserToKidUserProfilesLink(int userId, int childUserId)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //            INSERT INTO UserToKidUserProfilesLink (UserId, ChildUserId)
        //            VALUES (@UserId, @ChildUserId)";

        //            DbUtils.AddParameter(cmd, "@UserId", userId);
        //            DbUtils.AddParameter(cmd, "@ChildUserId", childUserId);

        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}



        public void AddUserToKidUserProfilesLink(UserToKidUserProfilesLink userToKidUserProfilesLink)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO UserToKidUserProfilesLink (UserId, ChildUserId)
                VALUES (@UserId, @ChildUserId)";

                    DbUtils.AddParameter(cmd, "@UserId", userToKidUserProfilesLink.UserId);
                    DbUtils.AddParameter(cmd, "@ChildUserId", userToKidUserProfilesLink.ChildUserId);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        //public void AddUserToKidUserProfilesLink(UserToKidUserProfilesLink userToKidUserProfilesLink)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //        INSERT INTO UserToKidUserProfilesLink (UserId, ChildUserId)
        //        VALUES (@UserId, @ChildUserId)";

        //            DbUtils.AddParameter(cmd, "@UserId", userToKidUserProfilesLink.UserId);
        //            DbUtils.AddParameter(cmd, "@ChildUserId", userToKidUserProfilesLink.ChildUserId);

        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}
        public void UpdateUserToKidUserProfilesLink(UserToKidUserProfilesLink userToKidUserProfilesLink)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                UPDATE UserToKidUserProfilesLink
                SET UserId = @UserId,
                    ChildUserId = @ChildUserId
                WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@UserId", userToKidUserProfilesLink.UserId);
                    DbUtils.AddParameter(cmd, "@ChildUserId", userToKidUserProfilesLink.ChildUserId);
                    DbUtils.AddParameter(cmd, "@Id", userToKidUserProfilesLink.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteUserToKidUserProfilesLink(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM UserToKidUserProfilesLink WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
