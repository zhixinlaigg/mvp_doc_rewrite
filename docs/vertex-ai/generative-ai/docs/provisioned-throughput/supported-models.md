# Supported models

The following tables show the models that support Provisioned Throughput, the throughput for each [generative AI scale unit (GSU), and the burndown rates](measure-provisioned-throughput.md#gsu-burndown-rate) for each model.

To find out how many tokens your workload requires, refer to the SDK tokenizer or the `countTokens` API.

=== "Google models"

    Provisioned Throughput only supports models that you call directly from your project using the specific model ID and not a model alias. To use Provisioned Throughput to make API calls to a model, you must use the specific model version ID (for example, `gemini-1.5-flash-001`) and not a model version alias.

    Moreover, Provisioned Throughput doesn't support models that are called by other Vertex AI products, such as Vertex AI Agents and Vertex AI Search. For example, if you make API calls to Gemini 1.5 Flash while using Vertex AI Search, your Provisioned Throughput order for Gemini 1.5 Flash won't guarantee the calls made by Vertex AI Search.

    The following table shows the throughput, purchase increment, and burndown rates for Google models that support Provisioned Throughput. Your _per-second throughput_ is defined as your prompt input and generated output across all requests per second.

    **Model** | **Per-second throughput per GSU** | **Units** | **Minimum GSU purchase increment** | **Burndown rates**
    ---|---|---|---|---
    Gemini 1.5 Pro<br>Latest supported version: `gemini-1.5-pro` | 540 | Tokens | 1 |  **Less than or equal to 200,000 input tokens:**<br>1 input text token = 1 token<br>1 input image token = 1 token<br>1 input video token = 1 token<br>1 input audio token = 1 token<br>1 output response text token = 8 tokens<br>1 output reasoning text token = 8 tokens<br><br>**Greater than 200,000 input tokens:**<br>1 input text token = 2 tokens<br>1 input image token = 2 tokens<br>1 input video token = 2 tokens<br>1 input audio token = 2 tokens<br>1 output response text token = 12 tokens<br>1 output reasoning text token = 12 tokens
    Gemini 1.5 Flash<br>Latest supported version: `gemini-1.5-flash-preview-04-17` | 4480 | Tokens | 1 |  1 input text token = 1 token<br>1 input image token = 1 token<br>1 input video token = 1 token<br>1 input audio token = 7 tokens<br>1 output response text token = 4 tokens<br>1 output thinking response text token = 24 tokens<br>1 output reasoning text token = 24 tokens
    Gemini 1.0 Flash<br>Latest supported version: `gemini-1.0-flash` | 3360 | Tokens | 1 |  1 input text token = 1 token<br>1 input image token = 1 token<br>1 input video token = 1 token<br>1 input audio token = 7 tokens<br>1 output text token = 4 tokens
    Gemini 1.0 Flash-Lite<br>Latest supported version: `gemini-1.0-flash-lite` | 6720 | Tokens | 1 |  1 input text token = 1 token<br>1 input image token = 1 token<br>1 input video token = 1 token<br>1 input audio token = 1 token<br>1 output text token = 4 tokens
    Imagen 3 | 0.025 | Images | 1 | Only output images count toward your Provisioned Throughput quota.
    Imagen 3 Fast | 0.05 | Images | 1 | Only output images count toward your Provisioned Throughput quota.
    Imagen 2 | 0.05 | Images | 1 | Only output images count toward your Provisioned Throughput quota.
    Imagen 2 Edit | 0.05 | Images | 1 | Only output images count toward your Provisioned Throughput quota.
    MedLM medium | 2,000 | Characters | 1 | 1 input char = 1 char<br>1 output char = 2 chars
    MedLM large | 200 | Characters | 1 | 1 input char = 1 char<br>1 output char = 3 chars
    MedLM large 1.5 | 200 | Characters | 1 | 1 input char = 1 char<br>1 output char = 3 chars

    !!! caution "MedLM Deprecation"
        MedLM is deprecated. Access to MedLM will no longer be available on or after September 29, 2025.

    You can upgrade to new models as they are made available. For information about model availability and discontinuation dates, see [Google models](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models).

    For more information about supported locations, see [Available locations](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations).

    **Global endpoint model support**

    > **Preview**
    >
    > This feature is subject to the "Pre-GA Offerings Terms" in the [General Service Terms](https://cloud.google.com/terms) section of the [Service Specific Terms](https://cloud.google.com/terms/service-terms). Pre-GA features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

    Provisioned Throughput supports the global endpoint for the following models:

    *   Gemini 1.0 Flash
    *   Gemini 1.0 Flash-Lite

    Traffic that exceeds the Provisioned Throughput quota uses the global endpoint, by default.

    To assign Provisioned Throughput to the global endpoint of a model, select `global` as the region when you [place a Provisioned Throughput order](purchase-provisioned-throughput.md#place-an-order).

    **Supervised fine-tuned model support**

    > **Preview**
    >
    > This feature is subject to the "Pre-GA Offerings Terms" in the [General Service Terms](https://cloud.google.com/terms) section of the [Service Specific Terms](https://cloud.google.com/terms/service-terms). Pre-GA features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

    The following is supported for Google models that support supervised fine-tuning:

    *   Provisioned Throughput can be applied to both base models and supervised fine-tuned versions of those base models.
    *   Supervised fine-tuned model endpoints and their corresponding base model count towards the same Provisioned Throughput quota.

    For example, Provisioned Throughput purchased for `gemini-1.0-flash-lite-001` for a specific project prioritizes requests that are made from supervised fine-tuned versions of `gemini-1.0-flash-lite-001` created within that project. [Use the appropriate header](use-provisioned-throughput.md#use-rest-api) to control traffic behavior.

=== "Partner models"

    The following table shows the throughput, purchase increment, and burndown rates for partner models that support Provisioned Throughput. Claude models are measured in tokens per second, which is defined as a total of input and output tokens across all requests per second.

    **Model** | **Throughput per GSU (tokens/sec)** | **Minimum GSU purchase** | **GSU purchase increment** | **Burndown rates**
    ---|---|---|---|---
    Anthropic's Claude 3.5 Sonnet | 350 | 25 | 1 | 1 input token = 1 token<br>1 output token = 5 tokens<br>1 cache write token = 1.25 tokens<br>1 cache hit token = 0.1 token
    Anthropic's Claude 3.5 Haiku | 2,000 | 10 | 1 | 1 input token = 1 token<br>1 output token = 5 tokens<br>1 cache write token = 1.25 tokens<br>1 cache hit token = 0.1 token
    Anthropic's Claude 3 Opus | 70 | 35 | 1 | 1 input token = 1 token<br>1 output token = 5 tokens<br>1 cache write token = 1.25 tokens<br>1 cache hit token = 0.1 token
    Anthropic's Claude 3 Sonnet | 350 | 25 | 1 | 1 input token = 1 token<br>1 output token = 5 tokens<br>1 cache write token = 1.25 tokens<br>1 cache hit token = 0.1 token
    Anthropic's Claude 3 Haiku | 4,200 | 5 | 1 | 1 input token = 1 token<br>1 output token = 5 tokens<br>1 cache write token = 1.25 tokens<br>1 cache hit token = 0.1 token

    For information about supported locations, see [Anthropic Claude region availability](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/model-availability#anthropic-claude-models). To order Provisioned Throughput for Anthropic models, contact your Google Cloud account representative.

## 🔗 What's next

*   [Calculate Provisioned Throughput requirements](measure-provisioned-throughput.md).