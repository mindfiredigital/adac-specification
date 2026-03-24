# ADAC (Architecture Diagram as Code)

> **Status:** v0.1.0 Release
> **License:** Apache 2.0

ADAC is an open specification for describing cloud infrastructure architectures in YAML/JSON format. Think of it as **"OpenAPI for infrastructure architecture"** — a single versioned file that replaces scattered Lucidcharts, Confluence pages, and stale docs.

---

## Why ADAC?

| Before ADAC                                   | After ADAC                                 |
| :-------------------------------------------- | :----------------------------------------- |
| Docs scattered across wikis and drawing tools | **Single source of truth** in Git          |
| Diagrams stale within weeks                   | **Always current** via version control     |
| Manual, error-prone cost estimates            | **Built-in cost metadata**                 |
| Compliance audits take weeks                  | **Compliance-ready** tags on every service |

---

## Quick Start

### 1. Write your architecture

Create `my-architecture.adac.yaml`:

```yaml
version: "0.1"

metadata:
  name: "Simple Web Application"
  author: "DevOps Team"
  created: "2026-01-08"
  environment: "production"

applications:
  - id: "web-app"
    name: "Frontend"
    type: "frontend"
    technology: "React 18"

infrastructure:
  clouds:
    - id: "aws-prod"
      provider: "aws"
      region: "us-east-1"
      services:
        - id: "ecs-frontend"
          service: "ecs-fargate"
          name: "Frontend Container"
          runs: ["web-app"]
          configuration:
            memory_mb: 2048
            instance_count: 2
          cost:
            monthly_estimate: 150
            currency: "USD"

connections:
  - id: "user-to-ecs"
    from: "external-users"
    to: "ecs-frontend"
    type: "api-call"
    protocol: "HTTPS"
```

### 2. Validate against the schema

The schema targets **JSON Schema Draft 2020-12**. Use an ajv-based validator:

```bash
npm install -g ajv-cli ajv-formats
ajv validate --spec=draft2020 -s schema/adac_minimal_schema.json -d my-architecture.adac.yaml
```

---

## Generate Diagrams and More

> This spec is tool-agnostic. Any tool that implements the ADAC standard can consume your YAML file.

**[adac-tools](https://github.com/mindfiredigital/adac-tools)** is the reference implementation — a CLI and library that builds on this spec:

```bash
npm install -g @mindfiredigital/adac-diagram

adac validate my-architecture.adac.yaml          # validate
adac diagram  my-architecture.adac.yaml -o out.svg  # generate SVG diagram
adac cost     my-architecture.adac.yaml           # cost breakdown
```

---

## Documentation

| Resource                                                        | Description                                            |
| :-------------------------------------------------------------- | :----------------------------------------------------- |
| **[Full Specification (v0.1)](spec/adac-v0.1.md)**              | Complete ADAC standard — all fields, enums, and rules  |
| **[JSON Schema](schema/adac_minimal_schema.json)**              | Machine-readable schema for validation and IDE support |
| **[Examples](examples/)**                                       | 3 real-world reference architectures                   |
| **[adac-tools](https://github.com/mindfiredigital/adac-tools)** | CLI, diagram engine, cost analysis, compliance checker |

### Example files

| Example                                                                         | Description                              |
| :------------------------------------------------------------------------------ | :--------------------------------------- |
| [01 — Simple Web App](examples/01-simple-web-app/adac_example_webapp.yaml)      | 3-tier web app on ECS + RDS + CloudFront |
| [02 — Microservices](examples/02-microservices/adac_example_microservices.yaml) | EKS microservices with SQS/SNS messaging |
| [03 — Data Pipeline](examples/03-data-pipeline/adac_example_data_pipeline.yaml) | Kinesis + EMR + Redshift analytics stack |

---

## Supported Services (v0.1)

**90+ AWS services** across:

- **Compute:** EC2, ECS Fargate, EKS, Lambda, App Runner, Lightsail
- **Database:** RDS (Postgres, MySQL, Aurora), DynamoDB, ElastiCache, Redshift, Neptune
- **Networking:** ALB, NLB, CloudFront, API Gateway (REST + HTTP + WebSocket), Route 53, VPC, Direct Connect
- **Security:** IAM, KMS, WAF, ACM, Secrets Manager, Security Hub, GuardDuty, Inspector
- **Storage:** S3, EBS, EFS, FSx
- **Messaging:** SQS, SNS, EventBridge, Kinesis, MSK (Kafka), MQ
- **Monitoring:** CloudWatch, X-Ray
- **AI/ML:** SageMaker, Rekognition, Comprehend, Textract, Bedrock
- **Analytics:** Athena, Glue, EMR, QuickSight, Data Pipeline
- **Developer Tools:** CodePipeline, CodeBuild, CodeDeploy, ECR

See the [full specification](spec/adac-v0.1.md) for every supported field and enum.

---

## Design Goals

- **Semantic consistency:** Every element is a real architectural component, not a visual shape
- **Provider neutrality:** Schema supports AWS, Azure, GCP, Kubernetes, on-premise (v0.1 focuses on AWS)
- **Auditability:** Native compliance (`PCI-DSS`, `HIPAA`, `SOC2`, `GDPR`) and cost metadata built into the format
- **Toolability:** JSON Schema–compatible so any editor can provide autocomplete and validation

---

## Roadmap

| Phase       | Version | Status         | Focus                                                        |
| :---------- | :------ | :------------- | :----------------------------------------------------------- |
| **Phase 1** | v0.1.0  | ✅ Released    | JSON Schema, 90+ AWS services, 3 examples, CLI tooling       |
| **Phase 2** | v0.2.0  | 🔄 In Progress | Azure + GCP service definitions, Web UI, IaC exports         |
| **Phase 3** | v0.3.0  | 📅 Planned     | Multi-cloud connections, VS Code extension, Terraform export |

---

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for how to open issues, propose spec changes, and submit pull requests.

The primary place for spec discussion is **GitHub Issues** in this repo. For tooling bugs or feature requests, open an issue in [adac-tools](https://github.com/mindfiredigital/adac-tools/issues).

---

## License

Apache 2.0 — see [LICENSE](LICENSE).
