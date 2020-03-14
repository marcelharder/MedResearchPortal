using System;
using System.ComponentModel.DataAnnotations;

namespace web_api.models
{
    public class smsModel
    { public int Id { get; set; }
        public string From { get; set; }
        [Required]
        public string To { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        public string Body { get; set; }
      

       
    }
}