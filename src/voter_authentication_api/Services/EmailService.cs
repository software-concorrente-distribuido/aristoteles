using System.Net.Mail;
using System.Net;
using System.Text;

namespace VoterAuthenticationAPI.Common
{
    public class EmailService : IDisposable
    {
        private SmtpClient _client;
        public StringBuilder _body;

        public EmailService()
        {
            _body = new StringBuilder();
            _client = new SmtpClient();
        }

        public void Dispose()
        {
            _body.Clear();
            _client.Dispose();
        }

        public async Task<bool> SendEmailAsync(string receiverEmail, string subject)
        {
            try
            {
                MailMessage mail = new MailMessage();
                mail.To.Add(receiverEmail);
                mail.From = new MailAddress("votacaoblockchain@gmail.com", "Votação Blockchain", Encoding.UTF8);
                mail.Subject = subject;
                mail.Body = _body.ToString();
                mail.IsBodyHtml = true;
                mail.Priority = MailPriority.High;
                _client.Host = "smtp.gmail.com";
                _client.Port = 587;
                _client.UseDefaultCredentials = false;
                _client.Credentials = new NetworkCredential("votacaoblockchain@gmail.com", "akmo bidk bjsu fsof");
                _client.EnableSsl = true;
                await _client.SendMailAsync(mail);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
