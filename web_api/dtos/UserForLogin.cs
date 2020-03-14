using System.ComponentModel.DataAnnotations;

namespace web_api.dtos
{
    public class UserForLogin
    {
             public string username { get; set; }
             
             public string password { get; set; }  
    }
}