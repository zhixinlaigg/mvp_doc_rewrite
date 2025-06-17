# Provisioned Throughput overview

This page explains what Provisioned Throughput is, compares it with the pay-as-you-go consumption model, and helps you decide when to use it.

## 📚 What is Provisioned Throughput?

Provisioned Throughput is a subscription-based service that reserves processing capacity for supported generative AI models on Vertex AI. When you purchase Provisioned Throughput, you pay a fixed cost for a specific term length (e.g., weekly or monthly) to guarantee a certain level of performance for a chosen model in a specific location.

Throughput is a measure of how many requests a model can handle in a given period. For example, throughput for a text model might be measured in requests per minute (RPM) or tokens per minute (TPM). By reserving throughput, you ensure that your application has dedicated resources, leading to consistent and low latency.

You can reserve throughput for [supported generative AI models](supported-models.md).

## 📚 Consumption models for generative AI models

Vertex AI offers two primary consumption models for its generative AI models: Provisioned Throughput and Pay-as-you-go. The best choice depends on your application's traffic patterns, performance requirements, and budget predictability.

The following table compares the two models to help you decide which is right for your use case.

| Feature | Provisioned Throughput | Pay-as-you-go (On-demand) |
| :--- | :--- | :--- |
| **Best for** | Production applications with consistent, high-traffic workloads, such as real-time chatbots and agents. | Applications with variable or unpredictable traffic, or for development and testing phases. |
| **Cost Model** | Fixed-cost subscription (weekly or monthly) for a reserved amount of throughput. | Pay only for what you use, based on the number of input and output characters. |
| **Performance** | Guaranteed throughput and low, stable latency due to dedicated resources. | Performance is subject to shared capacity, which can lead to variable latency or rate limiting (429 errors) during peak demand. |
| **Key Benefit** | Predictable costs and consistent performance for critical workloads. | Cost-effective for low-traffic applications and offers maximum flexibility with no upfront commitment. |

## 🔗 What's next

*   Learn about [supported models](supported-models.md) for Provisioned Throughput.
*   Understand how to troubleshoot [rate limit errors](error-code-429.md#troubleshoot-dynamic-shared-quota) in the pay-as-you-go model.