using MemoryPrints.Models;
using MemoryPrints.Utils;

namespace MemoryPrints.Repositories
{
    public class JournalEntryKidProfilesLinkRepository: BaseRepository
    {
        public JournalEntryKidProfilesLinkRepository(IConfiguration config) : base(config) { }
        public List<JournalEntryKidProfiles> GetJournalEntryKidProfilesByJournalId(int journalId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, JournalId, ChildUserId
                FROM JournalEntryKidProfiles
                WHERE JournalId = @JournalId";

                    cmd.Parameters.AddWithValue("@JournalId", journalId);
                    var reader = cmd.ExecuteReader();

                    var journalEntryKidProfiles = new List<JournalEntryKidProfiles>();
                    while (reader.Read())
                    {
                        journalEntryKidProfiles.Add(new JournalEntryKidProfiles()
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
        public List<JournalEntryKidProfiles> GetJournalEntryKidProfilesByChildUserId(int childUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, JournalId, ChildUserId
                FROM JournalEntryKidProfiles
                WHERE ChildUserId = @ChildUserId";

                    cmd.Parameters.AddWithValue("@ChildUserId", childUserId);
                    var reader = cmd.ExecuteReader();

                    var journalEntryKidProfiles = new List<JournalEntryKidProfiles>();
                    while (reader.Read())
                    {
                        journalEntryKidProfiles.Add(new JournalEntryKidProfiles()
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
                    cmd.CommandText = "DELETE FROM JournalEntryKidProfiles WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void AddJournalEntryKidProfile(JournalEntryKidProfiles journalEntryKidProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO JournalEntryKidProfiles (JournalId, ChildUserId)
                OUTPUT INSERTED.Id
                VALUES (@JournalId, @ChildUserId)";

                    cmd.Parameters.AddWithValue("@JournalId", journalEntryKidProfile.JournalId);
                    cmd.Parameters.AddWithValue("@ChildUserId", journalEntryKidProfile.ChildUserId);

                    journalEntryKidProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

    }
}
