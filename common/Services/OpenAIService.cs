using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System;
using System.Globalization;
using Newtonsoft.Json.Linq;
namespace MindMap
{
    public class OpenAIService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        public static int ChooseSystemAction;

        /// <summary>
        /// Initializes a new instance of the <see cref="OpenAIService"/> class with the specified HTTP client and API key.
        /// </summary>
        public OpenAIService(HttpClient httpClient, string apiKey)
        {
            _httpClient = httpClient;
            _apiKey = apiKey;
        }
        /// <summary>
        /// Returns the predefined system action to be sent to OpenAI.
        /// </summary>
        private string ChooseAction()
        {
            string spaceIndentation = "You are an assistant tasked with generating mind map diagram data sources based on user queries with tab indentation. Please don't use tab space on root parent and sublevel childrens must have tab space. Don't use '+' or '-' like character symbols before any level of data.";
            return spaceIndentation;
        }
        /// <summary>
        /// Gets the response from OpenAI for the provided prompt.
        /// </summary>
        public async Task<string> GetResponseFromOpenAI(string prompt)
        {
            var requestContent = new
            {
                //model = "GPT-35-Turbo",
                messages = new[]
                {
                new { role = "system", content = ChooseAction() },
                new { role = "user", content = $"Generate the mindmap diagram data source for the following prompt: {prompt}." },
            },
                max_tokens = 500,
                temperature = 0.9
            };

            var requestBody = new StringContent(JsonSerializer.Serialize(requestContent), Encoding.UTF8, "application/json");
            var requestMessage = new HttpRequestMessage(HttpMethod.Post, "openai/deployments/GPT-35-Turbo/chat/completions?api-version=2023-05-15")
            {
                Content = requestBody
            };
            // Add the API key to the request headers.
            requestMessage.Headers.Add("api-key", _apiKey);
            var response = await _httpClient.SendAsync(requestMessage);

            // Ensure the response is valid.
            response.EnsureSuccessStatusCode();

            // Parse the response content.
            var responseContent = await response.Content.ReadAsStringAsync();
            var jsonResponse = JsonDocument.Parse(responseContent);

            return jsonResponse.RootElement.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();
        }
        /// <summary>
        /// Counts the number of leading spaces in a string.
        /// </summary>
        public int CountLeadingSpaces(string input)
        {
            int originalLength = input.Length;

            int trimmedLength = input.TrimStart().Length;

            int leadingSpaces = originalLength - trimmedLength;

            return leadingSpaces;
        }
    }

}