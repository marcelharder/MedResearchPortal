

using web_api.models;

namespace web_api._email

{
    public interface IEmail
    {
         void sendEmail(EmailFormModel em);
    }
}