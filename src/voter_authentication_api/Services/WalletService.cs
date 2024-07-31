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
using VoterAuthenticationAPI.Models.DTOs;
using Nethereum.Model;

namespace VoterAuthenticationAPI.Common
{
    public class WalletService  
    {
        private readonly BlockChainConfig _blockChainConfig;
        private readonly Web3 _web3;
        private static readonly SemaphoreSlim _semaphore = new SemaphoreSlim(5);

        // Injetar BlockChainConfig através do construtor
        public WalletService(BlockChainConfig blockChainConfig)
        {
            _blockChainConfig = blockChainConfig;
            _web3 = new Web3(_blockChainConfig.Url);
        }

        public async Task<Wallet> GenerateWalletAsync()
        {
            try
            {
                var envVars = DotEnv.Read();

                var (newWalletAddress, newWalletPrivateKey) = await CreateNewWallet("password");

                var balance = await _web3.Eth.GetBalance.SendRequestAsync(newWalletAddress);

                var contractAbi = File.ReadAllText(_blockChainConfig.ContractAbiPath);
                var contract = _web3.Eth.GetContract(contractAbi, _blockChainConfig.ContractAddress);

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
                    await unlockAccountMethod.SendRequestAsync(address, _blockChainConfig.Password, 300);
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
                    var balance1 = await _web3.Eth.GetBalance.SendRequestAsync(address);

                    var transactionInput = new Nethereum.RPC.Eth.DTOs.TransactionInput
                    {
                        To = newWalletAddress,
                        Value = new HexBigInteger(Web3.Convert.ToWei(_blockChainConfig.DefaultAmountFund)),
                        Gas = gasLimit,
                        GasPrice = gasPrice,
                        From = address
                    };

                    var transactionHash = await _web3.Eth.Transactions.SendTransaction.SendRequestAsync(transactionInput);
                    var balance = await _web3.Eth.GetBalance.SendRequestAsync(newWalletAddress);
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
