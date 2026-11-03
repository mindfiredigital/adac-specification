---
title: Full Schema Specification
---

# Core Schema

The ADAC specification defines a standard structure for modeling cloud infrastructure architectures.

:::info Status
The core schema is currently in **v0.1** (Release Candidate). All feedback is welcome.
:::

:::info In this reference
**Time to read:** 10 minutes
**Goal:** Understand the exact JSON Schema requirements, data types, and required fields for writing a valid ADAC architecture file.
:::

## Architecture Model

An ADAC architecture file consists of five main components that work together to describe your infrastructure. 

```mermaid
graph TD
  A[ADAC File] --> B[Metadata]
  A --> C[Applications]
  A --> D[Infrastructure]
  A --> E[Connections]
  A --> F[Governance]

  classDef default fill:var(--ifm-color-primary-lightest),stroke:var(--ifm-color-primary),stroke-width:2px,color:var(--ifm-color-primary-darkest);
  classDef root fill:var(--ifm-color-primary),stroke:var(--ifm-color-primary-darkest),stroke-width:2px,color:#fff;
  class A root;
```

## Root Object

An ADAC file **MUST** be a valid YAML 1.2 or JSON document. The root level **MUST** contain the following fields:

| Field | Type | Requirement | Description |
| :--- | :--- | :--- | :--- |
| `version` | `string` | **REQUIRED** | The ADAC specification version (e.g., "0.1"). |
| `metadata` | `object` | **REQUIRED** | Identity, versioning, and environment context. |
| `applications` | `array` | **OPTIONAL** | Logical application components (microservices, etc.). |
| `infrastructure`| `object` | **REQUIRED** | Physical cloud resources organized by provider. |
| `connections` | `array` | **OPTIONAL** | Definitions of traffic flow and dependencies. |
| `cost` | `object` | **OPTIONAL** | Cost tracking summary. |
| `governance` | `object` | **OPTIONAL** | Compliance, SLA, and security guardrails. |
| `layoutOptions` | `object` | **OPTIONAL** | Global diagram layout and styling defaults. See [Declarative Layout & Styling](../core-concepts/declarative-layout). |

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="yaml" label="YAML" default>
    ```yaml title="root.adac.yaml"
    version: "0.1"              
    metadata: {...}             
    applications: [...]         
    infrastructure:             
      clouds: [...]
    connections: [...]          
    cost: {...}                 
    ```
  </TabItem>
  <TabItem value="json" label="JSON">
    ```json title="root.adac.json"
    {
      "version": "0.1",
      "metadata": {},
      "applications": [],
      "infrastructure": {
        "clouds": []
      },
      "connections": [],
      "cost": {}
    }
    ```
  </TabItem>
</Tabs>

## Metadata Object

The metadata object provides essential context about the architecture document itself. It is used by visualization tools to generate the diagram title, author attribution, and version tracking.

| Field | Type | Requirement | Description |
|---|---|---|---|
| `name` | `string` | **REQUIRED** | Project Name |
| `created` | `string` | **REQUIRED** | ISO 8601 date (YYYY-MM-DD) |
| `description` | `string` | **OPTIONAL** | Project Description |
| `author` | `string` | **OPTIONAL** | Team or Author Name |
| `version` | `string` | **OPTIONAL** | Semantic version (e.g. "1.0.0") |
| `updated` | `string` | **OPTIONAL** | ISO 8601 date |
| `organization`| `string` | **OPTIONAL** | Company Name |
| `environment` | `enum` | **OPTIONAL** | `development`, `staging`, `production`, `test`, `demo` |
| `tags` | `array` | **OPTIONAL** | Array of string tags |

<Tabs>
  <TabItem value="yaml" label="YAML" default>
    ```yaml title="metadata.adac.yaml"
    metadata:
      name: "Project Name"                    
      description: "Description"              
      author: "Team Name"                     
      version: "1.0.0"                        
      created: "2025-01-08"                   
      updated: "2025-01-08"                   
      organization: "Company Name"            
      environment: "production"               
      tags: ["tag1", "tag2"]                  
    ```
  </TabItem>
  <TabItem value="json" label="JSON">
    ```json title="metadata.adac.json"
    {
      "metadata": {
        "name": "Project Name",
        "description": "Description",
        "author": "Team Name",
        "version": "1.0.0",
        "created": "2025-01-08",
        "updated": "2025-01-08",
        "organization": "Company Name",
        "environment": "production",
        "tags": ["tag1", "tag2"]
      }
    }
    ```
  </TabItem>
</Tabs>


## Application Object

Applications represent logical units of compute or functionality in your architecture. They describe *what* your system is doing, rather than the physical infrastructure it runs on.

| Field | Type | Requirement | Description |
|---|---|---|---|
| `id` | `string` | **REQUIRED** | Unique ID (lowercase-with-dashes) |
| `name` | `string` | **REQUIRED** | Human Readable Name |
| `type` | `enum` | **REQUIRED** | See Application Types below |
| `technology` | `string` | **OPTIONAL** | E.g. "Node.js + Express" |
| `description` | `string` | **OPTIONAL** | What it does |
| `owner` | `string` | **OPTIONAL** | Team Name |
| `repository` | `string` | **OPTIONAL** | Link to source code repository |
| `sla` | `object` | **OPTIONAL** | Service Level Agreement details |

**Application Types:**
- `frontend`, `backend`, `api`, `database`, `cache`, `queue`
- `worker`, `batch-job`, `mobile`, `desktop`, `iot`
- `ml-model`, `data-pipeline`, `microservice`

<Tabs>
  <TabItem value="yaml" label="YAML" default>
    ```yaml title="application.adac.yaml"
    applications:
      - id: "unique-id"                       
        name: "Human Readable Name"           
        type: "microservice"                  
        technology: "Node.js + Express"       
        description: "What it does"           
        owner: "Team Name"                    
        repository: "https://github.com/..."  
        sla:                                  
          availability_percent: 99.9
          max_latency_ms: 500
          rto_minutes: 15
          rpo_minutes: 5
    ```
  </TabItem>
  <TabItem value="json" label="JSON">
    ```json title="application.adac.json"
    {
      "applications": [
        {
          "id": "unique-id",
          "name": "Human Readable Name",
          "type": "microservice",
          "technology": "Node.js + Express",
          "description": "What it does",
          "owner": "Team Name",
          "repository": "https://github.com/...",
          "sla": {
            "availability_percent": 99.9,
            "max_latency_ms": 500,
            "rto_minutes": 15,
            "rpo_minutes": 5
          }
        }
      ]
    }
    ```
  </TabItem>
</Tabs>


## Infrastructure Object

The infrastructure object holds your physical and virtual cloud resources. This section maps directly to real-world cloud provider environments and tracks the topology of your deployed architecture.

| Field | Type | Requirement | Description |
|---|---|---|---|
| `clouds` | `array` | **REQUIRED** | List of cloud environments |

### Cloud Object

| Field | Type | Requirement | Description |
|---|---|---|---|
| `id` | `string` | **REQUIRED** | Unique ID |
| `provider` | `string` | **REQUIRED** | Cloud provider (e.g. `aws`, `gcp`, `azure`) |
| `region` | `string` | **REQUIRED** | Cloud region (e.g. `us-east-1`) |
| `account_id` | `string` | **OPTIONAL** | 12 digit AWS account ID |
| `vpc_id` | `string` | **OPTIONAL** | VPC ID |
| `tier` | `enum` | **OPTIONAL** | `primary`, `secondary`, `failover`, `development`, `test` |
| `services` | `array` | **REQUIRED** | Array of Service objects |

<Tabs>
  <TabItem value="yaml" label="YAML" default>
    ```yaml title="infrastructure.adac.yaml"
    infrastructure:
      clouds:
        - id: "aws-prod"                      
          provider: "aws"                     
          region: "us-east-1"                 
          account_id: "123456789012"          
          vpc_id: "vpc-abc123"                
          tier: "primary"                     
          services: [...]                     
    ```
  </TabItem>
  <TabItem value="json" label="JSON">
    ```json title="infrastructure.adac.json"
    {
      "infrastructure": {
        "clouds": [
          {
            "id": "aws-prod",
            "provider": "aws",
            "region": "us-east-1",
            "account_id": "123456789012",
            "vpc_id": "vpc-abc123",
            "tier": "primary",
            "services": []
          }
        ]
      }
    }
    ```
  </TabItem>
</Tabs>

## Service Object

Services represent individual cloud resources (like an EC2 instance or RDS database). The `runs` array connects back to your Application IDs, effectively mapping software to hardware.

| Field | Type | Requirement | Description |
|---|---|---|---|
| `id` | `string` | **REQUIRED** | Unique service ID |
| `service` | `enum` | **REQUIRED** | Identifier of supported service (e.g. `rds-postgres`) |
| `name` | `string` | **OPTIONAL** | Human Readable Name |
| `description` | `string` | **OPTIONAL** | What it does |
| `runs` | `array` | **OPTIONAL** | Array of Application IDs that run on this service |
| `configuration` | `object` | **OPTIONAL** | Service-specific configuration |
| `availability_zones` | `array` | **OPTIONAL** | List of AZs |
| `security_groups` | `array` | **OPTIONAL** | List of Security Group IDs |
| `subnets` | `array` | **OPTIONAL** | List of Subnet IDs |
| `iam_role` | `string` | **OPTIONAL** | IAM Role Name or ARN |
| `tags` | `object` | **OPTIONAL** | Key-value tags |
| `cost` | `object` | **OPTIONAL** | Cost breakdown |
| `monitoring` | `object` | **OPTIONAL** | Monitoring setup details |
| `visual` | `object` | **OPTIONAL** | Diagram hints: `layout` (how children are arranged) and `style`. See [Declarative Layout & Styling](../core-concepts/declarative-layout) |

:::tip Service List
For a complete list of supported cloud services, see [Supported Clouds](./supported-clouds/aws).
:::
