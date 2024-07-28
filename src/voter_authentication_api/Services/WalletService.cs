using VoterAuthenticationAPI.Models;
using Nethereum.Signer;

namespace VoterAuthenticationAPI.Common
{
    public class WalletService  
    {
        public static Wallet GenerateWallet()
        {
            try
            {
                EthECKey key = EthECKey.GenerateKey();
                byte[] privateKey = key.GetPrivateKeyAsBytes();
                string address = key.GetPublicAddress();

                return new Wallet()
                {
                    Address = address,
                    PrivateKey = privateKey,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
