# Examples

This document provides examples of how to call Vertex AI's OpenAI-compatible API. You can run the "Call Gemini with the OpenAI Library" Jupyter notebook for a complete, interactive walkthrough.

[Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/chat-completions/intro_chat_completions_api.ipynb){: .md-button} [Open in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fchat-completions%2Fintro_chat_completions_api.ipynb){: .md-button} [Open in Vertex AI Workbench](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fchat-completions%2Fintro_chat_completions_api.ipynb){: .md-button} [View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/chat-completions/intro_chat_completions_api.ipynb){: .md-button}

Before you begin, choose whether to call a Google-managed Gemini model or a self-deployed model on a Vertex AI endpoint.

| Feature | Call a Gemini Model | Call a Self-Deployed Model |
| :--- | :--- | :--- |
| **Endpoint** | Use the global `openapi` endpoint. | Use your specific Vertex AI endpoint. |
| **Model Management** | Managed by Google; no setup required. | You must deploy and manage the model yourself. |
| **Model Specification** | Specify the model ID in the request body (e.g., `google/gemini-2.0-flash-001`). | The model is determined by the endpoint; no model ID is needed in the request. |
| **Use Case** | Best for accessing Google's latest foundation models directly with minimal setup. | Best for serving custom or fine-tuned models with specific serving configurations. |

## 💻 Call the Chat Completions API

The following examples demonstrate how to send requests to the Chat Completions API using different model types and request methods.

=== "Call a Gemini model"

    You can call a Google-managed Gemini model directly through the `openapi` endpoint. These examples show how to send non-streaming, streaming, and multimodal requests.

    === "Non-streaming"

        These examples show how to send a standard, non-streaming request and wait for the complete response.

        === "REST"

            ```bash
            curl -X POST \
              -H "Authorization: Bearer $(gcloud auth print-access-token)" \
              -H "Content-Type: application/json" \
            https://${LOCATION}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/openapi/chat/completions \
            -d '{
              "model": "google/${MODEL_ID}",
              "messages": [{
                "role": "user",
                "content": "Write a story about a magic backpack."
              }]
            }'
            ```

        === "Python"

            Before trying this sample, follow the Python setup instructions in the [Vertex AI quickstart using client libraries](https://cloud.google.com/vertex-ai/docs/start/client-libraries). For more information, see the [Vertex AI Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

            To authenticate to Vertex AI, set up Application Default Credentials. For more information, see [Set up authentication for a local development environment](https://cloud.google.com/docs/authentication/provide-credentials-adc#local-dev).

            !!! tip "Troubleshooting"
                If you encounter issues with code snippets or setup, refer to the [Troubleshooting Guide](https://cloud.google.com/vertex-ai/docs/general/troubleshooting?component=any).

            ```python
            from google.auth import default
            import google.auth.transport.requests
            
            import openai
            
            # TODO(developer): Update and un-comment below lines
            # project_id = "PROJECT_ID"
            # location = "us-central1"
            
            # Programmatically get an access token
            credentials, _ = default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
            credentials.refresh(google.auth.transport.requests.Request())
            
            # OpenAI Client
            client = openai.OpenAI(
                base_url=f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/endpoints/openapi",
                api_key=credentials.token,
            )
            
            response = client.chat.completions.create(
                model="google/gemini-2.0-flash-001",
                messages=[{"role": "user", "content": "Why is the sky blue?"}],
            )
            
            print(response)
            ```

    === "Streaming"

        These examples show how to stream the response from the model as it's being generated.

        === "REST"

            ```bash
            curl -X POST \
              -H "Authorization: Bearer $(gcloud auth print-access-token)" \
              -H "Content-Type: application/json" \
            https://${LOCATION}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/openapi/chat/completions \
            -d '{
              "model": "google/${MODEL_ID}",
              "stream": true,
              "messages": [{
                "role": "user",
                "content": "Write a story about a magic backpack."
              }]
            }'
            ```

        === "Python"

            Before trying this sample, follow the Python setup instructions in the [Vertex AI quickstart using client libraries](https://cloud.google.com/vertex-ai/docs/start/client-libraries). For more information, see the [Vertex AI Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

            To authenticate to Vertex AI, set up Application Default Credentials. For more information, see [Set up authentication for a local development environment](https://cloud.google.com/docs/authentication/provide-credentials-adc#local-dev).

            !!! tip "Troubleshooting"
                If you encounter issues with code snippets or setup, refer to the [Troubleshooting Guide](https://cloud.google.com/vertex-ai/docs/general/troubleshooting?component=any).

            ```python
            from google.auth import default
            import google.auth.transport.requests
            
            import openai
            
            # TODO(developer): Update and un-comment below lines
            # project_id = "PROJECT_ID"
            # location = "us-central1"
            
            # Programmatically get an access token
            credentials, _ = default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
            credentials.refresh(google.auth.transport.requests.Request())
            
            # OpenAI Client
            client = openai.OpenAI(
                base_url=f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/endpoints/openapi",
                api_key=credentials.token,
            )
            
            response = client.chat.completions.create(
                model="google/gemini-2.0-flash-001",
                messages=[{"role": "user", "content": "Why is the sky blue?"}],
                stream=True,
            )
            for chunk in response:
                print(chunk)
            ```

    === "Multimodal (Image, Audio)"

        These examples show how to send requests containing text and other media, like images or audio.

        === "REST (Image)"

            Use `image_url` to pass in image data from a Cloud Storage bucket.

            ```bash
            curl -X POST \
              -H "Authorization: Bearer $(gcloud auth print-access-token)" \
              -H "Content-Type: application/json" \
              https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/us-central1/endpoints/openapi/chat/completions \
              -d '{ \
                "model": "google/gemini-2.0-flash-001", \
                "messages": [{ "role": "user", "content": [ \
                  { "type": "text", "text": "Describe this image" }, \
                  { "type": "image_url", "image_url": "gs://cloud-samples-data/generative-ai/image/scones.jpg" }] }] }'
            ```

        === "REST (Audio)"

            Use `input_audio` to pass in audio data from a Cloud Storage bucket.

            ```bash
            curl -X POST \
              -H "Authorization: Bearer $(gcloud auth print-access-token)" \
              -H "Content-Type: application/json" \
              https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/us-central1/endpoints/openapi/chat/completions \
              -d '{ \
                "model": "google/gemini-2.0-flash-001", \
                "messages": [ \
                  { "role": "user", \
                    "content": [ \
                      { "type": "text", "text": "Describe this: " }, \
                      { "type": "input_audio", "input_audio": { \
                        "format": "audio/mp3", \
                        "data": "gs://cloud-samples-data/generative-ai/audio/pixel.mp3" } }] }] }'
            ```

        === "Python (Image)"

            Before trying this sample, follow the Python setup instructions in the [Vertex AI quickstart using client libraries](https://cloud.google.com/vertex-ai/docs/start/client-libraries). For more information, see the [Vertex AI Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

            To authenticate to Vertex AI, set up Application Default Credentials. For more information, see [Set up authentication for a local development environment](https://cloud.google.com/docs/authentication/provide-credentials-adc#local-dev).

            !!! tip "Troubleshooting"
                If you encounter issues with code snippets or setup, refer to the [Troubleshooting Guide](https://cloud.google.com/vertex-ai/docs/general/troubleshooting?component=any).

            ```python
            from google.auth import default
            import google.auth.transport.requests
            
            import openai
            
            # TODO(developer): Update and un-comment below lines
            # project_id = "PROJECT_ID"
            # location = "us-central1"
            
            # Programmatically get an access token
            credentials, _ = default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
            credentials.refresh(google.auth.transport.requests.Request())
            
            # OpenAI Client
            client = openai.OpenAI(
                base_url=f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/endpoints/openapi",
                api_key=credentials.token,
            )
            
            response = client.chat.completions.create(
                model="google/gemini-2.0-flash-001",
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": "Describe the following image:"},
                            {
                                "type": "image_url",
                                "image_url": "gs://cloud-samples-data/generative-ai/image/scones.jpg",
                            },
                        ],
                    }
                ],
            )
            
            print(response)
            ```

=== "Call a self-deployed model"

    You can call a model that you have deployed to a Vertex AI endpoint. The model is determined by the endpoint ID, so you don't need to specify a model in the request body.

    === "Non-streaming"

        These examples show how to send a standard, non-streaming request to your endpoint.

        === "REST"

            ```bash
            curl -X POST \
              -H "Authorization: Bearer $(gcloud auth print-access-token)" \
              -H "Content-Type: application/json" \
            https://aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/global/endpoints/${ENDPOINT}/chat/completions \
            -d '{
              "messages": [{
                "role": "user",
                "content": "Write a story about a magic backpack."
              }]
            }'
            ```

        === "Python"

            Before trying this sample, follow the Python setup instructions in the [Vertex AI quickstart using client libraries](https://cloud.google.com/vertex-ai/docs/start/client-libraries). For more information, see the [Vertex AI Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

            To authenticate to Vertex AI, set up Application Default Credentials. For more information, see [Set up authentication for a local development environment](https://cloud.google.com/docs/authentication/provide-credentials-adc#local-dev).

            !!! tip "Troubleshooting"
                If you encounter issues with code snippets or setup, refer to the [Troubleshooting Guide](https://cloud.google.com/vertex-ai/docs/general/troubleshooting?component=any).

            ```python
            from google.auth import default
            import google.auth.transport.requests
            
            import openai
            
            # TODO(developer): Update and un-comment below lines
            # project_id = "PROJECT_ID"
            # location = "us-central1"
            # model_id = "gemma-2-9b-it"
            # endpoint_id = "YOUR_ENDPOINT_ID"
            
            # Programmatically get an access token
            credentials, _ = default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
            credentials.refresh(google.auth.transport.requests.Request())
            
            # OpenAI Client
            client = openai.OpenAI(
                base_url=f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/endpoints/{endpoint_id}",
                api_key=credentials.token,
            )
            
            response = client.chat.completions.create(
                model=model_id,
                messages=[{"role": "user", "content": "Why is the sky blue?"}],
            )
            print(response)
            ```

    === "Streaming"

        These examples show how to stream the response from your self-deployed model.

        === "REST"

            ```bash
            curl -X POST \
              -H "Authorization: Bearer $(gcloud auth print-access-token)" \
              -H "Content-Type: application/json" \
            https://aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/global/endpoints/${ENDPOINT}/chat/completions \
            -d '{
              "stream": true,
              "messages": [{
                "role": "user",
                "content": "Write a story about a magic backpack."
              }]
            }'
            ```

        === "Python"

            Before trying this sample, follow the Python setup instructions in the [Vertex AI quickstart using client libraries](https://cloud.google.com/vertex-ai/docs/start/client-libraries). For more information, see the [Vertex AI Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

            To authenticate to Vertex AI, set up Application Default Credentials. For more information, see [Set up authentication for a local development environment](https://cloud.google.com/docs/authentication/provide-credentials-adc#local-dev).

            !!! tip "Troubleshooting"
                If you encounter issues with code snippets or setup, refer to the [Troubleshooting Guide](https://cloud.google.com/vertex-ai/docs/general/troubleshooting?component=any).

            ```python
            from google.auth import default
            import google.auth.transport.requests
            
            import openai
            
            # TODO(developer): Update and un-comment below lines
            # project_id = "PROJECT_ID"
            # location = "us-central1"
            # model_id = "gemma-2-9b-it"
            # endpoint_id = "YOUR_ENDPOINT_ID"
            
            # Programmatically get an access token
            credentials, _ = default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
            credentials.refresh(google.auth.transport.requests.Request())
            
            # OpenAI Client
            client = openai.OpenAI(
                base_url=f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/endpoints/{endpoint_id}",
                api_key=credentials.token,
            )
            
            response = client.chat.completions.create(
                model=model_id,
                messages=[{"role": "user", "content": "Why is the sky blue?"}],
                stream=True,
            )
            for chunk in response:
                print(chunk)
            ```

## 💻 Advanced Usage

The following examples show how to use advanced features like passing Google-specific parameters and requesting structured output.

??? "Use `extra_body` to pass Google-specific parameters"

    You can use the `extra_body` parameter to pass Google-specific fields, such as `thinking_config`, that are not part of the standard OpenAI specification.

    **SDK Example**

    ```python
    client.chat.completions.create(
      ...,
      extra_body = {
        'google': { ... }
      },
    )
    ```

    **REST Example with `thinking_config`**

    This `curl` request uses `extra_body` to enable the model's thinking process with a specified budget and tag marker.

    ```bash
    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/endpoints/openapi/chat/completions \
      -d '{ \
        "model": "google/gemini-2.5-flash-preview-04-17", \
        "messages": [ \
          { "role": "user", \
          "content": [ \
            { "type": "text", \
              "text": "Are there any primes number of the form n*ceil(log(n))" \
            }] }], \
        "extra_body": { \
          "google": { \
              "thinking_config": { \
              "include_thoughts": true, "thinking_budget": 10000 \
            }, \
            "thought_tag_marker": "think" } }, \
        "stream": true }'
    ```

??? "Use `extra_content` to pass per-message or per-tool parameters"

    You can use the `extra_content` field in the REST API to pass Google-specific parameters at the message, content part, or tool call level.

    **`extra_content` with string `content`**

    ```json
    {
      "messages": [
        { "role": "...", "content": "...", "extra_content": { "google": { ... } } }
      ]
    }
    ```

    **Per-message `extra_content`**

    ```json
    {
      "messages": [
        {
          "role": "...",
          "content": [
            { "type": "...", ..., "extra_content": { "google": { ... } } }
          ]
        }
      ]
    }
    ```

    **Per-tool call `extra_content`**

    ```json
    {
      "messages": [
        {
          "role": "...",
          "tool_calls": [
            {
              ...,
              "extra_content": { "google": { ... } }
            }
          ]
        }
      ]
    }
    ```

??? "Get structured output using `response_format`"

    You can use the `response_format` parameter to request that the model's output conforms to a specific schema. This is useful for getting structured data like JSON.

    **SDK Example**

    This example uses Pydantic to define a `CalendarEvent` schema and instructs the model to return information in that format.

    ```python
    from pydantic import BaseModel
    from openai import OpenAI
    
    client = OpenAI()
    
    class CalendarEvent(BaseModel):
        name: str
        date: str
        participants: list[str]
    
    completion = client.beta.chat.completions.parse(
        model="google/gemini-2.5-flash-preview-04-17",
        messages=[
            {"role": "system", "content": "Extract the event information."},
            {"role": "user", "content": "Alice and Bob are going to a science fair on Friday."},
        ],
        response_format=CalendarEvent,
    )
    
    print(completion.choices[0].message.parsed)
    ```

## 🔗 What's next

*   See examples of calling the Inference API with the OpenAI-compatible syntax.
*   See examples of calling the Function Calling API with OpenAI-compatible syntax.
*   Learn more about the [Gemini API](overview.md).
*   Learn more about migrating from Azure OpenAI to the Gemini API.