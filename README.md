# ADAC (Architecture Diagram as Code)

> **Status:** Release Candidate (Under Community Review)  
> **Version:** 0.1  

ADAC (Architecture Diagram as Code) is an open specification for describing cloud infrastructure architectures in YAML/JSON format. Think of it as **"OpenAPI for infrastructure architecture"**.

## 🎯 Overview

ADAC solves the problem of keeping architecture diagrams and documentation in sync with reality. Instead of manually drawing diagrams in tools like Lucidchart or Visio, you define your architecture in a semantic, version-controlled YAML file.

### Design Goals

*   **Semantic Consistency:** Every element represents a functional architectural component rather than just a visual shape.
*   **Provider Neutrality:** The core schema is designed to support AWS, Azure, GCP, Kubernetes, and on-premise environments. (v0.1 focuses on AWS).
*   **Auditability:** Native support for security, compliance, and cost metadata.

### Why ADAC?

| Before ADAC | After ADAC |
| :--- | :--- |
| Docs scattered across wikis and drawing tools | **Single source of truth** in Git |
| Diagrams stale within weeks | **Always current** via version control |
| Manual, error-prone cost estimates | **built-in cost transparency** |
| Compliance audits take weeks | **Compliance ready** tags and metadata |

## 🚀 Quick Start

### 1. Create Your First ADAC File

Create a file named `my-architecture.adac.yaml`:

```yaml
version: "0.1"

metadata:
  name: "Simple Web Application"
  author: "DevOps Team"
  created: "2026-01-08"
  environment: "production"

infrastructure:
  clouds:
    - id: "aws-prod"
      provider: "aws"
      region: "us-east-1"
      
      services:
        - id: "ecs-frontend"
          service: "ecs-fargate"
          name: "Frontend Container"
          configuration:
            memory_mb: 2048
            instance_count: 2
```

### 2. Validate Your ADAC File

You can validate your content against our JSON schema using any standard JSON Schema validator.

```bash
# Example using AJV CLI
npm install -g ajv-cli
ajv validate -s schema/adac_minimal_schema.json -d my-architecture.adac.yaml
```

## 📚 Documentation & Resources

*   **[Full Specification (v0.1)](spec/adac-v0.1.md)**: Detailed documentation of the entire ADAC standard, including all supported fields and services.
*   **[JSON Schema](schema/adac_minimal_schema.json)**: The machine-readable rules that define a valid ADAC file.
*   **[Examples](examples/)**: Real-world examples found in the `examples` directory:
    *   [Simple Web App](examples/01-simple-web-app/adac_example_webapp.yaml)
    *   [Microservices](examples/02-microservices/adac_example_microservices.yaml)
    *   [Data Pipeline](examples/03-data-pipeline/adac_example_data_pipeline.yaml)

## 🔧 Supported Services (v0.1)

The current version (v0.1) supports **90+ AWS Services**, covering:
*   **Compute:** EC2, ECS, EKS, Lambda, etc.
*   **Database:** RDS, DynamoDB, ElastiCache, Redshift.
*   **Networking:** ALB/NLB, CloudFront, API Gateway, VPC.
*   **Security:** IAM, KMS, WAF, Security Hub.
*   **Others:** Storage, Messaging, Monitoring, AI/ML, Analytics.

See the [Full Specification](spec/adac-v0.1.md) for the complete list.

## 🛣️ Roadmap

| Phase | Status | Focus |
| :--- | :--- | :--- |
| **Phase 1 (MVP)** | ✅ Complete | JSON Schema v0.1, AWS Support, Examples |
| **Phase 2** | 🔄 In Progress | interactive web viewer, Cost Analyzer, CLI Tools |
| **Phase 3** | 📅 Planned | Multi-cloud support (Azure, GCP), Terraform export |

## 🤝 Contributing

We are currently in the **POC phase** and your feedback is crucial! 

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## 📄 License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.
