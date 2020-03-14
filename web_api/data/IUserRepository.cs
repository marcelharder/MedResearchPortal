using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using web_api._helpers;
using web_api.models;

namespace web_api.data
{
    public interface IUserRepository
    {
      
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id);
        Task<bool> SaveAll();  
        void Delete<T>(T entity) where T: class;

    }
}