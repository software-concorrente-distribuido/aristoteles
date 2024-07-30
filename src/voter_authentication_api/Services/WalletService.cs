using VoterAuthenticationAPI.Models;
using Nethereum.Signer;
using System;
using System.IO;
using System.Numerics;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using dotenv.net;
using Nethereum.Hex.HexTypes;
using Nethereum.Web3;
using Nethereum.Web3.Accounts.Managed;
using DocumentFormat.OpenXml.Wordprocessing;
using Nethereum.Web3.Accounts;
using Nethereum.RPC.Eth;
<<<<<<< HEAD
using Org.BouncyCastle.Utilities.Encoders;
=======
using VoterAuthenticationAPI.Models.DTOs;
>>>>>>> 43187ce2a356e718326f0c641c90a6ff16dc10cb

namespace VoterAuthenticationAPI.Common
{
    public class WalletService
    {
<<<<<<< HEAD
        private static readonly string url = "http://127.0.0.1:8545";
        private static readonly string contractAddress = "0xfcc6285764F77c1671a2DdB177587d893c44EF0D";
        private static readonly decimal DEFAULT_AMOUNT_FUND = 0.5m;
        private static readonly string[] funderAddresses = new string[]
        {
            "0x49aD6eD823fB54A66997Ba26c73a1ebCc90C7b82",
            "0x35b30d66C742b64a8cE690E6824De0aE25C1EDCA"
        };
        private static string password = "admin";
        private static Web3 web3 = new Web3(url);
        private static readonly SemaphoreSlim semaphore = new SemaphoreSlim(5);
=======
        private readonly BlockChainConfig _blockChainConfig;
        private readonly Web3 _web3;
        private static readonly SemaphoreSlim _semaphore = new SemaphoreSlim(5);

        // Injetar BlockChainConfig através do construtor
        public WalletService(BlockChainConfig blockChainConfig)
        {
            _blockChainConfig = blockChainConfig;
            _web3 = new Web3(_blockChainConfig.Url);
        }
>>>>>>> 43187ce2a356e718326f0c641c90a6ff16dc10cb

        public async Task<Wallet> GenerateWalletAsync()
        {
            try
            {
                var envVars = DotEnv.Read();

                var (newWalletAddress, newWalletPrivateKey) = await CreateNewWallet("password");

                var balance = await _web3.Eth.GetBalance.SendRequestAsync(newWalletAddress);

<<<<<<< HEAD
                var contractAbi = File.ReadAllText("/home/vitor/dev/aristoteles/src/blockchain/src/dapp/build/contracts_Voting_sol_Voting.abi");
                var contract = web3.Eth.GetContract(contractAbi, contractAddress);
=======
                var contractAbi = File.ReadAllText(_blockChainConfig.ContractAbiPath);
                var contract = _web3.Eth.GetContract(contractAbi, _blockChainConfig.ContractAddress);
>>>>>>> 43187ce2a356e718326f0c641c90a6ff16dc10cb

                return new Wallet()
                {
                    Address = newWalletAddress,
                    PrivateKey = newWalletPrivateKey,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private async Task<(string, string)> CreateNewWallet(string password)
        {
            return await FundNewWalletDecorator(async () =>
            {
                var ecKey = Nethereum.Signer.EthECKey.GenerateKey();
                var newWalletAddress = ecKey.GetPublicAddress();
                var newWalletPrivateKey = ecKey.GetPrivateKey();
                return (newWalletAddress, newWalletPrivateKey);
            });
        }

        public async Task<(string, string)> FundNewWalletDecorator(Func<Task<(string, string)>> func)
        {
            await _semaphore.WaitAsync();
            try
            {
                var (newWalletAddress, newWalletPrivateKey) = await func();

                var unlockAccountMethod = new Nethereum.RPC.Personal.PersonalUnlockAccount(_web3.Client);

                foreach (var address in _blockChainConfig.FunderAddresses)
                {
                    var unlockResult = await unlockAccountMethod.SendRequestAsync(address, _blockChainConfig.Password, 300);
                }

                var gasPrice = await _web3.Eth.GasPrice.SendRequestAsync();
                var gasLimit = await _web3.Eth.Transactions.EstimateGas.SendRequestAsync(new Nethereum.RPC.Eth.DTOs.CallInput
                {
                    To = newWalletAddress,
                    Value = new HexBigInteger(Web3.Convert.ToWei(_blockChainConfig.DefaultAmountFund)),
                    From = _blockChainConfig?.FunderAddresses?[0]
                });

                foreach (var address in _blockChainConfig.FunderAddresses)
                {
                    var account = new ManagedAccount(address, _blockChainConfig.Password);
                    var web3WithAccount = new Web3(account, _blockChainConfig.Url);

                    var transactionInput = new Nethereum.RPC.Eth.DTOs.TransactionInput
                    {
                        To = newWalletAddress,
                        Value = new HexBigInteger(Web3.Convert.ToWei(_blockChainConfig.DefaultAmountFund)),
                        Gas = gasLimit,
                        GasPrice = gasPrice,
                        From = address
                    };
<<<<<<< HEAD

                    // var txnHash = await web3WithAccount.Eth.Transactions.SendTransaction.SendRequestAsync(transactionInput);
=======
>>>>>>> 43187ce2a356e718326f0c641c90a6ff16dc10cb
                }

                return (newWalletAddress, newWalletPrivateKey);
            }
            finally
            {
                _semaphore.Release();
            }
        }
    }
}
