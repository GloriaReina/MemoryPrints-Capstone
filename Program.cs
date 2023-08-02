using MemoryPrints.Repositories;

namespace MemoryPrints
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddTransient<ICategoryRepository, CategoryRepository>();
            builder.Services.AddTransient<IUserRepository, UserRepository>();
            builder.Services.AddTransient<IUserRoleRepository, UserRoleRepository>();
            builder.Services.AddTransient<IUserToKidUserProfilesLinkRepository, UserToKidUserProfilesLinkRepository>();
            builder.Services.AddTransient<ICommentRepository, CommentRepository>();
            builder.Services.AddTransient<IJournalRepository, JournalRepository>();
            builder.Services.AddTransient<IJournalReactionRepository, JournalReactionRepository>();
            builder.Services.AddTransient<IJournalEntryChildProfilesLinkRepository, JournalEntryChildProfilesLinkRepository>();
           

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();

                app.UseCors(options =>
                {
                    options.AllowAnyOrigin();
                    options.AllowAnyMethod();
                    options.AllowAnyHeader();
                });
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}