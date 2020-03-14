namespace web_api.dtos
{
    public class UserForUpdateDto
    {
        public int Id { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string City { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string Country { get; set; }
        public string Interests { get; set; }

    }
}