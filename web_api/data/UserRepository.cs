using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using web_api._helpers;
using web_api.models;

namespace web_api.data
{
    public class UserRepository : IUserRepository
    {
        private dataContext _context;
        public UserRepository(dataContext context)
        {
            _context = context;
        }

        public async Task<User> GetUser(int id)
        {
            var result = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return result;
        }
        
        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
           
            var users = _context.Users.OrderByDescending(u => u.Id).AsQueryable();
            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public void Delete<T>(T entity) where T : class
        {
             _context.Remove(entity);
        }

    }
}