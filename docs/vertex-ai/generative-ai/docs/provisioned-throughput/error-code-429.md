# Error code 429

A `429` error code indicates that the number of requests has exceeded the available capacity. The specific error message depends on your quota framework.

## 📚 Understanding the `429` Error

The error message you receive depends on whether you are using a pay-as-you-go model or have reserved capacity with Provisioned Throughput.

| Quota framework | Message |
|---|---|
| Pay-as-you-go | `Resource exhausted, please try again later.` |
| Provisioned Throughput | `Too many requests. Exceeded the Provisioned Throughput.` |

With a Provisioned Throughput subscription, you reserve a specific amount of throughput for your generative AI models. If you don't have a Provisioned Throughput subscription and resources aren't available, a `429` error is returned. While you can retry the request, it is not counted against your error rate as defined in your service level agreement (SLA).

For projects with purchased Provisioned Throughput, Vertex AI reserves the purchased throughput for your project's usage.
*   If you use less than your purchased throughput, errors that might otherwise be `429` are returned as `5XX` and are counted as part of the error rate described in the SLA.
*   If you use more than your purchased throughput, the additional requests are processed as pay-as-you-go.

## ⚙️ Resolving `429` Errors

Your approach to resolving `429` errors depends on your project's quota framework. The following table summarizes the options available for each.

| Quota Framework | Resolution Strategies |
|---|---|
| **Pay-as-you-go** | <ul><li>Implement a retry strategy (e.g., exponential backoff).</li><li>Request a quota increase if your model uses quotas.</li><li>Smooth traffic to reduce spikes if using Dynamic Shared Quota.</li><li>Subscribe to Provisioned Throughput for guaranteed capacity.</li></ul> |
| **Provisioned Throughput** | <ul><li>Allow overages to be processed as pay-as-you-go.</li><li>Increase the number of purchased GSUs in your subscription.</li></ul> |

Select the tab that corresponds to your quota framework for detailed guidance.

=== "Pay-as-you-go"

    On the pay-as-you-go quota framework, you have the following options to resolve `429` errors:

    *   Use the global endpoint instead of a regional endpoint whenever possible.
    *   Implement a retry strategy by using truncated exponential backoff.
    *   If your model uses quotas, you can submit a Quota Increase Request (QIR). If your model uses [Dynamic shared quota](../dynamic-shared-quota.md#supported_models), smoothing traffic and reducing large spikes can help. For more information, see [Dynamic shared quota (DSQ)](../dynamic-shared-quota.md).
    *   Subscribe to Provisioned Throughput for a more consistent level of service. For more information, see [Provisioned Throughput](../resources/provisioned-throughput.md).

    !!! tip "Troubleshooting"
        If you encounter issues with code snippets or setup, refer to the [Troubleshooting Guide](https://cloud.google.com/vertex-ai/docs/general/troubleshooting?component=any).

=== "Provisioned Throughput"

    To correct the `429` error when using Provisioned Throughput, do the following:

    *   Use the [Default behavior](use-provisioned-throughput.md#default), which doesn't set a header in prediction requests. Any overages are processed on-demand and billed as pay-as-you-go.
    *   Increase the number of GSUs in your Provisioned Throughput subscription.

    !!! tip "Troubleshooting"
        If you encounter issues with code snippets or setup, refer to the [Troubleshooting Guide](https://cloud.google.com/vertex-ai/docs/general/troubleshooting?component=any).

## 🔗 What's next

*   To learn more about dynamic shared quota, see [Dynamic shared quota](../dynamic-shared-quota.md).
*   To learn more about Provisioned Throughput, see [Provisioned Throughput](../resources/provisioned-throughput.md).
*   To learn about quotas and limits for Vertex AI, see [Vertex AI quotas and limits](https://cloud.google.com/vertex-ai/docs/quotas).
*   To learn more about Google Cloud quotas and limits, see [Understand quota values and system limits](https://cloud.google.com/compute/docs/quotas/understanding-quota-values).
*   To learn more about API errors, see [API errors](https://cloud.google.com/apis/design/errors).