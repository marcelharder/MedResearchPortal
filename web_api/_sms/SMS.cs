using System;
using System.IO;
using System.Net;
using web_api.models;

namespace web_api._sms
{
    public class SMS : ISMS
    {
        smsModel _sms;
        public SMS()
        {
            
        }
        public string sendSMS(smsModel sms)
        {
            _sms = sms;
            var result = "";
            try
            {
                WebClient client = new WebClient();
                // Add a user agent header in case the requested URI contains a query.
                client.Headers.Add("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; .NET CLR 1.0.3705;)");
                client.QueryString.Add("user", "m_harder88");
                client.QueryString.Add("password", "AYaaDGUSTPDcaI");
                client.QueryString.Add("api_id", "3582069");
                client.QueryString.Add("to", _sms.PhoneNumber);
                client.QueryString.Add("text", _sms.Body);
                string baseurl = "http://api.clickatell.com/http/sendmsg";
                Stream data = client.OpenRead(baseurl);
                StreamReader reader = new StreamReader(data);
                string s = reader.ReadToEnd();
                data.Close();
                reader.Close();
                return s;

            }
            catch (Exception e)
            {
                result = "Something went wrong with sending the SMS";
                Console.WriteLine(e.InnerException);
            }
            result = "Successfully sent the SMS";
            return result;

        }
    }
}