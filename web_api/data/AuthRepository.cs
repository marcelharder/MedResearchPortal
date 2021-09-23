using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using web_api.models;

namespace web_api.data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly dataContext _context;
        public AuthRepository(dataContext context)
        {
            _context = context;
        }
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == username);
            if (user == null) return null;
            if (!VerifyPassWordHash(password, user.PasswordHash, user.PasswordSalt)) return null;
            return user;
        }

        private bool VerifyPassWordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA1(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < password.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
            };
            return true;
        }

        public async Task<User> Register(User user, string password)
        {

            await Task.Run(() =>
            {
                DateTime now = DateTime.UtcNow;
                byte[] passwordHash, passwordSalt;
                CreatePassWordHash(password, out passwordHash, out passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.Role = "normal";
                user.PhotoUrl = "https://res.cloudinary.com/marcelcloud/image/upload/v1559818775/user.png.jpg";
                user.Created = now;

            });

            return user;
        }

        private void CreatePassWordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA1())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            };
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(x => x.Username == username)) return true;
            return false;
        }
    }
}