using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using web_api._email;
using web_api.models;

namespace web_api.Controllers
{
    [Route("api/[controller]")]

    [Authorize]
    public class EmailController : ControllerBase
    {
        private IEmail _mail;
        public EmailController(IEmail mail)
        {
            _mail = mail;
        }
        // GET api/values
        [HttpPost("{id}")]
        public async Task<IActionResult> PostMail(int id, [FromBody] EmailFormModel em)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
            //send email to the Mailgun API
            await Task.Run(() => { _mail.sendEmail(em); });
            var result = @"{'result':'Email sent'}";
            var details = JObject.Parse(result);


            return Ok(details);
        }

        [HttpPost]
        public async Task<IActionResult> PostMailByAnyUser([FromBody] EmailFormModel em)
        {
            //send email to the Mailgun API
            await Task.Run(() => { _mail.sendEmail(em); });
            var result = @"{'result':'Email sent'}";
            var details = JObject.Parse(result);
            return Ok(details);
        }



    }
}