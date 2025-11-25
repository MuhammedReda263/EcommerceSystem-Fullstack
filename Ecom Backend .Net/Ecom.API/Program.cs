using Ecom.API.Mapping;
using Ecom.API.Middlewares;
using Ecom.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Ecom.Core.Entities;
using Ecom.Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Ecom.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngular", policy =>
                {
                    policy.WithOrigins("http://localhost:4200")
                          .AllowCredentials() //Enable the browser to send Cookies ,Authorization: Bearer token
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            // Add services to the container.
            builder.Services.AddControllers();

            // Register AutoMapper
            builder.Services.AddAutoMapper(typeof(Program).Assembly);
            builder.Services.AddMemoryCache();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddInfrastructureServices(builder.Configuration);

            // Register Identity (uses AppDbContext registered in infrastructure)
            builder.Services.AddIdentity<AppUser, IdentityRole>(options => { })
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

            builder.Services.AddScoped<GlobalExceptionMiddleware>();

            builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Token"));

            // Configure JWT Authentication
            var jwtSettings = builder.Configuration.GetSection("Token");
            var secret = jwtSettings["Secret"];
            var issuer = jwtSettings["Issuer"];
            var key = Encoding.ASCII.GetBytes(secret!);

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = issuer,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };

                // Support reading token from cookie named "token" so both Authorization header and cookie work
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        if (string.IsNullOrEmpty(context.Token))
                        {
                            var token = context.Request.Cookies["token"];
                            if (!string.IsNullOrEmpty(token))
                            {
                                context.Token = token;
                            }
                        }
                        return Task.CompletedTask;
                    }
                };
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("AllowAngular");
            app.UseMiddleware<GlobalExceptionMiddleware>();

            app.UseStaticFiles();

            app.UseHttpsRedirection();

            // Enable authentication middleware (MUST come before authorization)
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
