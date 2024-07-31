using DocumentFormat.OpenXml.ExtendedProperties;
using DocumentFormat.OpenXml.Wordprocessing;
using Nethereum.Contracts;
using Nethereum.Hex.HexTypes;
using Nethereum.Util;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using System;
using System.Net.Http;
using System.Reflection.Metadata.Ecma335;
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

        public async Task<Election> CreateElectionAsync(string nome, string descricao, List<Voter> voters, List<Candidato> candidates)
        {
            var userId = _authService.GetUserIdFromToken();
            var user = await _userService.BuscaUsuarioId(Int32.Parse(userId));

            Account account;
            Web3 web3;
            Contract contract;

            ConfigContract(user, out account, out web3, out contract);

            var createElectionFunction = contract.GetFunction("createElection");
            var gasPrice = Web3.Convert.ToWei(20, UnitConversion.EthUnit.Gwei);
            var nonce = await web3.Eth.Transactions.GetTransactionCount.SendRequestAsync(account.Address);

            var transactionInput = createElectionFunction.CreateTransactionInput(account.Address, new HexBigInteger(2000000), new HexBigInteger(gasPrice), new HexBigInteger(nonce), nome, descricao);
            var signedTransaction = await web3.Eth.TransactionManager.SignTransactionAsync(transactionInput);
            var balance = await web3.Eth.GetBalance.SendRequestAsync(account.Address);
            var txHash = await web3.Eth.Transactions.SendRawTransaction.SendRequestAsync(signedTransaction);
            var tx_receipt = await web3.Eth.Transactions.GetTransactionReceipt.SendRequestAsync(txHash);

            var elections = await GetAdminElectionsAsync();
            var election = elections.LastOrDefault();

            if (election == null)
                throw new Exception("Não foi possível criar a eleição");

            var electionId = election.Id;

            var addCandidateFunction = contract.GetFunction("addCandidate");
            foreach (var candidate in candidates)
            {
                user = await _userService.BuscaUsuarioId(candidate.Id);
                nonce = await web3.Eth.Transactions.GetTransactionCount.SendRequestAsync(account.Address);
                transactionInput = addCandidateFunction.CreateTransactionInput(account.Address, new HexBigInteger(2000000), new HexBigInteger(gasPrice), new HexBigInteger(nonce), electionId, candidate.Name, user?.Wallet.Address);
                signedTransaction = await web3.Eth.TransactionManager.SignTransactionAsync(transactionInput);
                txHash = await web3.Eth.Transactions.SendRawTransaction.SendRequestAsync(signedTransaction);
                tx_receipt = await web3.Eth.Transactions.GetTransactionReceipt.SendRequestAsync(txHash);
            }

            var addVoterFunction = contract.GetFunction("addVoter");
            foreach (var voter in voters)
            {
                user = await _userService.BuscaUsuarioId(voter.Id);
                nonce = await web3.Eth.Transactions.GetTransactionCount.SendRequestAsync(account.Address);
                transactionInput = addVoterFunction.CreateTransactionInput(account.Address, new HexBigInteger(2000000), new HexBigInteger(gasPrice), new HexBigInteger(nonce), electionId, voter.Name, voter.Name, user?.Wallet.Address);
                signedTransaction = await web3.Eth.TransactionManager.SignTransactionAsync(transactionInput);
                txHash = await web3.Eth.Transactions.SendRawTransaction.SendRequestAsync(signedTransaction);
                tx_receipt = await web3.Eth.Transactions.GetTransactionReceipt.SendRequestAsync(txHash);
            }

            return await GetAdminElectionPerIDAsync(electionId);

        }

        private void ConfigContract(User? user, out Account account, out Web3 web3, out Contract contract)
        {
            var privateKey = user?.Wallet.PrivateKey;
            account = new Account(privateKey);
            web3 = new Web3(account, _blockChainConfig.Url);
            var contractAbi = File.ReadAllText(_blockChainConfig.ContractAbiPath);
            contract = web3.Eth.GetContract(contractAbi, _blockChainConfig.ContractAddress);
        }

        public async Task<List<Election>> GetAdminElectionsAsync()
        {
            var userId = _authService.GetUserIdFromToken();
            var user = await _userService.BuscaUsuarioId(Int32.Parse(userId));

            Account account;
            Web3 web3;
            Contract contract;

            ConfigContract(user, out account, out web3, out contract);

            var getAdminElectionsFunction = contract.GetFunction("getAdminElections");

            var elections = await getAdminElectionsFunction.CallAsync<List<Election>>(user?.Wallet.Address);

            return elections;
        }

        public async Task<Election> GetAdminElectionPerIDAsync(int id)
        {
            var userId = _authService.GetUserIdFromToken();
            var user = await _userService.BuscaUsuarioId(Int32.Parse(userId));

            Account account;
            Web3 web3;
            Contract contract;

            ConfigContract(user, out account, out web3, out contract);

            var getElectionFunction = contract.GetFunction("getElection");

            var election = await getElectionFunction.CallAsync<Election>(id);

            if (election == null)
                throw new Exception("Não foi possível buscar a eleição");

            return election;
        }
    }
}
