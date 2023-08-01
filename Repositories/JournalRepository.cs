using MemoryPrints.Models;
using MemoryPrints.Utils;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.ComponentModel;
using System;

namespace MemoryPrints.Repositories
{
    public class JournalRepository : BaseRepository, IJournalRepository
    {
        public JournalRepository(IConfiguration config) : base(config) { }
        public List<Journal> GetAllJournals()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT j.Id AS JournalId, j.UserId, j.Title, j.Content, j.Gratitude,
                        j.Intention, j.CategoryId, j.IsApproved, j.CreationDate,
                        u.FirstName, u.LastName, u.DisplayName, u.Email,
                        u.CreateDateTime as UserCreateDateTime, u.ImageLocation AS AvatarImage,
                        c.Name AS CategoryName
                        FROM Journal j
                        LEFT JOIN [User] u ON j.UserId = u.Id
                        LEFT JOIN Category c ON j.CategoryId = c.Id
                        WHERE j.IsApproved = 1 AND j.CreationDate <= SYSDATETIME()
                        ORDER BY j.CreationDate DESC";

                    var reader = cmd.ExecuteReader();

                    var journals = new List<Journal>();
                    while (reader.Read())
                    {
                        journals.Add(new Journal()
                        {
                            Id = DbUtils.GetInt(reader, "JournalId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Gratitude = DbUtils.GetString(reader, "Gratitude"),
                            Intention = DbUtils.GetString(reader, "Intention"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            IsApproved = DbUtils.GetBool(reader, "IsApproved"),
                            CreationDate = DbUtils.GetDateTime(reader, "CreationDate"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "UserCreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "AvatarImage")
                            },
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName")
                            }
                        });
                    }

                    reader.Close();
                    return journals;
                }
            }
        }

        public Journal GetJournalById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT j.Id AS JournalId, j.UserId, j.Title, j.Content, j.Gratitude,
                               j.Intention, j.CategoryId, j.IsApproved, j.CreationDate,
                               u.FirstName, u.LastName, u.DisplayName, u.Email,
                               u.CreateDateTime as UserCreateDateTime, u.ImageLocation AS AvatarImage,
                               c.Name AS CategoryName
                        FROM Journal j
                        LEFT JOIN [User] u ON j.UserId = u.Id
                        LEFT JOIN Category c ON j.CategoryId = c.Id
                        WHERE j.IsApproved = 1 AND j.CreationDate < SYSDATETIME() AND j.Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", id);

                    var reader = cmd.ExecuteReader();
                    Journal journal = null;
                    if (reader.Read())
                    {
                        journal = new Journal()
                        {
                            Id = DbUtils.GetInt(reader, "JournalId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Gratitude = DbUtils.GetString(reader, "Gratitude"),
                            Intention = DbUtils.GetString(reader, "Intention"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            IsApproved = DbUtils.GetBool(reader, "IsApproved"),
                            CreationDate = DbUtils.GetDateTime(reader, "CreationDate"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "UserCreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "AvatarImage")
                            },
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName")
                            }
                        };
                    }

                    reader.Close();
                    return journal;
                }
            }
        }


        public List<Journal> GetJournalsByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT j.Id, j.UserId, j.Title, j.Content, j.Gratitude, j.Intention, j.CategoryId, j.IsApproved, j.CreationDate,
                       c.[Name] AS CategoryName,
                       u.FirstName, u.LastName, u.DisplayName, u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage, u.UserRoleId,
                       ur.[Name] AS UserRoleName
                FROM Journal j
                LEFT JOIN Category c ON j.CategoryId = c.Id
                LEFT JOIN [User] u ON j.UserId = u.Id
                LEFT JOIN UserRole ur ON u.UserRoleId = ur.Id
                WHERE j.UserId = @userId";

                    cmd.Parameters.AddWithValue("@userId", userId);

                    var reader = cmd.ExecuteReader();

                    List<Journal> journals = new List<Journal>();

                    while (reader.Read())
                    {
                        Journal journal = new Journal
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Gratitude = DbUtils.GetString(reader, "Gratitude"),
                            Intention = DbUtils.GetString(reader, "Intention"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            IsApproved = DbUtils.GetBool(reader, "IsApproved"),
                            CreationDate = DbUtils.GetDateTime(reader, "CreationDate"),
                            Category = new Category
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName")
                            },
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "AvatarImage"),
                                UserRoleId = DbUtils.GetInt(reader, "UserRoleId")
                            }
                        };

                        journals.Add(journal);
                    }

                    reader.Close();

                    return journals;
                }
            }
        }
        public void Add(Journal journal)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO Journal (UserId, Title, Content, Gratitude, Intention, CategoryId, IsApproved, CreationDate)
                OUTPUT INSERTED.Id
                VALUES (@UserId, @Title, @Content, @Gratitude, @Intention, @CategoryId, @IsApproved, @CreationDate)";

                    cmd.Parameters.AddWithValue("@UserId", journal.UserId);
                    cmd.Parameters.AddWithValue("@Title", journal.Title);
                    cmd.Parameters.AddWithValue("@Content", journal.Content);
                    cmd.Parameters.AddWithValue("@Gratitude", journal.Gratitude);
                    cmd.Parameters.AddWithValue("@Intention", journal.Intention);
                    cmd.Parameters.AddWithValue("@CategoryId", journal.CategoryId);
                    cmd.Parameters.AddWithValue("@IsApproved", journal.IsApproved);
                    cmd.Parameters.AddWithValue("@CreationDate", journal.CreationDate);

                    journal.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Journal WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Journal journal)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                UPDATE Journal
                SET UserId = @UserId,
                    Title = @Title,
                    Content = @Content,
                    Gratitude = @Gratitude,
                    Intention = @Intention,
                    CategoryId = @CategoryId,
                    IsApproved = @IsApproved,
                    CreationDate = @CreationDate
                WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@UserId", journal.UserId);
                    cmd.Parameters.AddWithValue("@Title", journal.Title);
                    cmd.Parameters.AddWithValue("@Content", journal.Content);
                    cmd.Parameters.AddWithValue("@Gratitude", journal.Gratitude);
                    cmd.Parameters.AddWithValue("@Intention", journal.Intention);
                    cmd.Parameters.AddWithValue("@CategoryId", journal.CategoryId);
                    cmd.Parameters.AddWithValue("@IsApproved", journal.IsApproved);
                    cmd.Parameters.AddWithValue("@CreationDate", journal.CreationDate);
                    cmd.Parameters.AddWithValue("@Id", journal.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}

