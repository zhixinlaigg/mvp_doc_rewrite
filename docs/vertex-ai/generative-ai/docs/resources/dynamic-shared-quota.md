# Dynamic shared quota (DSQ)

Dynamic shared quota (DSQ) serves your pay-as-you-go (PayGo) requests with greater flexibility to adapt to your workload needs without you having to manage quotas or submit quota increase requests (QIR). With DSQ, there are no predefined quota limits on your usage. Instead, DSQ provides access to a large, shared pool of resources that are dynamically allocated based on real-time availability and demand across all customers for a given model.

When more customers are active, each customer might receive a lower amount of throughput. Conversely, if there are fewer customers, each customer might receive higher throughput.

## 📚 When to use dynamic shared quota

To help you decide if DSQ is the right choice for your workload, compare it with provisioned throughput, which offers reserved, dedicated capacity.

| Feature | Dynamic Shared Quota (DSQ) | Provisioned Throughput |
| :--- | :--- | :--- |
| **Cost** | Pay-as-you-go based on usage. | Fixed hourly cost for reserved capacity. |
| **Throughput** | Variable and dynamic; depends on overall shared demand. | Guaranteed, stable, and predictable. |
| **Availability** | Not guaranteed. Subject to contention in the shared resource pool during peak demand. | High. Capacity is reserved exclusively for your project. |
| **Best for** | Development, testing, and applications with unpredictable or bursty traffic. | Production applications with predictable, high-traffic needs that require stable latency and throughput. |

For production workloads that require high availability and predictable performance, see [Provisioned Throughput](provisioned-throughput.md).

## 📚 Supported models

The following models and their supervised fine-tuned versions support DSQ.

> **Preview**
>
> The following models are in Preview:
> *   Gemini 2.5 Flash-Lite
> *   Gemini 2.0 Flash with Live API
> *   Gemini 2.0 Flash with image generation

**Generally Available models:**

*   Gemini 2.5 Pro
*   Gemini 2.5 Flash
*   Gemini 2.0 Flash
*   Gemini 2.0 Flash-Lite
*   Gemini 1.5 Pro
*   Gemini 1.5 Flash

## 📚 How dynamic shared quota works

DSQ adapts to your traffic patterns and needs to minimize usage friction. Your project's access to resources is not capped by a predefined limit. Instead, it's determined by the overall capacity of the shared pool and the current collective demand from all customers. This model offers significant flexibility, allowing your workloads to burst and consume more resources when available. It also ensures all customers have an opportunity to access resources without needing to configure per-project quotas.

To ensure a fair and stable experience, DSQ intelligently manages requests, especially during periods of very high demand. Rather than a fixed cap, DSQ uses a dynamic prioritization approach. While the system is designed to accommodate bursts, unusually large and rapid spikes in traffic from a single project might be handled with a different priority than more consistent, steady traffic. This management ensures that broad user activity and regular workloads are protected from transient, extreme spikes, promoting overall system stability and equitable access.

Gemini requests with multi-modal inputs are subject to corresponding system rate limits for images, audio, video, and documents.

## 📚 Understanding `429 resource exhausted` errors

Encountering a `429 resource exhausted` error with DSQ does not mean you have hit a project-specific quota limit. These errors indicate that the shared pool of resources for a specific model in a specific region is experiencing extremely high demand from many users simultaneously.

This is a temporary state of contention for resources, not a fixed limit imposed on your project. DSQ constantly works to distribute available capacity fairly. A `429` error means that instantaneous demand has outstripped the available supply in the shared pool. Unlike a hard quota that would block you even if resources were idle, DSQ aims to grant you access whenever resources are free.

We recommend implementing exponential backoff and retry mechanisms, as availability in this dynamic environment can change quickly. For more tactics on handling these errors, see [Error code 429](../provisioned-throughput/error-code-429.md).

!!! tip "Troubleshooting"
    If you encounter issues with 429 errors or other problems, refer to the [Vertex AI Troubleshooting Guide](https://cloud.google.com/vertex-ai/docs/general/troubleshooting?component=any).

## 🔗 What's next

*   To learn about quotas and limits for Vertex AI, see [Vertex AI quotas and limits](https://cloud.google.com/vertex-ai/docs/quotas).
*   To learn more about Google Cloud quotas and limits, see [Understand quota values and system limits](https://cloud.google.com/compute/docs/quotas/understanding-quota-values).