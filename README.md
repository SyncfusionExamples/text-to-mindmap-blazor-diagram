# Text to Mindmap blazor diagram
Uses artificial intelligence to convert textual descriptions into visual mindmap diagrams automatically. Mind mapping is a high effective way to brainstorm and organize your thoughts organically without worrying about order and structure. It presents information where the central idea is placed in the middle and associated topics are arranged around it.

## Deployment

### Requirements to run the demo

The samples require the following requirements to run.

* [Visual Studio 2022](https://visualstudio.microsoft.com/vs/)
* [.NET 6.0](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) or [.NET 8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)

### Configuration

- Configure Syncfusion license key and Open API keys in `MindMap\Program.cs` file
  ```json
  ......
  ......
  Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("Your registered key");
  builder.Services.AddTransient<OpenAIService>(service =>
  {
    var apiKey = "your key here";
    var endPoint = "https://YOUR_ACCOUNT.openai.azure.com/";
    var httpClientFactory = new HttpClient { BaseAddress = new Uri(endPoint) };
    return new OpenAIService(httpClientFactory, apiKey);
  });
  ......
  ``` 
### Run

* Clone this repository.
* Open the solution file from `MindMap` folder in Visual Studio 2022.
* Run the demo.
