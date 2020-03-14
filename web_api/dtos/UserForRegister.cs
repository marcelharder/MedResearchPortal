using System.ComponentModel.DataAnnotations;

namespace web_api.dtos
{
    public class UserForRegister
    {
        [Required]
        public string username { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage="Password should be minimum 4 and max 8 char")]
        public string password { get; set; }
    }
}