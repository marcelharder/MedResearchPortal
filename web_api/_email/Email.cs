using System;
using System.Net.Mail;
using web_api.models;

namespace web_api._email
{
    public class Email : IEmail
    {
        public void sendEmail(EmailFormModel model)
        {
            try
            {
                MailMessage mail = new MailMessage();
                mail.To.Add(model.To);
                mail.From = new MailAddress("postmaster@cardiacsoftwaredevelopers.com");
                mail.Subject = model.Subject;
                string Body = model.Body;
                mail.Body = Body;
                mail.IsBodyHtml = true;

                // Send it!
                SmtpClient client = new SmtpClient();
                client.Port = 587;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new System.Net.NetworkCredential("postmaster@cardiacsoftwaredevelopers.com", "vereniging");
                client.Host = "smtp.mailgun.org";
                client.Send(mail);
                

            }
            catch (Exception e) { Console.WriteLine(e.InnerException); }


        }
    }
}