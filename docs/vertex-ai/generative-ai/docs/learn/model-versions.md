# Model versions and lifecycle

This document defines key terms related to the lifecycle stages and important dates for Gemini and embedding models that are available on Vertex AI. It also provides recommended upgrades for the models and points you to available migration paths.

## 📚 Key Terms

*   **Stable model**: A publicly released version of the model that is available and supported for production use starting on the release date. A stable model version is typically released with a _retirement date_, which indicates the last day that the model is available. After this date, the model is no longer accessible or supported by Google.

    *   **Latest stable model**: The latest version within the model family recommended for new and active projects. This should be the target for migrations from earlier versions. See [Latest stable models](#-latest-stable-models).
    *   **Legacy stable model**: A model version that has been superseded by the latest stable model. Although legacy stable models are still supported, you should strongly consider migrating to the latest model to receive the latest features and improvements. Access to legacy stable models might be restricted for new projects. See [Legacy stable models](#-legacy-stable-models).

*   **Retired model**: The model version is past its retirement date and has been permanently deactivated. Retired models are no longer accessible or supported by Google. API requests that reference a retired model ID typically return a 404 error. See [Retired models](#-retired-models).

*   **Recommended upgrade**: The latest stable model that we recommend switching to. Latest stable models tend to offer better performance and more capabilities compared to legacy stable models. See the recommended upgrades in the [Legacy stable models](#-legacy-stable-models) and [Retired models](#-retired-models) sections.

## 🔗 Latest stable models

The following table lists the latest stable models:

| Model ID | Release date | Retirement date | Details |
|---|---|---|---|
| `gemini-2.5-pro` | June 17, 2025 | June 17, 2026 | |
| `gemini-2.5-flash` | June 17, 2025 | June 17, 2026 | |
| `gemini-2.0-flash-001` | February 5, 2025 | February 5, 2026 | [Gemini 2.0: Flash, Flash-Lite and Pro - Google Developers Blog](https://developers.googleblog.com/en/gemini-2-family-expands/) |
| `gemini-2.0-flash-lite-001` | February 25, 2025 | February 25, 2026 | [Gemini 2.0: Flash, Flash-Lite and Pro - Google Developers Blog](https://developers.googleblog.com/en/gemini-2-family-expands/) |
| `gemini-embedding-001` | May 20, 2025 | No retirement date announced | |
| `text-embedding-005` | November 18, 2024 | No retirement date announced | |
| `text-multilingual-embedding-002` | May 14, 2024 | No retirement date announced | |
| `multimodalembedding@001` | February 12, 2024 | No retirement date announced | |

## 🔗 Legacy stable models

The following table lists legacy stable models:

| Model ID | Release date | Retirement date | Recommended upgrade |
|---|---|---|---|
| `gemini-1.5-pro-002`* | September 24, 2024 | September 24, 2025 | `gemini-2.0-flash` |
| `gemini-1.5-flash-002`* | September 24, 2024 | September 24, 2025 | `gemini-2.0-flash-lite` |
| `text-embedding-004` | May 14, 2024 | November 18, 2025 | `gemini-embedding-001` |

*: Restricted for new projects.

## ⚙️ Migrate to a latest stable model

When a model you are using is approaching its retirement date, you need to migrate your application to a newer version. We recommend migrating to the latest stable model to benefit from the latest features and improvements. You have two main options for migration:

| Migration Path | Best For | Effort | Key Benefit |
|---|---|---|---|
| **Full Migration Guide** | Production applications where performance and quality are critical. | Higher | Optimizes your application for the new model's capabilities and minimizes risks. |
| **Quick Fix** | Non-critical applications or resolving urgent errors from a retired model. | Lower | Quickly updates the model endpoint to restore functionality. |

=== "Full Migration Guide"

    To ensure a smooth transition and optimize your application for the new model, we strongly recommend following the comprehensive migration guide. This guide provides a set of migration steps that aim to minimize potential risks and helps you use new models in an optimal way.

    [Migrate to Gemini 2 with the Gemini API](../migrate-to-v2.md){: .md-button}

=== "Quick Fix"

    If you need to quickly resolve errors caused by a model reaching its retirement date, you can perform a quick migration by updating the model ID in your application.

    ```mermaid
    flowchart LR
        A[Update model ID] --> B[Test critical features]
        B --> C[Deploy updates]

    click A "#update-model-id"
    click B "#test-critical-features"
    click C "#deploy-updates"
    ```

    ???+ "Quick migration steps"

        <a name="update-model-id"></a>
        **1. Update model ID**

        Update your application code to point to the recommended upgrade model ID.

        <a name="test-critical-features"></a>
        **2. Test critical features**

        Test all mission-critical features to make sure everything works as expected.

        <a name="deploy-updates"></a>
        **3. Deploy updates**

        Deploy the updates to your application.

    !!! tip "Troubleshooting"
        If you encounter issues with code snippets or setup, refer to the [Troubleshooting Guide](https://cloud.google.com/vertex-ai/docs/general/troubleshooting?component=any).

## 📚 Gemini auto-updated aliases

The auto-updated alias of a Gemini model always points to the latest stable model. When a new latest stable model is available, the auto-updated alias automatically points to the new version.

The following table shows the auto-updated aliases for Gemini models and the latest stable models that they point to.

| Auto-updated alias | Stable version reference |
|---|---|
| `gemini-2.0-flash-lite` | `gemini-2.0-flash-lite-001` |
| `gemini-2.0-flash` | `gemini-2.0-flash-001` |
| `gemini-1.5-pro` | `gemini-1.5-pro-002` |
| `gemini-1.5-flash` | `gemini-1.5-flash-002` |

## 🔗 Retired models

??? "View retired models"

    The following table lists the retired models.

    | Model ID | Release date | Retirement date | Recommended upgrade |
    |---|---|---|---|
    | `gemini-1.5-pro-001` | May 24, 2024 | May 24, 2025 | `gemini-2.0-flash` |
    | `gemini-1.5-flash-001` | May 24, 2024 | May 24, 2025 | `gemini-2.0-flash-lite` |
    | `textembedding-gecko@003` | December 12, 2023 | May 24, 2025 | `gemini-embedding-001` |
    | `textembedding-gecko-multilingual@001` | November 2, 2023 | May 24, 2025 | `gemini-embedding-001` |
    | `gemini-1.0-pro-001` | February 15, 2024 | April 21, 2025 | `gemini-2.0-flash` |
    | `gemini-1.0-pro-002` | April 9, 2024 | April 21, 2025 | `gemini-2.0-flash` |
    | `gemini-1.0-pro-vision-001` | February 15, 2024 | April 21, 2025 | `gemini-2.0-flash` |
    | `text-bison` | May 2023 | April 21, 2025 | `gemini-2.0-flash-lite` |
    | `chat-bison` | May 2023 | April 21, 2025 | `gemini-2.0-flash-lite` |
    | `code-gecko` | May 2023 | April 21, 2025 | `gemini-2.0-flash-lite` |
    | `textembedding-gecko@002` | November 2, 2023 | April 21, 2025 | `gemini-embedding-001` |
    | `textembedding-gecko@001` | June 7, 2023 | April 21, 2025 | `gemini-embedding-001` |