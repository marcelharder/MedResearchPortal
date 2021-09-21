using web_api.models;

namespace web_api._sms
{
    public interface ISMS
    {
        string sendSMS(smsModel sms);
    }
}