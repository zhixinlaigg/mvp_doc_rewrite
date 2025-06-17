# Use Provisioned Throughput

This page explains how Provisioned Throughput works, how to control overages or bypass Provisioned Throughput, and how to monitor usage.

## 📚 How Provisioned Throughput works

This section explains how Provisioned Throughput works by using quota checking through the quota enforcement period.

### Provisioned Throughput quota checking

Your Provisioned Throughput maximum quota is a multiple of the number of generative AI scale units (GSUs) purchased and the throughput per GSU. It's checked each time you make a request within your _quota enforcement period_, which is how frequently the maximum Provisioned Throughput quota is enforced.

At the time a request is received, the true response size is unknown. Because we prioritize speed of response for real-time applications, Provisioned Throughput estimates the output token size. If the initial estimate exceeds the available Provisioned Throughput maximum quota, the request is processed as pay-as-you-go. Otherwise, it is processed as Provisioned Throughput. This is done by comparing the initial estimate to your Provisioned Throughput maximum quota.

When the response is generated and the true output token size is known, actual usage and quota are reconciled by adding the difference between the estimate and the actual usage to your available Provisioned Throughput quota amount.

### Provisioned Throughput quota enforcement period

For `gemini-2.0-flash-lite` and `gemini-2.0-flash` models, the quota enforcement period can take up to 30 seconds and is subject to change. This means that you might temporarily experience prioritized traffic that exceeds your quota amount on a per-second basis in some cases, but you shouldn't exceed your quota on a 30-second basis. These periods are based on the Vertex AI internal clock time and are independent of when requests are made.

For example, if you purchase one GSU of `gemini-2.0-flash-001`, then you should expect 3,360 tokens per second of always-on throughput. On average, you can't exceed 100,800 tokens on a 30-second basis, which is calculated using the following formula:

```

3,360 tokens per second * 30 seconds = 100,800 tokens
```

If, in a day, you submitted only one request that consumed 8,000 tokens in a second, it might still be processed as a Provisioned Throughput request, even though you exceeded your 3,360 tokens per second limit at the time of the request. This is because the request didn't exceed the threshold of 100,800 tokens per 30 seconds.

## ⚙️ Control overages or bypass Provisioned Throughput

You can use the API to control overages when you exceed your purchased throughput or to bypass Provisioned Throughput on a per-request basis. The following table compares the available options.

| Behavior | Description | Use Case | How to enable |
|---|---|---|---|
| **Default (Spillover to on-demand)** | If you exceed your purchased throughput, the overage traffic is processed using on-demand and billed at the pay-as-you-go rate. | You want to ensure all requests are processed, even if it means incurring pay-as-you-go charges for overages. | No action needed. This is the default behavior after your order is active. |
| **Use only Provisioned Throughput** | Requests that exceed the Provisioned Throughput order amount return an [error `429`](error-code-429.md). No traffic spills over to on-demand. | You need to strictly manage costs and prevent any on-demand charges. | Set the `X-Vertex-AI-LLM-Request-Type` HTTP header to `dedicated`. |
| **Use only pay-as-you-go** | Requests bypass the Provisioned Throughput order and are sent directly to pay-as-you-go. This is also referred to as using on-demand. | You want to run experiments or development workloads without consuming your Provisioned Throughput quota. | Set the `X-Vertex-AI-LLM-Request-Type` HTTP header to `shared`. |

### Set the request type

To implement the "Use only Provisioned Throughput" or "Use only pay-as-you-go" behaviors, you must set the `X-Vertex-AI-LLM-Request-Type` HTTP header in your API requests.

=== "Gen AI SDK for Python"

    **Install the SDK**

    Install the Generative AI SDK for Python and configure your environment variables. To learn more, see the [SDK reference documentation](https://googleapis.github.io/python-genai/).

    ```

    pip install --upgrade google-genai
    ```

    Set environment variables to use the Gen AI SDK with Vertex AI:

    ```

    # Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
    # with appropriate values for your project.
    export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
    export GOOGLE_CLOUD_LOCATION=us-central1
    export GOOGLE_GENAI_USE_VERTEXAI=True
    ```

    **Set the header**

    The following example shows how to set the `X-Vertex-AI-LLM-Request-Type` header to `shared` to use pay-as-you-go. Change the value to `dedicated` to use only Provisioned Throughput.

    ```python

    from google import genai
    from google.genai.types import HttpOptions

    client = genai.Client(
        http_options=HttpOptions(
            api_version="v1",
            headers={
                # Options:
                # - "dedicated": Use Provisioned Throughput
                # - "shared": Use pay-as-you-go
                # https://cloud.google.com/vertex-ai/generative-ai/docs/use-provisioned-throughput
                "X-Vertex-AI-LLM-Request-Type": "shared"
            },
        )
    )
    response = client.models.generate_content(
        model="gemini-2.5-flash-preview-05-20",
        contents="How does AI work?",
    )
    print(response.text)
    # Example response:
    # Okay, let's break down how AI works. It's a broad field, so I'll focus on the ...
    #
    # Here's a simplified overview:
    # ...
    ```

=== "REST"

    After you [set up your environment](../start/quickstarts/quickstart-multimodal.md#gemini-setup-environment-drest), you can use a cURL command to send a request.

    The following sample sends a request with the `X-Vertex-AI-LLM-Request-Type` header set to `dedicated` to use only Provisioned Throughput. Change the value to `shared` to use pay-as-you-go.

    ```

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      -H "X-Vertex-AI-LLM-Request-Type: dedicated" \ # Options: dedicated, shared
      $URL \
      -d '{"contents": [{"role": "user", "parts": [{"text": "Hello."}]}]}'
    ```

!!! tip "Troubleshooting"
    If you encounter issues with code snippets or setup, refer to the [Troubleshooting Guide](https://cloud.google.com/vertex-ai/docs/general/troubleshooting?component=any).

## ⚙️ Monitor Provisioned Throughput

> **Preview**
>
> This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](/terms/service-terms#1). Pre-GA features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](/products#product-launch-stages).

You can self-monitor your Provisioned Throughput usage using a set of metrics that are measured on the `aiplatform.googleapis.com/PublisherModel` resource type.

**Dimensions**

You can filter on metrics using the following dimensions:

| **Dimension** | **Values** |
|---|---|
| `type` | `input` <br> `output` |
| `request_type` | **`dedicated`**: Traffic is processed using Provisioned Throughput. <br> **`spillover`**: Traffic is processed as pay-as-you-go quota after you exceed your Provisioned Throughput quota. <br> **`shared`**: If Provisioned Throughput is active, then traffic is processed as pay-as-you-go quota using the shared [HTTP header](use-provisioned-throughput.md#use-only-pay-as-you-go). If Provisioned Throughput isn't active, then traffic is processed as pay-as-you-go, by default. |

**Path prefix**

The path prefix for a metric is `aiplatform.googleapis.com/publisher/online_serving`.

For example, the full path for the `/consumed_throughput` metric is `aiplatform.googleapis.com/publisher/online_serving/consumed_throughput`.

**Metrics**

The following Cloud Monitoring metrics are available on the `aiplatform.googleapis.com/PublisherModel` resource for the Gemini models. Use the `dedicated` request types to filter for Provisioned Throughput usage.

| Metric | Display name | Description |
|---|---|---|
| `/dedicated_gsu_limit` | **Limit (GSU)** | Dedicated limit in GSUs. Use this metric to understand your Provisioned Throughput maximum quota in GSUs. |
| `/tokens` | **Tokens** | Input and output token count distribution. |
| `/token_count` | **Token count** | Accumulated input and output token count. |
| `/consumed_token_throughput` | **Token throughput** | Throughput usage, which accounts for the burndown rate in tokens and incorporates quota reconciliation. See Provisioned Throughput quota checking. <br><br> Use this metric to understand how your Provisioned Throughput quota was used. |
| `/dedicated_token_limit` | **Limit (tokens per second)** | Dedicated limit in tokens per second. Use this metric to understand your Provisioned Throughput maximum quota for token-based models. |
| `/characters` | **Characters** | Input and output character count distribution. |
| `/character_count` | **Character count** | Accumulated input and output character count. |
| `/consumed_throughput` | **Character throughput** | Throughput usage, which accounts for the burndown rate in characters and incorporates quota reconciliation Provisioned Throughput quota checking. <br><br> Use this metric to understand how your Provisioned Throughput quota was used. <br><br> For token-based models, this metric is equivalent to the throughput consumed in tokens multiplied by 4. |
| `/dedicated_character_limit` | **Limit (characters per second)** | Dedicated limit in characters per second. Use this metric to understand your Provisioned Throughput maximum quota for character-based models. |
| `/model_invocation_count` | **Model invocation count** | Number of model invocations (prediction requests). |
| `/model_invocation_latencies` | **Model invocation latencies** | Model invocation latencies (prediction latencies). |
| `/first_token_latencies` | **First token latencies** | Duration from request received to first token returned. |

Anthropic models also have a filter for Provisioned Throughput but only for `tokens/token_count`.

### Monitor with dashboards and alerts

Default monitoring dashboards and alerts for Provisioned Throughput provide metrics that let you better understand your usage and utilization.

??? "Access the monitoring dashboards"

    1. In the Google Cloud console, go to the **Provisioned Throughput** page.

        [Go to Provisioned Throughput](https://console.cloud.google.com/vertex-ai/provisioned-throughput){: .md-button}

    2. To view the Provisioned Throughput utilization of each model across your orders, select the **Utilization summary** tab.

    3. Select a model from the **Provisioned Throughput utilization by model** table to see more metrics specific to the selected model.

??? "Understand dashboard limitations"

    The dashboard might display unexpected results, especially for fluctuating traffic that's either spiky or infrequent (for example, less than 1 query per second). The following reasons might contribute to those results:

    *   Time ranges that are larger than 12 hours can lead to a less accurate representation of the quota enforcement period. Throughput metrics and their derivatives, such as utilization, display averages across alignment periods that are based on the selected time range. When the time range expands, each alignment period also expands. The alignment period expands across the calculation of the average usage. Because quota enforcement is calculated at a sub-minute level, setting the time range to a period of 12 hours or less results in minute-level data that is more comparable to the actual quota enforcement period. For more information on alignment periods, see [Alignment: within-series regularization](/monitoring/api/v3/aggregation#alignment-intro). For more information about time ranges, see [Regularizing time intervals](/monitoring/api/v3/aggregation#time-bucketing).
    *   If multiple requests were submitted at the same time, monitoring aggregations might impact your ability to filter down to specific requests.
    *   Provisioned Throughput throttles traffic when a request was made but reports usage metrics after the quota is reconciled.
    *   Provisioned Throughput quota enforcement periods are independent from and might not align with monitoring aggregation periods or request-or-response periods.
    *   If no errors occurred, you might see an error message within the error rate chart. For example, _An error occurred requesting data. One or more resources could not be found._

??? "Enable and view alerts"

    After alerting is enabled, set default alerts to help you manage your traffic usage.

    **Enable alerts**

    To enable alerts in the dashboard, do the following:

    1. In the Google Cloud console, go to the **Provisioned Throughput** page.

        [Go to Provisioned Throughput](https://console.cloud.google.com/vertex-ai/provisioned-throughput){: .md-button}

    2. To view the Provisioned Throughput utilization of each model across your orders, select the **Utilization summary** tab.

    3. Select **Recommended alerts**, and the following alerts display:

        * `Provisioned Throughput Usage Reached Limit`
        * `Provisioned Throughput Utilization Exceeded 80%`
        * `Provisioned Throughput Utilization Exceeded 90%`
    4. Check the alerts that help you manage your traffic.

    **View more alert details**

    To view more information about alerts, do the following:

    1. Go to the **Integrations** page.

        [Go to Integrations](https://console.cloud.google.com/monitoring/integrations){: .md-button}

    2. Enter `vertex` into the **Filter** field and press **Enter**. **Google Vertex AI** appears.

    3. To view more information, click **View details**. The **Google Vertex AI details** pane displays.

    4. Select **Alerts** tab, and you can select an **Alert Policy** template.

## 🔗 What's next

*   Troubleshoot [Error code `429`](error-code-429.md#troubleshoot-provisioned-through).