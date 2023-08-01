using MemoryPrints.Models;
using MemoryPrints.Utils;

namespace MemoryPrints.Repositories
{
    public class JournalReactionRepository : BaseRepository, IJournalReactionRepository
    {
        public JournalReactionRepository(IConfiguration config) : base(config) { }

        public List<JournalReaction> GetJournalReactionsByJournalId(int journalId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, JournalId, UserId, EmojiCode, EmojiName, CreationDate
                FROM JournalReaction
                WHERE JournalId = @JournalId";

                    DbUtils.AddParameter(cmd, "@JournalId", journalId);

                    var reader = cmd.ExecuteReader();
                    var journalReactions = new List<JournalReaction>();

                    while (reader.Read())
                    {
                        journalReactions.Add(new JournalReaction()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            JournalId = DbUtils.GetInt(reader, "JournalId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            EmojiCode = DbUtils.GetString(reader, "EmojiCode"),
                            EmojiName = DbUtils.GetString(reader, "EmojiName"),
                            CreationDate = DbUtils.GetDateTime(reader, "CreationDate")
                        });
                    }

                    reader.Close();
                    return journalReactions;
                }
            }
        }
        public List<JournalReaction> GetJournalReactionsByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, JournalId, UserId, EmojiCode, EmojiName, CreationDate
                FROM JournalReaction
                WHERE UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();
                    var journalReactions = new List<JournalReaction>();

                    while (reader.Read())
                    {
                        journalReactions.Add(new JournalReaction()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            JournalId = DbUtils.GetInt(reader, "JournalId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            EmojiCode = DbUtils.GetString(reader, "EmojiCode"),
                            EmojiName = DbUtils.GetString(reader, "EmojiName"),
                            CreationDate = DbUtils.GetDateTime(reader, "CreationDate")
                        });
                    }

                    reader.Close();
                    return journalReactions;
                }
            }
        }

        public void AddJournalReaction(JournalReaction journalReaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO JournalReaction (JournalId, UserId, EmojiCode, EmojiName, CreationDate)
                VALUES (@JournalId, @UserId, @EmojiCode, @EmojiName, @CreationDate)";

                    DbUtils.AddParameter(cmd, "@JournalId", journalReaction.JournalId);
                    DbUtils.AddParameter(cmd, "@UserId", journalReaction.UserId);
                    DbUtils.AddParameter(cmd, "@EmojiCode", journalReaction.EmojiCode);
                    DbUtils.AddParameter(cmd, "@EmojiName", journalReaction.EmojiName);
                    DbUtils.AddParameter(cmd, "@CreationDate", journalReaction.CreationDate);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void UpdateJournalReaction(JournalReaction journalReaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                UPDATE JournalReaction
                SET JournalId = @JournalId,
                    UserId = @UserId,
                    EmojiCode = @EmojiCode,
                    EmojiName = @EmojiName,
                    CreationDate = @CreationDate
                WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@JournalId", journalReaction.JournalId);
                    DbUtils.AddParameter(cmd, "@UserId", journalReaction.UserId);
                    DbUtils.AddParameter(cmd, "@EmojiCode", journalReaction.EmojiCode);
                    DbUtils.AddParameter(cmd, "@EmojiName", journalReaction.EmojiName);
                    DbUtils.AddParameter(cmd, "@CreationDate", journalReaction.CreationDate);
                    DbUtils.AddParameter(cmd, "@Id", journalReaction.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteJournalReaction(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM JournalReaction WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


        /*method executes a SQL query that returns the count of rows where the EmojiCode matches the given emojiCode.*/
        public int GetEmojiCountByEmojiCode(string emojiCode)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT COUNT(*) AS EmojiCount
                FROM JournalReaction
                WHERE EmojiCode = @EmojiCode";

                    cmd.Parameters.AddWithValue("@EmojiCode", emojiCode);

                    object result = cmd.ExecuteScalar();
                    if (result != null && int.TryParse(result.ToString(), out int count))
                    {
                        return count;
                    }

                    return 0;
                }
            }
        }

    }
}
