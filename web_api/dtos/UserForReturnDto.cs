using System;
using web_api.models;

namespace web_api.dtos
{
    public class UserForReturnDto
    {
        public int id { get; set; }
        public int age { get; set; }
        public string username { get; set; }
        public string role { get; set; }
        public string gender { get; set; }
        public DateTime dateOfBirth { get; set; }
        public DateTime lastActive { get; set; }
        public DateTime created { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string city { get; set; }
        public string country { get; set; }
        public string photoUrl { get; set; }
     
    }
}