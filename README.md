# Text to Mindmap blazor diagram
Uses artificial intelligence to convert textual descriptions into visual mindmap diagrams automatically. Mind mapping is a high effective way to brainstorm and organize your thoughts organically without worrying about order and structure. It presents information where the central idea is placed in the middle and associated topics are arranged around it.

## Deployment

### Requirements to run the demo

The samples require the following requirements to run.

* [Visual Studio 2022](https://visualstudio.microsoft.com/vs/)
* [.NET 6.0](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) or [.NET 8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)

### Configuration

- Before running the sample, ensure you enter the valid Syncfusion license key, Azure OpenAI key, and endpoint URL in `MindMap\Program.cs` file
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
### Steps to run the sample:

1. Begin by cloning the repository to your local machine.
2. Navigate to the `MindMap` folder and open the solution file in Visual Studio 2022.
3. Execute the solution. This will render the diagram with a root node and an `AI Assist` button, as illustrated below:
   ![image](https://github.com/user-attachments/assets/c5fff1cb-06c2-4881-a785-60c37bb96ca2)
4. Click the `AI Assist` button to open a dialog in the center of the screen, allowing you to enter your prompt.
   <img width="449" alt="image" src="https://github.com/user-attachments/assets/f0f9e1af-0395-4b26-aca7-eb191f4ef960">
5. Enter your prompt to generate the mindmap diagram and click the send button.
   <img width="980" alt="image" src="https://github.com/user-attachments/assets/14d8c00f-b118-42fc-8399-4a3a87750b80">
6. You can interactively edit the AI-generated diagram by:
   * Adding a new node
   * Editing node content
   * Deleting an existing node
   <img width="980" alt="image" src="https://github.com/user-attachments/assets/2432b8f4-31c1-4790-928e-cc1839ce3f09">
8. You can also perform the same editing tasks using the left-side outline window. After making your edits, click the `Generate Diagram` button.

   <img width="209" alt="image" src="https://github.com/user-attachments/assets/f5c87ba4-8a44-4154-9b9b-e9fbb82a5853">


