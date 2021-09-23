using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using web_api.data;
using web_api.dtos;
using web_api.models;

namespace web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IUserRepository _user;
         private IMapper _mapper;
        public AuthController(IAuthRepository repo, IConfiguration config, IUserRepository user, IMapper mapper)
        {
            _config = config;
            _mapper = mapper;
            _repo = repo;
            _user = user;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegister ufr)
        {
            ufr.username = ufr.username.ToLower();
            if (await _repo.UserExists(ufr.username)) { return BadRequest("User already exists ..."); }
            var UserToCreate = new User { Username = ufr.username };
            
            var createdUser = await _repo.Register(UserToCreate, ufr.password);

            _user.AddUser(createdUser);
            
            if(await _user.SaveAll()){
                var reUser = _mapper.Map<UserForReturnDto>(createdUser);
                return CreatedAtRoute("GetUser", new { id = reUser.Id }, reUser);
            }
            return BadRequest();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLogin ufl)
        {
        var userFromRepo = await _repo.Login(ufl.username.ToLower(), ufl.password);
        if (userFromRepo == null) return Unauthorized();
        // generate a token
            var claims = new[] {
        new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
        new Claim(ClaimTypes.Name, userFromRepo.Username),
        new Claim(ClaimTypes.Role, userFromRepo.Role)
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
        var tokendescriptor = new SecurityTokenDescriptor{
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(1),
            SigningCredentials = creds
        };
        var tokenhandler = new JwtSecurityTokenHandler();
        var token = tokenhandler.CreateToken(tokendescriptor);
        return Ok(new{ token = tokenhandler.WriteToken(token)}
        );
          
        }

    }
}