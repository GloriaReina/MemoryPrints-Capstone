using MemoryPrints.Models;
using MemoryPrints.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting;

namespace MemoryPrints.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }

        public List<Comment> GetCommentsByJournalId(int journalId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT co.Id as CommentId, 
                co.Content,
                co.JournalId,
                j.Title,
                co.UserId,
                co.CreationDate, 
                u.DisplayName,
                u.Id as UserId
                FROM Comment co
                JOIN [User] u ON co.UserId = u.Id
                JOIN Journal j ON j.Id = co.JournalId
                WHERE co.JournalId = @journalId";

                    DbUtils.AddParameter(cmd, "@journalId", journalId);

                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();

                    while (reader.Read())
                    {
                        comments.Add(new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "CommentId"),
                            Content = DbUtils.GetString(reader, "Content"),
                            JournalId = DbUtils.GetInt(reader, "JournalId"),
                            CreationDate = DbUtils.GetDateTime(reader, "CreationDate"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            //Journal = new Journal()
                            //{

                            //    Title = DbUtils.GetString(reader, "Title"),
                            //},
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            }
                        });

                    }
                    reader.Close();

                    return comments;

                }

            }
        }


        //public void Add(int journalId,Comment comment)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                INSERT INTO Comment (JournalId, UserId, Content, CreationDate)
        //                OUTPUT INSERTED.Id
        //                VALUES (@JournalId, @UserId, @Content, @CreationDate)";

        //            cmd.Parameters.AddWithValue("@JournalId", journalId);
        //            cmd.Parameters.AddWithValue("@UserId", comment.UserId);
        //            cmd.Parameters.AddWithValue("@Content", comment.Content);
        //            cmd.Parameters.AddWithValue("@CreationDate", comment.CreationDate); 



        //            comment.Id = (int)cmd.ExecuteScalar();
        //        }
        //    }
        //}


        public void Add(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Comment (JournalId, UserId, Content, CreationDate)
                        OUTPUT INSERTED.Id
                        VALUES (@JournalId, @UserId, @Content, @CreationDate)";

                    cmd.Parameters.AddWithValue("@JournalId", comment.JournalId);
                    cmd.Parameters.AddWithValue("@UserId", comment.UserId);
                    cmd.Parameters.AddWithValue("@Content", comment.Content);
                    cmd.Parameters.AddWithValue("@CreationDate", comment.CreationDate);

                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(int commentId, Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Comment
                        SET Content = @Content
                        WHERE Id = @commentId";

                    cmd.Parameters.AddWithValue("@Content", comment.Content);
                    cmd.Parameters.AddWithValue("@commentId", commentId);

                    cmd.ExecuteNonQuery();
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
                    cmd.CommandText = "DELETE FROM Comment WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
