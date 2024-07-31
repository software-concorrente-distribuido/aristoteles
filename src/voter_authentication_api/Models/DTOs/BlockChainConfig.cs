namespace VoterAuthenticationAPI.Models.DTOs
{
    public class BlockChainConfig
    {
        public string Url { get; set; } = "http://127.0.0.1:8545";
        public string ContractAddress { get; set; } = "0xe3c2796d683553F97A1e8201301dc5f8cf8881A9";
        public decimal DefaultAmountFund { get; set; } = 10;
        public string[] FunderAddresses { get; set; } = new string[]
        {
            "0x656Bd99b6ce14d70ed56e63dC5003DF44631F916",
            "0x4b03C7bDbFaDDC2779d0f914624D7637789d83c0"
        };
        public string Password { get; set; } = "admin";
        public string ContractAbiPath { get; set; } = "C:\\Users\\leona\\Desktop\\Aristoteles\\aristoteles\\src\\blockchain\\src\\dapp\\build\\contracts_Voting_sol_Voting.abi";
    }
}
