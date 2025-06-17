# Provisioned Throughput overview

This page provides an overview of Provisioned Throughput for Vertex AI's generative AI models, explains its use cases, and compares it with the on-demand consumption model.

## 📚 What is Provisioned Throughput?

Provisioned Throughput is a subscription-based service that reserves a specific amount of processing capacity for supported generative AI models on Vertex AI. By purchasing throughput for a fixed term (e.g., weekly or monthly), you get dedicated, reserved capacity for your chosen model in a specific location. This ensures consistent performance and predictable costs for your applications.

For example, if you are building a customer service chatbot that needs to handle 10 queries per second consistently, you can reserve that capacity with Provisioned Throughput to ensure low latency and a stable user experience, even during peak hours.

## 📚 When to choose a consumption model

Vertex AI offers two consumption models for its generative AI models: Provisioned Throughput and on-demand (also known as pay-as-you-go). Your choice depends on your application's requirements for performance, cost predictability, and traffic patterns.

The following table provides a comparison to help you decide which model best suits your needs.

| Feature | Provisioned Throughput | On-demand (Pay-as-you-go) |
| :--- | :--- | :--- |
| **Best for** | Production applications with consistent, high-traffic workloads, such as real-time chatbots and agents. | Applications with variable or unpredictable traffic, or for development and testing phases. |
| **Cost Model** | Fixed-cost subscription (weekly or monthly) for reserved capacity. Overages may incur additional charges. | Pay only for what you use based on the number of input and output characters. |
| **Throughput** | Reserved and guaranteed, providing stable capacity for your workloads. | Shared, dynamic capacity. Subject to rate limits and potential for `429` errors during high demand. |
| **Performance** | Consistent and predictable low latency due to dedicated resources. | Latency can vary depending on overall system load and shared resource availability. |

## 🔗 What's next

*   Learn about the [supported models for Provisioned Throughput](../provisioned-throughput/supported-models.md).
*   Understand how to troubleshoot [on-demand quota errors](../provisioned-throughput/error-code-429.md#troubleshoot-dynamic-shared-quota).