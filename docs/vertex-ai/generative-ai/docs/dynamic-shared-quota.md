# Dynamic shared quota (DSQ)

Dynamic shared quota (DSQ) serves your pay-as-you-go (PayGo) requests with greater flexibility to adapt to your workload needs without you having to manage quotas and quota increase requests (QIR). With DSQ, there are no predefined quota limits on your usage. Instead, DSQ provides access to a large, shared pool of resources, dynamically allocated based on real-time availability and demand across all customers of that model. When more customers are active, each customer gets a lower amount of throughput. Similarly, if there are fewer customers, each customer might get higher throughput.

## 📚 When to use Dynamic Shared Quota

Vertex AI offers two primary ways to manage throughput for generative AI models: Dynamic Shared Quota (DSQ) and Provisioned Throughput. DSQ is the default for all pay-as-you-go usage, while Provisioned Throughput is an add-on service.

The following table compares the two options to help you decide which is best for your workload.

| Feature | Dynamic Shared Quota (DSQ) | Provisioned Throughput |
| :--- | :--- | :--- |
| **Best for** | Development, testing, and applications with variable or bursty traffic. | Production applications requiring guaranteed throughput and low, predictable latency. |
| **Performance** | Throughput is dynamic and depends on shared capacity and overall demand. Latency can be variable. | Throughput is guaranteed and reserved for your project. Provides stable, low latency. |
| **Availability** | Access to a large, shared pool of resources. Subject to resource contention during peak demand, which can result in `429` errors. | High availability with reserved capacity. Not subject to contention from other customers. |
| **Cost** | Pay-as-you-go pricing. You only pay for what you use. | Billed per hour for the reserved compute units, in addition to pay-as-you-go usage costs. |

To learn more about Provisioned Throughput, see [When to use provisioned throughput](resources/provisioned-throughput.md).

## 📚 How DSQ works

Dynamic Shared Quota (DSQ) adapts to your traffic patterns and needs and minimizes usage frictions. Your project's access to resources under DSQ is not capped by an arbitrary number. Instead, it's determined by the overall capacity of the shared pool and the current collective demand from all customers. This model is designed to offer significant flexibility, allowing your workloads to burst and consume more resources when available. Conversely, it also allows all customers of the shared pool to have a chance to access resources when available without requiring them to configure per-customer quota.

To ensure a fair and stable experience for all users in the shared resource environment, DSQ intelligently manages how requests are handled, especially during periods of very high demand from isolated sources. Rather than a fixed cap, DSQ employs a dynamic prioritization approach. This means that while the system is designed to accommodate bursts, unusually large and rapid spikes in traffic from a single source might be handled with a different priority than more consistent, steady traffic. This sophisticated management ensures that broad user activity and regular workloads are protected from transient, extreme spikes, promoting overall system stability and equitable access.

Gemini requests with multi-modal inputs are subject to the corresponding system rate limits that include image, audio, video, and document.

## 🔗 Supported models

The following Gemini models and their supervised fine-tuned models support DSQ:

*   Gemini 2.5 Pro
*   Gemini 2.5 Flash
*   Gemini 2.0 Flash
*   Gemini 2.0 Flash-Lite
*   Gemini 1.5 Pro
*   Gemini 1.5 Flash

> **Preview**
>
> The following models in Preview also support DSQ:
> *   Gemini 2.5 Flash-Lite
> *   Gemini 2.0 Flash with Live API
> *   Gemini 2.0 Flash with image generation

## 📚 Understanding Resource Exhaustion 429 errors under DSQ

Encountering a `resource exhausted` (429) error can be frustrating. With DSQ, this error does not mean you have hit a fixed quota limit on your project. Instead, it indicates that the shared pool of resources for a specific model in a specific region is experiencing extremely high demand from many users simultaneously.

Think of it like trying to get on a very popular train during peak rush hour. There isn't a 'ticket limit' specifically for you, but the train itself might be momentarily full. It's a temporary state of contention for resources, not a fixed limit imposed on your project.

DSQ constantly works to manage and distribute the available capacity fairly and efficiently. When you receive a `429` error, it means instantaneous demand has outstripped the available supply in that shared pool. Unlike a hard quota where you'd be blocked even if resources were idle, DSQ aims to give you access whenever resources become free.

We recommend implementing retry mechanisms, as availability in this dynamic environment can change quickly. For more tactics for handling Resource Exhaustion errors, see [A guide to handling 429 errors](provisioned-throughput/error-code-429.md).

## 🔗 What's next

*   To learn about quotas and limits for Vertex AI, see [Vertex AI quotas and limits](https://cloud.google.com/vertex-ai/docs/quotas).
*   To learn more about Google Cloud quotas and limits, see [Understand quota values and system limits](https://cloud.google.com/compute/docs/quotas/understanding-quota-values).