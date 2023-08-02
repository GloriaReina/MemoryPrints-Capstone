using MemoryPrints.Models;
using MemoryPrints.Utils;

namespace MemoryPrints.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }


        public List<Category> GetAll() 
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, Name FROM Category
                      ORDER BY Name";

                    var reader = cmd.ExecuteReader();

                    var categories = new List<Category>();
                    while (reader.Read()) //tells it to keep reading data until the end of data.
                    {
                        categories.Add(new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")

                        }
                        );
                    }

                    reader.Close();
                    return categories;
                }
            }
        }

        public Category GetById(int id) //gets just a single category instead of ALL the categories. 
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, Name FROM Category
                      WHERE Id = @Id";


                    DbUtils.AddParameter(cmd, "@Id", id);

                    //var reader = cmd.ExecuteReader();

                    Category category = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        category = new Category()
                        {
                            Id = id,
                            Name = DbUtils.GetString(reader, "Name")


                        };

                    };


                    reader.Close();

                    return category;
                }
            }
        }



        public void Add(Category category) //saves a NEW category. Like an insert. 
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Category ( Name)
                        OUTPUT INSERTED.ID
                        VALUES ( @Name)";


                    DbUtils.AddParameter(cmd, "@Name", category.Name);


                    category.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = "DELETE FROM Category WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Update(Category category) //edit a category that already exists
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Category
                           SET Name = @Name
                           WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", category.Name);
                    DbUtils.AddParameter(cmd, "@Id", category.Id);


                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
