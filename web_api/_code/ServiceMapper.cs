using System;
using web_api.dtos;
using web_api.models;
using web_api._helpers;
using System.Collections.Generic;
using System.Linq;

namespace web_api._code
{
    public class ServiceMapper
    {
        
        public User mapToUserFromUpdateDto(UserForUpdateDto test, User user)
        {
            user.Introduction = test.Introduction;
            user.Interests = test.Interests;
            user.Mobile = test.phone;
            user.Email = test.email;
            user.LookingFor = test.LookingFor;
            user.City = test.City;
            user.Country = test.Country;
            user.LastActive = DateTime.UtcNow;
            return user;
        }







    }
}