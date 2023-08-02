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

        /* All the methods use the same sorting logic= simplify code by creating a separate private method for fetching the data and sorting the results in descending order. */
        private List<Journal> FetchAndSortData(string sqlQuery, SqlParameter parameter)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = sqlQuery;
                    if (parameter != null)
                    {
                        DbUtils.AddParameter(cmd, "@Criterion", parameter.Value);
                    }
                

                    var reader = cmd.ExecuteReader();

                    var journals = new List<Journal>();
                    while (reader.Read())
                    {
                        journals.Add(new Journal()
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
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName")
                            },
                        });
                    }

                    reader.Close();

                    // Sort the journals in descending order based on CreationDate
                    journals.Sort((a, b) => b.CreationDate.CompareTo(a.CreationDate));

                    return journals;
                }
            }
        }

        public List<Journal> SearchByTerm(string searchTerm)
        {
            var sqlQuery = @"
            SELECT j.Id, j.UserId, j.Title, j.Content, j.Gratitude, j.Intention, 
                   j.CategoryId, j.IsApproved, j.CreationDate,
                   c.Name
            FROM Journal j
            LEFT JOIN Category c ON j.CategoryId = c.Id
            WHERE j.Title LIKE @Criterion OR j.Content LIKE @Criterion";

            var parameter = new SqlParameter("@Criterion", $"%{searchTerm}%");
            return FetchAndSortData(sqlQuery, parameter);
        }
        public List<Journal> SearchByDate(DateTime searchDate)
        {
            var sqlQuery = @"
            SELECT j.Id, j.UserId, j.Title, j.Content, j.Gratitude, j.Intention, 
                   j.CategoryId, j.IsApproved, j.CreationDate,
                   c.Name
            FROM Journal j
            INNER JOIN Category c ON j.CategoryId = c.Id
            WHERE j.CreationDate >= @Criterion";

            var parameter = new SqlParameter("@Criterion", searchDate);
            return FetchAndSortData(sqlQuery, parameter);
        }

        public List<Journal> SearchByCategory(string categoryName)
        {
            var sqlQuery = @"
            SELECT j.Id, j.UserId, j.Title, j.Content, j.Gratitude, j.Intention, 
                   j.CategoryId, j.IsApproved, j.CreationDate,
                   c.Name
            FROM Journal j
            LEFT JOIN Category c ON j.CategoryId = c.Id
            WHERE c.Name LIKE @Criterion";

            var parameter = new SqlParameter("@Criterion", $"%{categoryName}%");
            return FetchAndSortData(sqlQuery, parameter);
        }

        public List<Journal> SearchByUserRole(string roleName)
        {
            var sqlQuery = @"
            SELECT j.Id, j.UserId, j.Title, j.Content, j.Gratitude, j.Intention, 
                   j.CategoryId, j.IsApproved, j.CreationDate,
                   c.[Name], ur.[Name]
            FROM Journal j
            LEFT JOIN Category c ON j.CategoryId = c.Id
            LEFT JOIN UserRole ur ON j.UserId = ur.Id
            WHERE ur.[Name] LIKE @Criterion";

            var parameter = new SqlParameter("@Criterion", $"%{roleName}%");
            return FetchAndSortData(sqlQuery, parameter);
        }
        public List<Journal> SearchByUser(string searchValue, string searchType)
        {
            string columnName;
            switch (searchType.ToLower()) // Convert to lowercase to make the comparison case-insensitive
            {
                case "firstname":
                    columnName = "FirstName";
                    break;
                case "lastname":
                    columnName = "LastName";
                    break;
                case "displayname":
                    columnName = "DisplayName";
                    break;
                default:
                    throw new ArgumentException("Invalid search type.", nameof(searchType));
            }

            var sqlQuery = $@"
            SELECT j.Id, j.UserId, j.Title, j.Content, j.Gratitude, j.Intention, 
                   j.CategoryId, j.IsApproved, j.CreationDate,
                   c.[Name]
            FROM Journal j
            LEFT JOIN Category c ON j.CategoryId = c.Id
            LEFT JOIN [User] u ON j.UserId = u.Id
            WHERE u.{columnName} LIKE @Criterion";

            var parameter = new SqlParameter("@Criterion", $"%{searchValue}%");
            return FetchAndSortData(sqlQuery, parameter);
        }
    }
}


/* public List<Journal> SearchByTerm(string searchTerm, bool sortDescending)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = @"
                    SELECT j.Id, j.UserId, j.Title, j.Content, j.Gratitude, j.Intention, 
                           j.CategoryId, j.IsApproved, j.CreationDate,
                           c.CategoryName, c.CategoryDescription
                    FROM Journal j
                    INNER JOIN Category c ON j.CategoryId = c.Id
                    WHERE j.Title LIKE @Criterion OR j.Content LIKE @Criterion";

                    if (sortDescending)
                    {
                        sql += " ORDER BY j.CreationDate DESC";
                    }
                    else
                    {
                        sql += " ORDER BY j.CreationDate";
                    }

                    cmd.CommandText = sql;
                    DbUtils.AddParameter(cmd, "@Criterion", $"%{searchTerm}%");
                    var reader = cmd.ExecuteReader();

                    var journals = new List<Journal>();
                    while (reader.Read())
                    {
                        journals.Add(new Journal()
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
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName")
                            },
                        });
                    }

                    reader.Close();

                    return journals;
                }
            }
        }

        public List<Journal> SearchByDate(DateTime searchDate, bool sortDescending)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = @"
                    SELECT j.Id, j.UserId, j.Title, j.Content, j.Gratitude, j.Intention, 
                           j.CategoryId, j.IsApproved, j.CreationDate,
                           c.Name
                    FROM Journal j
                    INNER JOIN Category c ON j.CategoryId = c.Id
                    WHERE j.CreationDate >= @Criterion";

                    if (sortDescending)
                    {
                        sql += " ORDER BY j.CreationDate DESC";
                    }
                    else
                    {
                        sql += " ORDER BY j.CreationDate";
                    }

                    cmd.CommandText = sql;
                    DbUtils.AddParameter(cmd, "@Criterion", searchDate);
                    var reader = cmd.ExecuteReader();

                    var journals = new List<Journal>();
                    while (reader.Read())
                    {
                        journals.Add(new Journal()
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
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName")
                            
                            },
                        });
                    }

                    reader.Close();

                    return journals;
                }
            }
        }*/
