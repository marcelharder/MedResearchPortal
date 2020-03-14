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
        public UserForReturnDto mapToReturnDto(User user)
        {


            var d = new DateTime();
            var startDate = new DateTime(0);
            var help = new UserForReturnDto();
            help.id = user.Id;
            help.username = user.Username;
            d = user.DateOfBirth;
            if (d != startDate) { help.age = d.CalculateAge(); } else help.age = 0;
            help.role = user.Role;
            help.created = user.Created;
            help.gender = user.Gender;
            help.dateOfBirth = user.DateOfBirth;
            help.phone = user.Mobile;
            help.email = user.Email;
            help.city = user.City;
            help.country = user.Country;
            help.photoUrl = user.PhotoUrl;
            help.lastActive = user.LastActive;


            return help;

        }





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