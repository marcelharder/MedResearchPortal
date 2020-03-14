using System.Security.Claims;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using web_api._code;
using web_api.data;
using web_api.dtos;
using web_api.models;
using Microsoft.Extensions.Options;
using CloudinaryDotNet;
using web_api._helpers;
using CloudinaryDotNet.Actions;

namespace web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserRepository _rep;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public UsersController(IUserRepository rep, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _rep = rep;
            _cloudinaryConfig = cloudinaryConfig;


            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(acc);

        }

        public async Task<IActionResult> Get([FromQuery]UserParams userParams)
        {
            var mapper = new ServiceMapper();
            var values = await _rep.GetUsers(userParams);
            var l = new List<UserForReturnDto>();
            foreach (User us in values) { l.Add(mapper.mapToReturnDto(us)); }

            Response.AddPagination(values.Currentpage, values.PageSize, values.TotalCount, values.TotalPages);
            return Ok(l);
        }

        // GET api/values/5
        [HttpGet("{id}", Name = "GetUser")]
        public async Task<ActionResult> GetUser(int id)
        {
            var mapper = new ServiceMapper();
            var user = await _rep.GetUser(id);
            return Ok(mapper.mapToReturnDto(user));
        }

        // GET api/put/5
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(UserForUpdateDto up, int id)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
            var mapper = new ServiceMapper();
            var user = await _rep.GetUser(id);
            var updateduser = mapper.mapToUserFromUpdateDto(up, user);
            if (await _rep.SaveAll()) return NoContent();
            throw new Exception($"Updating user {id} failed on save");

        }
   [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
             var user = await _rep.GetUser(id);
             _rep.Delete(user);
             if (await _rep.SaveAll()) return Ok("User deleted ...");
            return BadRequest("Deleting failed ...");

        }


    }
}