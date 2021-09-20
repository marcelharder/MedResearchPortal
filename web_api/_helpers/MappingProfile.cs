using AutoMapper;
using web_api.dtos;
using web_api.models;

public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserForReturnDto>(); //Map from Developer Object to DeveloperDTO Object
        }
    }