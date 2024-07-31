using DocumentFormat.OpenXml.Wordprocessing;
using Nethereum.Hex.HexTypes;
using Nethereum.Util;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using VoterAuthenticationAPI.Common;
using VoterAuthenticationAPI.Models;
using VoterAuthenticationAPI.Models.DTOs;

namespace VoterAuthenticationAPI.Services
{
    public class ElectionService
    {
        private readonly AuthService _authService;
        private readonly UserService _userService;
        private readonly Web3 _web3;
        private readonly BlockChainConfig _blockChainConfig;

        public ElectionService(BlockChainConfig blockChainConfig, AuthService authService, UserService userService)
        {
            _authService = authService;
            _blockChainConfig = blockChainConfig;
            _web3 = new Web3(_blockChainConfig.Url);
            _userService = userService;
        }

        public async Task CreateElectionAsync(string nome, string descricao)
        {
            var userId = _authService.GetUserIdFromToken();
            var user = await _userService.BuscaUsuarioId(Int32.Parse(userId));

            var privateKey = user?.Wallet.PrivateKey
                ;
            var account = new Account(privateKey);
            var web3 = new Web3(account, _blockChainConfig.Url);

            var contractAbi = File.ReadAllText(_blockChainConfig.ContractAbiPath);
            var contract = web3.Eth.GetContract(contractAbi, _blockChainConfig.ContractAddress);

            var createElectionFunction = contract.GetFunction("createElection");
            var gasPrice = Web3.Convert.ToWei(20, UnitConversion.EthUnit.Gwei);
            var nonce = await web3.Eth.Transactions.GetTransactionCount.SendRequestAsync(account.Address);

            var transactionInput = createElectionFunction.CreateTransactionInput(account.Address, new HexBigInteger(2000000), new HexBigInteger(gasPrice), new HexBigInteger(nonce), nome, descricao);
            var signedTransaction = await web3.Eth.TransactionManager.SignTransactionAsync(transactionInput);
            var balance = await web3.Eth.GetBalance.SendRequestAsync(account.Address);
            var txHash = await web3.Eth.Transactions.SendRawTransaction.SendRequestAsync(signedTransaction);
            var tx_receipt = await web3.Eth.Transactions.GetTransactionReceipt.SendRequestAsync(txHash);

        }
    }
}
