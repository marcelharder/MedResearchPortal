using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using web_api.models;

namespace web_api.seed{

public class Seed{

public static async Task SeedUsers(dataContext context)
        {
            if(await context.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("config/userSeed.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);
            foreach (var user in users)
            {
                using (var hmac = new System.Security.Cryptography.HMACSHA1())
            {
                user.Username = user.Username.ToLower();
                user.PasswordSalt = hmac.Key;
                user.PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("password"));
            }
                context.Users.Add(user);
            }
            await context.SaveChangesAsync();

        }
}}