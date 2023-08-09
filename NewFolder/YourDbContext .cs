using MemoryPrints.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;

/*when you delete a Journal record, Entity Framework Core will automatically attempt to delete the associated JournalReaction records due to the cascade delete behavior. This should prevent the error: 
 ---The DELETE statement conflicted with the REFERENCE constraint "FK_Reaction_Journal". The conflict occurred in database "MemoryPrints", table "dbo.JournalReaction", column 'JournalId'---*/

namespace MemoryPrints.NewFolder
{
    public class YourDbContext : DbContext
    {
        public DbSet<Journal> Journals { get; set; }
        public DbSet<JournalReaction> JournalReactions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string connectionString = "server=localhost\\SQLExpress;database=MemoryPrints;integrated security=true;Trusted_Connection=True;TrustServerCertificate=True;";
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Entity configurations...
        }
    }
}
