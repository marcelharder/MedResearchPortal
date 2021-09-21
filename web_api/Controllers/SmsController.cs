using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using web_api._sms;
using web_api.models;

namespace web_api.Controllers
{
    [Route("api/[controller]")]

    [Authorize]
    public class SmsController : ControllerBase
    {

        private ISMS _sms;
        public SmsController(ISMS sms)
        {
            _sms = sms;
        }
        // GET api/values
        [HttpPost("{id}")]
        public async Task<IActionResult> PostSMS(int id, [FromBody] smsModel em)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
            //send email to the ClickAtell
            try { await Task.Run(() => { _sms.sendSMS(em); }); }
            catch (Exception e) { Console.Write(e); }
            var help = @"{'result':'SmS sent ...'}";
            var details = JObject.Parse(help);
            return Ok(details);
        }
         [HttpPost]
        public async Task<IActionResult> PostSMSByAnyUser(int id, [FromBody] smsModel em)
        {
             //send email to the ClickAtell
            try { await Task.Run(() => { _sms.sendSMS(em); }); }
            catch (Exception e) { Console.Write(e); }
            var help = @"{'result':'SmS sent ...'}";
            var details = JObject.Parse(help);
            return Ok(details);
        }
    }
}