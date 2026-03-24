# Changelog

All notable changes to ADAC Specification are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [0.1.0] — 2026-03-24

### Added

- Complete JSON Schema (`schema/adac_minimal_schema.json`) covering 90+ AWS services
- Full technical specification document (`spec/adac-v0.1.md`), RFC 2119 compliant
- 3 real-world example architectures:
  - 01 Simple Web App (ECS + RDS + CloudFront)
  - 02 Microservices (EKS + SQS/SNS)
  - 03 Data Pipeline (Kinesis + EMR + Redshift)
- Community governance files: `CONTRIBUTING.md`, `GOVERNANCE.md`, `CODE_OF_CONDUCT.md`
- GitHub issue templates and PR template
- CI workflow to validate all examples against schema on every push/PR
- Apache 2.0 license

### Supported AWS services (v0.1)

Compute, Database, Networking, Security, Storage, Messaging, AI/ML, Analytics, Monitoring, Developer Tools — see `spec/adac-v0.1.md` for the full list.

---

## [Unreleased] — v0.2.0

### Planned

- Azure service definitions
- GCP service definitions
- Kubernetes resource types
- Multi-cloud connection types
- Updated JSON Schema
