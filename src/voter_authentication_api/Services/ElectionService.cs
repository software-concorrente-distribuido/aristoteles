using DocumentFormat.OpenXml.ExtendedProperties;
using DocumentFormat.OpenXml.Wordprocessing;
using Nethereum.Contracts;
using Nethereum.Hex.HexTypes;
using Nethereum.Util;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using System;
using System.Collections.Generic;
using System.IO;
using System.Numerics;
using System.Threading.Tasks;
using VoterAuthenticationAPI.Common;
using VoterAuthenticationAPI.Models;
using VoterAuthenticationAPI.Models.DTOs;

namespace VoterAuthenticationAPI.Services
{
    public class ElectionService
    {
        private readonly AuthService _authService;
        private readonly UserService _userService;
        private readonly BlockChainConfig _blockChainConfig;

        public ElectionService(BlockChainConfig blockChainConfig, AuthService authService, UserService userService)
        {
            _authService = authService;
            _blockChainConfig = blockChainConfig;
            _userService = userService;
        }

        private async Task<(Account account, Web3 web3, Contract contract)> GetContractAsync()
        {
            var userId = _authService.GetUserIdFromToken();
            var user = await _userService.BuscaUsuarioId(Int32.Parse(userId));

            var privateKey = user?.Wallet.PrivateKey;
            var account = new Account(privateKey);
            var web3 = new Web3(account, _blockChainConfig.Url);
            var contractAbi = File.ReadAllText(_blockChainConfig.ContractAbiPath);
            var contract = web3.Eth.GetContract(contractAbi, _blockChainConfig.ContractAddress);
            return (account, web3, contract);
        }

        private async Task<string> SendTransactionAsync(Web3 web3, string functionName, params object[] functionInputParameters)
        {
            var (account, _, _) = await GetContractAsync();
            var contract = web3.Eth.GetContract(File.ReadAllText(_blockChainConfig.ContractAbiPath), _blockChainConfig.ContractAddress);
            var function = contract.GetFunction(functionName);

            var gasPrice = Web3.Convert.ToWei(20, UnitConversion.EthUnit.Gwei);
            var nonce = await web3.Eth.Transactions.GetTransactionCount.SendRequestAsync(account.Address);

            var transactionInput = function.CreateTransactionInput(account.Address, new HexBigInteger(2000000), new HexBigInteger(gasPrice), new HexBigInteger(nonce), functionInputParameters);
            var signedTransaction = await web3.Eth.TransactionManager.SignTransactionAsync(transactionInput);
            var txHash = await web3.Eth.Transactions.SendRawTransaction.SendRequestAsync(signedTransaction);

            return txHash;
        }

        public async Task<Election> CreateElectionAsync(string nome, string descricao, List<Voter> voters, List<Candidato> candidates)
        {
            var (account, web3, contract) = await GetContractAsync();

            // Create Election
            var txHash = await SendTransactionAsync(web3, "createElection", nome, descricao);
            var txReceipt = await web3.Eth.Transactions.GetTransactionReceipt.SendRequestAsync(txHash);

            var getAdminElectionsFunction = contract.GetFunction("getAdminElections"); // OK. Funciona, faz sentido, 0 erros.
            var elections = await getAdminElectionsFunction.CallAsync<List<Election>>(account.Address); // AQUI ESTÁ O PROBLEMA.
            var election = elections[^1];

            if (election == null)
                throw new Exception("Não foi possível criar a eleição");

            var electionId = election.Id;

            // Add Candidates
            foreach (var candidate in candidates)
            {
                var user = await _userService.BuscaUsuarioId(candidate.Id);
                txHash = await SendTransactionAsync(web3, "addCandidate", electionId, candidate.Name, user?.Wallet.Address);
                await web3.Eth.Transactions.GetTransactionReceipt.SendRequestAsync(txHash);
            }

            // Add Voters
            foreach (var voter in voters)
            {
                var user = await _userService.BuscaUsuarioId(voter.Id);
                txHash = await SendTransactionAsync(web3, "addVoter", electionId, voter.Name, voter.Name, user?.Wallet.Address);
                await web3.Eth.Transactions.GetTransactionReceipt.SendRequestAsync(txHash);
            }

            return await GetAdminElectionPerIDAsync(electionId);
        }

        public async Task<List<Election>> GetAdminElectionsAsync()
        {
            var (account, _, contract) = await GetContractAsync();
            var getAdminElectionsFunction = contract.GetFunction("getAdminElections");
            return await getAdminElectionsFunction.CallAsync<List<Election>>(account.Address);
        }

        public async Task<Election> GetAdminElectionPerIDAsync(int id)
        {
            var (account, _, contract) = await GetContractAsync();
            var getElectionFunction = contract.GetFunction("getElection");
            var election = await getElectionFunction.CallAsync<Election>(id);

            if (election == null)
                throw new Exception("Não foi possível buscar a eleição");

            return election;
        }

    }
}
