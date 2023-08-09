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
        public DbSet<Comment> Comments { get; set; } 
        public DbSet<JournalEntryChildProfiles> JournalEntryChildProfiles { get; set; } 

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

            // Configure cascade delete for Comment when a Journal is deleted
            modelBuilder.Entity<Journal>()
             .HasMany(Journal => Journal.Comments)
             .WithOne(Comment => Comment.Journal)
             .HasForeignKey(Comment => Comment.JournalId)
             .OnDelete(DeleteBehavior.Cascade);


            // Configure cascade delete for JournalEntryChildProfiles when a Journal is deleted
            modelBuilder.Entity<Journal>()
                .HasMany(Journal => Journal.JournalEntryChildProfiles)
                .WithOne(Profile => Profile.Journal)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure cascade delete for JournalReaction when a Journal is deleted
            modelBuilder.Entity<Journal>()
                .HasMany(Journal => Journal.JournalReactions)
                .WithOne(JournalReaction => JournalReaction.Journal)
                .HasForeignKey(JournalReaction => JournalReaction.JournalId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
