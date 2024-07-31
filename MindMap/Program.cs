using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Syncfusion.Blazor;
using Syncfusion.Blazor.Popups;
using MindMap.Shared;

namespace MindMap
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#app");
            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
            builder.Services.AddSyncfusionBlazor();
			
            Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("Your registered key");


            builder.Services.AddScoped<SampleService>();
            builder.Services.AddTransient<OpenAIService>(service =>
            {
                var apiKey = "your key here";
				// Required for Azure OpenAI
                var endPoint = "https://YOUR_ACCOUNT.openai.azure.com/";
                var httpClientFactory = new HttpClient { BaseAddress = new Uri(endPoint) };
                return new OpenAIService(httpClientFactory, apiKey);
            });
            builder.Services.AddScoped<SfDialogService>();
            await builder.Build().RunAsync();
        }
    }
}
