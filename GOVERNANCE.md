# Governance — ADAC Specification

## Overview

The ADAC Specification is an open standard maintained under the `mindfiredigital` GitHub organisation. This document describes how decisions are made.

---

## Roles

| Role                 | Responsibilities                                                |
| -------------------- | --------------------------------------------------------------- |
| **Maintainer**       | Merge PRs, triage issues, cut releases, enforce code of conduct |
| **Contributor**      | Submit PRs, open issues, participate in spec discussions        |
| **Community member** | Open discussions, provide feedback, report issues               |

Current maintainers are listed in the repository's [CODEOWNERS](.github/CODEOWNERS) file (to be added).

---

## Decision Making

### Spec changes (new fields, breaking changes, new providers)

1. Open a GitHub Issue describing the problem and the proposed change
2. Label it `spec-proposal`
3. Discussion period: minimum 7 days for community feedback
4. Maintainer approval required before merge
5. Breaking changes require a new spec version (`v0.1` → `v0.2`)

### Documentation and example changes

- Open a PR directly — no issue required for small fixes
- Label the PR `docs`
- One maintainer approval required before merge

### Tooling changes (adac-tools repo)

Managed separately in the [adac-tools](https://github.com/mindfiredigital/adac-tools) repository under its own contribution guidelines.

---

## Versioning

ADAC Specification follows **calendar-minor versioning**:

- `v0.1` — Initial AWS-focused release
- `v0.2` — Adds Azure + GCP
- `v1.0` — Stable multi-cloud spec with full provider coverage

A new spec version is required when:

- Adding a new top-level key to the ADAC document structure
- Changing the meaning of an existing required field
- Removing or renaming enum values
- Adding a new cloud provider

Minor additions (new optional fields, new AWS service types) may ship within the same version with a changelog entry.

---

## Code of Conduct

All participants are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Contact

Open a [GitHub Issue](https://github.com/mindfiredigital/adac-specification/issues) for questions, proposals, or bugs.
