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
using AutoMapper;

namespace web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserRepository _rep;
        private IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public UsersController(IUserRepository rep, IOptions<CloudinarySettings> cloudinaryConfig, IMapper mapper)
        {
            _rep = rep;
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;


            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(acc);

        }

        public async Task<IActionResult> Get([FromQuery] UserParams userParams)
        {
            var values = await _rep.GetUsers(userParams);
            var l = new List<UserForReturnDto>();
            foreach (User us in values) { l.Add(_mapper.Map<UserForReturnDto>(us)); }

            Response.AddPagination(values.Currentpage, values.PageSize, values.TotalCount, values.TotalPages);
            return Ok(l);
        }

        // GET api/values/5
        [HttpGet("{id}", Name = "GetUser")]
        public async Task<ActionResult> GetUser(int id)
        {
           
            var user = await _rep.GetUser(id);
            return Ok(_mapper.Map<UserForReturnDto>(user));
        }

        [HttpGet("NameOfResearch/{userId}")]
        public async Task<IActionResult> findResearchName(int userId){
            var result = "testName";
          return Ok(result);
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