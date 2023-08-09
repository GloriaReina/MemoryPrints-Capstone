using MemoryPrints.Models;
using MemoryPrints.Utils;

namespace MemoryPrints.Repositories
{
    public class JournalEntryChildProfilesLinkRepository : BaseRepository, IJournalEntryChildProfilesLinkRepository
    {
        public JournalEntryChildProfilesLinkRepository(IConfiguration config) : base(config) { }
        public List<JournalEntryChildProfiles> GetJournalEntryKidProfilesByJournalId(int journalId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT je.Id, je.JournalId, je.ChildUserId, j.Title, j.Content, j.Gratitude, j.Intention, j.CreationDate, j.IsApproved
                FROM JournalEntryChildProfiles je
                LEFT JOIN journal j on j.Id = je.JournalId
                WHERE JournalId = @JournalId";

                    cmd.Parameters.AddWithValue("@JournalId", journalId);
                    var reader = cmd.ExecuteReader();

                    var journalEntryKidProfiles = new List<JournalEntryChildProfiles>();
                    while (reader.Read())
                    {
                        journalEntryKidProfiles.Add(new JournalEntryChildProfiles()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            JournalId = DbUtils.GetInt(reader, "JournalId"),
                            ChildUserId = DbUtils.GetInt(reader, "ChildUserId"),

                            Journal = new Journal()
                            {
                                Title = DbUtils.GetString(reader, "Title"),
                                Content = DbUtils.GetString(reader, "Content"),
                                Gratitude = DbUtils.GetString(reader, "Gratitude"),
                                Intention = DbUtils.GetString(reader, "Intention"),
                                CreationDate = DbUtils.GetDateTime(reader, "CreationDate")
                            }

                        });
                    }

                    reader.Close();
                    return journalEntryKidProfiles;
                }
            }
        }
        public List<JournalEntryChildProfiles> GetJournalEntryKidProfilesByChildUserId(int childUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT je.Id, je.JournalId, je.ChildUserId, j.Title, j.Content, j.Gratitude, j.Intention, j.CreationDate, j.IsApproved
                FROM JournalEntryChildProfiles je
                LEFT JOIN journal j on j.Id = je.JournalId
                WHERE ChildUserId = @ChildUserId";

                    cmd.Parameters.AddWithValue("@ChildUserId", childUserId);
                    var reader = cmd.ExecuteReader();

                    var journalEntryKidProfiles = new List<JournalEntryChildProfiles>();
                    while (reader.Read())
                    {
                        journalEntryKidProfiles.Add(new JournalEntryChildProfiles()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            JournalId = DbUtils.GetInt(reader, "JournalId"),
                            ChildUserId = DbUtils.GetInt(reader, "ChildUserId"),


                            Journal = new Journal()
                            {
                                Title = DbUtils.GetString(reader, "Title"),
                                Content = DbUtils.GetString(reader, "Content"),
                                Gratitude = DbUtils.GetString(reader, "Gratitude"),
                                Intention = DbUtils.GetString(reader, "Intention"),
                                CreationDate = DbUtils.GetDateTime(reader, "CreationDate")
                            }
                        });
                    }

                    reader.Close();
                    return journalEntryKidProfiles;
                }
            }
        }
        public void DeleteJournalEntryKidProfile(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM JournalEntryChildProfiles WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void AddJournalEntryKidProfile(JournalEntryChildProfiles journalEntryChildProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO JournalEntryChildProfiles (JournalId, ChildUserId)
                OUTPUT INSERTED.Id
                VALUES (@JournalId, @ChildUserId)";

                    cmd.Parameters.AddWithValue("@JournalId", journalEntryChildProfile.JournalId);
                    cmd.Parameters.AddWithValue("@ChildUserId", journalEntryChildProfile.ChildUserId);

                    journalEntryChildProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(JournalEntryChildProfiles journalEntryChildProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                UPDATE JournalEntryChildProfiles
                SET JournalId = @JournalId,
                    ChildUserId = @ChildUserId
                WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@JournalId", journalEntryChildProfile.JournalId);
                    cmd.Parameters.AddWithValue("@ChildUserId", journalEntryChildProfile.ChildUserId);
                    cmd.Parameters.AddWithValue("@Id", journalEntryChildProfile.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
