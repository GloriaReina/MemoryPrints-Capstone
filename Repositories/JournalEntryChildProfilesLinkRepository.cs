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
                SELECT Id, JournalId, ChildUserId
                FROM JournalEntryChildProfiles
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
                            ChildUserId = DbUtils.GetInt(reader, "ChildUserId")
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
                SELECT Id, JournalId, ChildUserId
                FROM JournalEntryChildProfiles
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
                            ChildUserId = DbUtils.GetInt(reader, "ChildUserId")
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

    }
}
