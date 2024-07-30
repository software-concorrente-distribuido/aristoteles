namespace VoterAuthenticationAPI.Models.DTOs
{
    public class BlockChainConfig
    {
        public string Url { get; set; } = "http://127.0.0.1:8545";
        public string ContractAddress { get; set; } = "0xa819B043eb55883bc444350BD6FcB46a8af3711e";
        public decimal DefaultAmountFund { get; set; } = 0.5m;
        public string[] FunderAddresses { get; set; } = new string[]
        {
            "0x5322a18E39CD52a62d102e25556A8EF0655De44E",
            "0x50d543E92F381a855B0560f818A59eB14d12fEfC"
        };
        public string Password { get; set; } = "admin";
        public string ContractAbiPath { get; set; } = "C:\\Users\\leona\\Desktop\\Aristoteles\\aristoteles\\src\\blockchain\\src\\dapp\\build\\contracts_Voting_sol_Voting.abi";
    }
}
