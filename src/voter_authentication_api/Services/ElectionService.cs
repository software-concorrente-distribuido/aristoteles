using System.Net.Http;
using System.Text;
using System.Text.Json;
using VoterAuthenticationAPI.Models;
using VoterAuthenticationAPI.Models.DTOs;

namespace VoterAuthenticationAPI.Services
{
    public class ElectionService
    {
        private readonly BlockChainConfig _blockChainConfig;
        private readonly HttpClient _httpClient;

        public ElectionService(HttpClient httpClient, BlockChainConfig blockChainConfig)
        {
            _httpClient = httpClient;
            _blockChainConfig = blockChainConfig;
        }
        public async Task createElection(string nome, string descricao)
        {
            var requestBody = new
            {
                Nome = nome,
                Descricao = descricao
            };

            var jsonRequest = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(_blockChainConfig.Url, content);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Error calling blockchain API: {response.ReasonPhrase}");
            }

            var responseBody = await response.Content.ReadAsStringAsync();
        }
    }
}
