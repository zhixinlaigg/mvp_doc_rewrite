# Using OpenAI libraries with Vertex AI

The Vertex AI Chat Completions API is an OpenAI-compatible endpoint that lets you use the OpenAI Python client library and REST APIs to interact with supported models on Vertex AI. This allows you to switch between OpenAI models and Vertex AI models with minimal code changes to compare performance, cost, and scalability.

If you are not already using the OpenAI libraries, we recommend using the [Vertex AI SDKs for Firebase](../../start/quickstarts/quickstart-multimodal.md).

To see a hands-on example of using the Chat Completions API, run the "Call Gemini with the OpenAI Library" Jupyter notebook in your preferred environment:

[Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/chat-completions/intro_chat_completions_api.ipynb){: .md-button} [Open in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fchat-completions%2Fintro_chat_completions_api.ipynb){: .md-button} [Open in Vertex AI Workbench](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fchat-completions%2Fintro_chat_completions_api.ipynb){: .md-button} [View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/chat-completions/intro_chat_completions_api.ipynb){: .md-button}

## 📚 Supported models

The Chat Completions API supports both Google's Gemini models and select open models deployed from Model Garden.

=== "Gemini models"

    The Chat Completions API supports the following Gemini models:

    *   Gemini 2.5 Pro
    *   Gemini 2.5 Flash
    *   Gemini 2.0 Flash
    *   Gemini 2.0 Flash-Lite

=== "Self-deployed models from Model Garden"

    The [Hugging Face Text Generation Interface (HF TGI)](https://huggingface.co/docs/text-generation-inference/en/index) and [Vertex AI Model Garden prebuilt vLLM](http://us-docker.pkg.dev/vertex-ai/vertex-vision-model-garden-dockers/pytorch-vllm-serve) containers support the Chat Completions API. However, not every model deployed to these containers is supported.

    The following tables list popular models that are supported by each container type.

    **HF TGI**
    *   [`gemma-2-9b-it`](https://huggingface.co/google/gemma-2-9b-it)
    *   [`gemma-2-27b-it`](https://huggingface.co/google/gemma-2-27b-it)
    *   [`Meta-Llama-3.1-8B-Instruct`](https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct)
    *   [`Meta-Llama-3-8B-Instruct`](https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct)
    *   [`Mistral-7B-Instruct-v0.3`](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3)
    *   [`Mistral-Nemo-Instruct-2407`](https://huggingface.co/mistralai/Mistral-Nemo-Instruct-2407)

    **vLLM**
    *   [Gemma](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/335)
    *   [Llama 2](https://console.cloud.google.com/vertex-ai/publishers/meta/model-garden/llama2)
    *   [Llama 3](https://console.cloud.google.com/vertex-ai/publishers/meta/model-garden/llama3)
    *   [Mistral-7B](https://console.cloud.google.com/vertex-ai/publishers/mistral-ai/model-garden/mistral-7b)
    *   [Mistral Nemo](https://console.cloud.google.com/vertex-ai/publishers/mistralai/model-garden/mistral-nemo)

## 🔗 Supported parameters

For Google models, the Chat Completions API supports the following OpenAI parameters. Parameter support for third-party models varies by model. Consult the specific model's documentation to see which parameters are supported. Any unsupported parameters that you pass are ignored.

!!! tip "Troubleshooting"
    If you encounter issues with code snippets or setup, refer to the [Troubleshooting Guide](https://cloud.google.com/vertex-ai/docs/general/troubleshooting?component=any).

??? "Standard OpenAI parameters"

    For a detailed description of each parameter, see OpenAI's documentation on [Creating chat completions](https://platform.openai.com/docs/api-reference/chat/create).

    *   **`messages`**:
        *   `System message`
        *   `User message`: The `text` and `image_url` types are supported. The `image_url` type supports images stored as a Cloud Storage URI or as a base64 encoding in the format `"data:<MIME-TYPE>;base64,<BASE64-ENCODED-BYTES>"`. The `detail` option is not supported.
        *   `Assistant message`
        *   `Tool message`
        *   `Function message`: This field is deprecated but supported for backward compatibility.
    *   **`model`**
    *   **`max_completion_tokens`**: Alias for `max_tokens`.
    *   **`max_tokens`**
    *   **`n`**
    *   **`frequency_penalty`**
    *   **`presence_penalty`**
    *   **`reasoning_effort`**: Configures the time and tokens used for a response.
        *   `low`: 1024
        *   `medium`: 8192
        *   `high`: 24576
        As no thoughts are included in the response, only one of `reasoning_effort` or `extra_body.google.thinking_config` may be specified.
    *   **`response_format`**:
        *   `json_object`: Interpreted as passing "application/json" to the Gemini API.
        *   `json_schema`: Fully recursive schemas are not supported. `additional_properties` is supported.
        *   `text`: Interpreted as passing "text/plain" to the Gemini API.
        *   Any other MIME type is passed as-is to the model.
    *   **`seed`**: Corresponds to `GenerationConfig.seed`.
    *   **`stop`**
    *   **`stream`**
    *   **`temperature`**
    *   **`top_p`**
    *   **`tools`**:
        *   `type`
        *   `function`
            *   `name`
            *   `description`
            *   `parameters`: Specify parameters using the [OpenAPI specification](https://spec.openapis.org/oas/v3.0.3#openapi-specification). This differs from the OpenAI `parameters` field, which is described as a JSON Schema object. To learn about keyword differences, see the [OpenAPI guide](https://swagger.io/docs/specification/data-models/keywords/).
    *   **`tool_choice`**:
        *   `none`
        *   `auto`
        *   `required`: Corresponds to the `ANY` mode in `FunctionCallingConfig`.
        *   `validated`: Corresponds to the `VALIDATED` mode in `FunctionCallingConfig`. This is a Google-specific option.
    *   **`web_search_options`**: Corresponds to the `GoogleSearch` tool. No sub-options are supported.
    *   **`function_call`**: This field is deprecated but supported for backward compatibility.
    *   **`functions`**: This field is deprecated but supported for backward compatibility.

??? "Multimodal input parameters"

    The Chat Completions API supports select multimodal inputs. For usage details, see our [multimodal input examples](examples.md#multimodal-input-examples).

    In general, the `data` parameter can be a URI or a combination of a MIME type and base64-encoded bytes in the format `"data:<MIME-TYPE>;base64,<BASE64-ENCODED-BYTES>"`. For a full list of MIME types, see `GenerateContent`. For more information on OpenAI's base64 encoding, see [their documentation](https://platform.openai.com/docs/guides/images-vision#giving-a-model-images-as-input).

    *   **`input_audio`**:
        *   `data`: Any URI or valid blob format. All blob types supported by `GenerateContent` are supported (for example, HTTP, Cloud Storage).
        *   `format`: While OpenAI supports `wav` and `mp3`, Gemini supports all valid audio MIME types.
    *   **`image_url`**:
        *   `data`: Like `input_audio`, any URI or valid blob format is supported. Note that `image_url` as a URL defaults to the `image/*` MIME type, while `image_url` as blob data can be used for any multimodal input.
        *   `detail`: Determines the maximum tokens per image. While OpenAI's field is per-image, Gemini enforces the same detail level across the entire request. Passing multiple detail types in one request will cause an error.

??? "Gemini-specific parameters"

    Gemini supports several features that are not available in OpenAI models. To use these features, you must pass them within an `extra_body` or `extra_part` object; otherwise, they will be ignored.

    ### `extra_body` features
    *   **`safety_settings`**: Corresponds to Gemini's [`SafetySetting`](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/SafetySetting).
    *   **`cached_content`**: Corresponds to Gemini's `GenerateContentRequest.cached_content`.
    *   **`thinking_config`**: Corresponds to Gemini's [`GenerationConfig.ThinkingConfig`](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/GenerationConfig#ThinkingConfig).
    *   **`thought_tag_marker`**: Used to separate a model's thoughts from its responses for models with Thinking enabled. If specified, subsequent queries will strip the thought tags and mark the thoughts appropriately to preserve context.

    ### `extra_part` features
    `extra_part` lets you specify additional settings at a per-`Part` level.
    *   **`extra_content`**: A field for adding Gemini-specific content that shouldn't be ignored.
    *   **`thought`**: Explicitly marks if a field is a thought, taking precedence over `thought_tag_marker`. This should be used to specify whether a tool call is part of a thought.

## 🔗 What's next

*   Learn about [authentication and credentialing](auth-and-credentials.md) with the OpenAI-compatible syntax.
*   See examples of calling the [Chat Completions API](examples.md).
*   See examples of calling the Inference API with the OpenAI-compatible syntax.
*   See examples of calling the Function Calling API with OpenAI-compatible syntax.
*   Learn more about the Gemini API.
*   Learn more about migrating from Azure OpenAI to the Gemini API.