# ADAC (Architecture Diagram as Code) - Technical Specification (v0.1)

**Status:** v0.1.0 Released
**Editor:** ADAC Community Steering Group
**Version:** 0.1
**Date:** March 2026
**License:** Apache 2.0
**Last Updated:** 2026-03-24

## Overview

ADAC (Architecture Diagram as Code) is an open specification for describing cloud infrastructure architectures in YAML/JSON format. Think of it as "OpenAPI for infrastructure architecture."

### Design Goals

- **Semantic Consistency:** Every element represents a functional architectural component rather than a visual shape.
- **Provider Neutrality:** The core schema is designed to support AWS, Azure, GCP, Kubernetes, and on-premise environments.
- **Auditability:** Native support for security and compliance metadata to streamline auditing processes.

### Terminology

The keywords **MUST**, **MUST NOT**, **REQUIRED**, **SHALL**, **SHALL NOT**, **SHOULD**, **SHOULD NOT**, **RECOMMENDED**, **MAY**, and **OPTIONAL** in this document are to be interpreted as described in RFC 2119.

## Document Structure

An ADAC file **MUST** be a valid YAML 1.2 or JSON document. The root level **MUST** contain the following fields:

| Key              | Type   | Requirement  | Description                                           |
| :--------------- | :----- | :----------- | :---------------------------------------------------- |
| `version`        | string | **REQUIRED** | The ADAC specification version (e.g., "0.1").         |
| `metadata`       | object | **REQUIRED** | Identity, versioning, and environment context.        |
| `applications`   | array  | **OPTIONAL** | Logical application components (microservices, etc.). |
| `infrastructure` | object | **REQUIRED** | Physical cloud resources organized by provider.       |
| `connections`    | array  | **OPTIONAL** | Definitions of traffic flow and dependencies.         |
| `governance`     | object | **OPTIONAL** | Compliance, SLA, and security guardrails.             |

---

## 🎯 What Problem Does This Solve?

### Before ADAC

- Architecture docs scattered across Confluence, Lucidchart, Terraform
- Diagrams become stale within weeks
- No single source of truth
- Cost estimates manual and error-prone
- Compliance audits take weeks

### After ADAC

- ✅ **Single source of truth** - One YAML file in Git
- ✅ **Always current** - Version controlled architecture
- ✅ **Automatic diagrams** - Generate visuals from code
- ✅ **Cost transparency** - Built-in cost metadata
- ✅ **Compliance ready** - Tag services with requirements

## 🚀 Quick Start

### 1. Create Your First ADAC File

Create `my-architecture.adac.yaml`:

```yaml
version: "0.1"

metadata:
  name: "Simple Web Application"
  author: "DevOps Team"
  created: "2025-01-08"
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
    from: "users"
    to: "ecs-frontend"
    type: "api-call"
    protocol: "HTTPS"
```

### 2. Validate Your ADAC File

```bash
# Using adac-tools (reference implementation)
npm install -g @mindfiredigital/adac-diagram
adac validate my-architecture.adac.yaml

# Using JSON Schema directly with ajv-cli
npm install -g ajv-cli
ajv validate -s schema/adac_minimal_schema.json -d my-architecture.adac.yaml
```

### 3. Generate Diagrams and Reports

```bash
# Generate an SVG architecture diagram
adac diagram my-architecture.adac.yaml -o architecture.svg

# Generate cost report
adac cost my-architecture.adac.yaml
```

## 📚 Schema Reference

### Core Structure

```yaml
version: "0.1" # Required: ADAC version
metadata: { ... } # Required: Project metadata
applications: [...] # Optional: Logical applications
infrastructure: # Required: Cloud infrastructure
  clouds: [...]
connections: [...] # Optional: How things connect
cost: { ... } # Optional: Overall cost summary
```

### Metadata Object

```yaml
metadata:
  name: "Project Name" # Required
  description: "Description" # Optional
  author: "Team Name" # Optional
  version: "1.0.0" # Optional (semver)
  created: "2025-01-08" # Required (YYYY-MM-DD)
  updated: "2025-01-08" # Optional
  organization: "Company Name" # Optional
  environment: "production" # Optional
  tags: ["tag1", "tag2"] # Optional
```

**Environment options:** `development`, `staging`, `production`, `test`, `demo`

### Application Object

```yaml
applications:
  - id: "unique-id" # Required (lowercase-with-dashes)
    name: "Human Readable Name" # Required
    type: "microservice" # Required
    technology: "Node.js + Express" # Optional
    description: "What it does" # Optional
    owner: "Team Name" # Optional
    repository: "https://github.com/..." # Optional
    sla: # Optional
      availability_percent: 99.9
      max_latency_ms: 500
      rto_minutes: 15
      rpo_minutes: 5
```

**Application types:**

- `frontend`, `backend`, `api`, `database`, `cache`, `queue`
- `worker`, `batch-job`, `mobile`, `desktop`, `iot`
- `ml-model`, `data-pipeline`, `microservice`

### Infrastructure / Cloud Object

```yaml
infrastructure:
  clouds:
    - id: "aws-prod" # Required
      provider: "aws" # Required (only "aws" in v0.1)
      region: "us-east-1" # Required
      account_id: "123456789012" # Optional (12 digits)
      vpc_id: "vpc-abc123" # Optional
      tier: "primary" # Optional
      services: [...] # AWS services
```

**Tier options:** `primary`, `secondary`, `failover`, `disaster-recovery`, `development`, `test`

**AWS Regions (21 supported):**

- US: `us-east-1`, `us-east-2`, `us-west-1`, `us-west-2`, `ca-central-1`
- EU: `eu-west-1`, `eu-west-2`, `eu-west-3`, `eu-central-1`, `eu-north-1`, `eu-south-1`
- Asia: `ap-south-1`, `ap-northeast-1`, `ap-northeast-2`, `ap-northeast-3`, `ap-southeast-1`, `ap-southeast-2`, `ap-east-1`
- Other: `sa-east-1`, `me-south-1`, `af-south-1`

### AWS Service Object

```yaml
services:
  - id: "unique-service-id" # Required
    service: "rds-postgres" # Required (see supported services)
    name: "Human Readable Name" # Optional
    description: "What it does" # Optional
    runs: ["app-id-1", "app-id-2"] # Optional (which apps run here)

    configuration: # Optional (service-specific)
      instance_type: "db.r5.large"
      instance_count: 2
      storage_gb: 500
      multi_az: true
      # ... see specific service configs below

    availability_zones: [...] # Optional
    security_groups: [...] # Optional
    subnets: [...] # Optional
    iam_role: "..." # Optional
    tags: { ... } # Optional

    cost: # Optional
      monthly_estimate: 650
      currency: "USD"
      breakdown: ["detail 1", "detail 2"]
      pricing_model: "on-demand"

    monitoring: # Optional
      enabled: true
      metrics: [...]
      alarms: [...]
```

## 🎛️ Supported AWS Services (90+)

### Compute (7 services)

- `ec2`, `ecs-fargate`, `ecs-ec2`, `eks`, `lambda`
- `elastic-beanstalk`, `lightsail`, `batch`

### Database (13 services)

- RDS: `rds-mysql`, `rds-postgres`, `rds-mariadb`, `rds-oracle`, `rds-sqlserver`
- Aurora: `rds-aurora-mysql`, `rds-aurora-postgres`
- NoSQL: `dynamodb`, `documentdb`, `neptune`, `timestream`
- Cache: `elasticache-redis`, `elasticache-memcached`
- Data Warehouse: `redshift`

### Storage (5 services)

- `s3`, `efs`, `fsx`, `glacier`, `storage-gateway`

### Networking (10 services)

- Load Balancers: `alb`, `nlb`, `clb`
- CDN/DNS: `cloudfront`, `route53`
- API: `api-gateway-rest`, `api-gateway-http`, `api-gateway-websocket`, `appsync`
- VPC: `vpc`, `direct-connect`, `vpn`, `transit-gateway`, `nat-gateway`, `internet-gateway`, `vpc-peering`, `privatelink`

### Messaging (7 services)

- Queues: `sqs`, `sns`
- Streaming: `kinesis-streams`, `kinesis-firehose`, `kinesis-analytics`, `msk`
- Events: `eventbridge`, `step-functions`

### Monitoring (6 services)

- `cloudwatch`, `cloudwatch-logs`, `x-ray`
- `cloudtrail`, `config`, `systems-manager`

### Security (9 services)

- IAM: `iam`, `cognito`
- Secrets: `secrets-manager`, `kms`
- Protection: `waf`, `shield`, `guardduty`, `security-hub`, `macie`, `inspector`
- Certificates: `acm`

### AI/ML (7 services)

- `sagemaker`, `rekognition`, `comprehend`, `textract`
- `transcribe`, `translate`, `polly`, `bedrock`

### Analytics (6 services)

- `glue`, `athena`, `emr`, `data-pipeline`, `quicksight`

### Developer Tools (8 services)

- CI/CD: `codepipeline`, `codebuild`, `codecommit`, `codedeploy`, `codeartifact`
- Container: `ecr`
- Web: `amplify`
- Email: `ses`, `pinpoint`

### Others (8 services)

- Desktop: `workspaces`, `appstream`
- Operations: `backup`, `cloudformation`, `cdk`, `opsworks`
- DR: `elastic-disaster-recovery`

## 🔗 Connection Object

```yaml
connections:
  - id: "unique-conn-id" # Required
    from: "source-id" # Required (app or service ID)
    to: "target-id" # Required
    type: "api-call" # Required
    protocol: "HTTPS" # Optional
    port: 443 # Optional
    description: "What this connection does" # Optional

    latency_ms: 100 # Optional
    bandwidth_mbps: 1000 # Optional
    requests_per_second: 500 # Optional

    security: # Optional
      encryption_in_transit: true
      tls_version: "TLS1.3"
      authentication_required: true
      authentication_method: "JWT"

    compliance: ["PCI-DSS", "HIPAA"] # Optional
```

**Connection types:**

- API: `api-call`, `authentication`, `authorization`
- Database: `database-query`, `cache-read`, `cache-write`
- Messaging: `message-publish`, `message-consume`, `stream-read`, `stream-write`
- Storage: `file-upload`, `file-download`
- Network: `load-balancing`, `dns-resolution`, `cdn-origin`
- Infrastructure: `replication`, `backup`, `failover`, `vpn-tunnel`, `direct-connect`, `vpc-peering`, `transit-gateway`

**Protocols:**

- HTTP: `HTTP`, `HTTPS`, `HTTP/2`, `HTTP/3`, `WebSocket`
- RPC: `gRPC`, `GraphQL`, `REST`, `SOAP`
- Network: `TCP`, `UDP`
- Messaging: `MQTT`, `AMQP`
- Database: `Redis`, `SQL`, `MongoDB`
- Storage: `S3`, `NFS`, `SMB`, `FTP`, `SFTP`
- Remote: `SSH`, `RDP`

**Authentication methods:**
`IAM`, `API-Key`, `OAuth2`, `JWT`, `SAML`, `BasicAuth`, `Certificate`

**Compliance frameworks:**
`PCI-DSS`, `HIPAA`, `GDPR`, `SOC2`, `ISO27001`, `FedRAMP`

## 💰 Cost Tracking

### Service-Level Costs

```yaml
services:
  - id: "rds-main"
    service: "rds-postgres"
    cost:
      monthly_estimate: 650
      currency: "USD"
      breakdown:
        - "Instance: db.r5.large Multi-AZ × 730 hrs × $0.48 = $350"
        - "Storage: 500GB × $0.23/GB = $115"
        - "Backups: 500GB × $0.095 = $47.50"
        - "I/O operations: ~$100"
        - "Data transfer: ~$37.50"
      pricing_model: "reserved-1yr"
```

**Pricing models:**

- `on-demand` - Pay as you go
- `reserved-1yr` - 1-year Reserved Instance
- `reserved-3yr` - 3-year Reserved Instance
- `spot` - Spot instances
- `savings-plan` - Savings Plans

### Overall Cost Summary

```yaml
cost:
  total_monthly: 5420
  currency: "USD"
  by_service:
    compute: 2100
    database: 1800
    storage: 450
    networking: 320
    monitoring: 250
  by_environment:
    production: 5420
  notes:
    - "Costs based on us-east-1 pricing as of Q1 2026"
    - "Reserved Instances applied (40% savings)"
```

## 🛡️ Service Configuration Examples

### EC2 Configuration

```yaml
configuration:
  instance_type: "t3.medium" # e.g., t3.micro, m5.xlarge
  instance_count: 3
  auto_scaling:
    enabled: true
    min: 2
    max: 10
    target_cpu: 70
  vpc_enabled: true
  public_access: false
```

### RDS Configuration

```yaml
configuration:
  instance_type: "db.r5.large" # e.g., db.t3.micro, db.r5.xlarge
  instance_count: 1
  storage_gb: 500
  storage_type: "gp3" # gp3, gp2, io2, io1, st1, sc1
  multi_az: true
  engine_version: "15.3"
  vpc_enabled: true
  public_access: false
  encryption_enabled: true
  backup_enabled: true
  backup_retention_days: 7
```

### Lambda Configuration

```yaml
configuration:
  memory_mb: 1024 # 128 to 10240
  timeout_seconds: 300 # 1 to 900
  vpc_enabled: false
```

### S3 Configuration

```yaml
configuration:
  storage_gb: 5000
  storage_type: "standard" # standard, intelligent-tiering, glacier
  encryption_enabled: true
  backup_enabled: true
  backup_retention_days: 30
```

### EKS Configuration

```yaml
configuration:
  instance_type: "m5.xlarge"
  instance_count: 6
  auto_scaling:
    enabled: true
    min: 3
    max: 20
    target_cpu: 70
  vpc_enabled: true
  encryption_enabled: true
```

## 📊 Example Use Cases

### 1. Simple Web Application

- Frontend (CloudFront + S3)
- Backend (ECS Fargate)
- Database (RDS PostgreSQL)
- Cache (ElastiCache Redis)

**Cost:** ~$2,200/month  
**Example:** See `examples/simple-web-app.adac.yaml`

### 2. Microservices Architecture

- EKS cluster with 8 microservices
- Aurora PostgreSQL + DynamoDB
- SQS + SNS + Kinesis
- SageMaker ML inference

**Cost:** ~$8,300/month  
**Example:** See `examples/microservices.adac.yaml`

### 3. Data Analytics Pipeline

- Kinesis Streams ingestion
- EMR Flink real-time processing
- Redshift data warehouse
- QuickSight dashboards

**Cost:** ~$23,600/month  
**Example:** See `examples/data-pipeline.adac.yaml`

## ✅ Validation Rules

The JSON Schema enforces:

1. **Required fields:** `version`, `metadata.name`, `metadata.created`, `infrastructure`
2. **ID format:** Lowercase letters, numbers, hyphens only (`^[a-z0-9-]+$`)
3. **AWS Account ID:** Exactly 12 digits
4. **VPC ID:** Format `vpc-[a-z0-9]+`
5. **Security Group ID:** Format `sg-[a-z0-9]+`
6. **Subnet ID:** Format `subnet-[a-z0-9]+`
7. **Availability Zone:** Format like `us-east-1a`
8. **Valid enums:** All service types, regions, connection types checked
9. **Date format:** ISO 8601 (YYYY-MM-DD)
10. **SemVer:** Version follows semantic versioning

## 🔧 Tooling (adac-tools)

The official tooling that implements this specification is **[adac-tools](https://github.com/mindfiredigital/adac-tools)**.

### v0.1.0 — Released alongside this specification

- ✅ `adac validate` — validates any `.adac.yaml` file against this schema
- ✅ `adac diagram` — generates an SVG architecture diagram with 1,600+ embedded AWS icons
- ✅ `adac cost` — calculates per-service cost breakdown from ADAC metadata
- ✅ Compliance checker — evaluates architecture against PCI-DSS, HIPAA, SOC2, GDPR, ISO27001
- ✅ Dual layout engines — ELK.js (complex graphs) + Dagre (lightweight)
- ✅ React web UI — visual editor (in progress)

### v0.2.0 — Planned

- Interactive web viewer
- IaC exports (Terraform, CloudFormation, Kubernetes)
- Azure + GCP diagram support
- VS Code extension

## 🤝 Contributing

Your feedback shapes the spec. The best contributions at this stage are:

1. **Try the spec** — document a real architecture you work with
2. **Report gaps** — what services, fields, or connection types are missing?
3. **Open a spec proposal** — use the `spec-proposal` issue label
4. **Build tools** — parsers, exporters, exporters, IDE plugins

See [CONTRIBUTING.md](../CONTRIBUTING.md) for the full process.

## 📝 Changelog

### v0.1.0 (2026-03-24) — Initial public release

- Complete JSON Schema covering 90+ AWS services
- RFC 2119 specification document
- 7 real-world example architectures
- Cost, compliance, and SLA metadata support
- Connection modeling with security annotations

### v0.2.0 — Upcoming

- Azure service definitions
- GCP service definitions
- Kubernetes resource types
- Multi-cloud connection types

## 🔗 Resources

- **Schema:** [`schema/adac_minimal_schema.json`](../schema/adac_minimal_schema.json)
- **Examples:** [`examples/`](../examples/) directory
- **adac-tools (CLI + diagram engine):** [github.com/mindfiredigital/adac-tools](https://github.com/mindfiredigital/adac-tools)
- **GitHub:** [github.com/mindfiredigital/adac-specification](https://github.com/mindfiredigital/adac-specification)
- **Discussions:** [github.com/mindfiredigital/adac-specification/discussions](https://github.com/mindfiredigital/adac-specification/discussions)

## 📄 License

Apache 2.0 — see [LICENSE](../LICENSE)

---

**Status:** v0.1.0 Released
**Feedback:** Open a [GitHub Issue](https://github.com/mindfiredigital/adac-specification/issues) or [Discussion](https://github.com/mindfiredigital/adac-specification/discussions)
