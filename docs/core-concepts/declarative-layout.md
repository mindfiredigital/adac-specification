---
title: Declarative Layout & Styling
---

# Declarative Layout & Styling

ADAC lets you describe **what an architecture diagram should look like structurally**, while the layout engine works out the coordinates. Nothing here is an absolute position, and nothing is an engine-specific option: ADAC properties are translated into layout constraints by the diagram tooling.

:::info In this concept guide
**Time to read:** 10 minutes
**Goal:** Control how containers arrange their children, how connections leave and enter nodes, and how diagrams are styled, without ever specifying pixel positions.
:::

:::note Version
Declarative layout properties were introduced in ADAC **0.2**. Files that omit them continue to work and are laid out automatically.
:::

```yaml
layoutOptions:
  direction: LR            # overall flow
  gap: 1
  containerPadding: 1

# on an element:
visual:
  layout:
    direction: TB          # how *this* element arranges its direct children
    maxItemsPerLine: 2
    gap: 0.5
  style:
    background: true
```

## The Hierarchical Model

Layout is **hierarchical and composable**: each container controls the layout of its _direct children only_.

```text
VPC                    ← its layout places the subnets
├── Public Subnet      ← its layout places ALB, NAT
└── Private Subnet     ← its layout places ECS, DB
    ├── ECS
    └── DB
```

Properties are resolved in this order:

```text
global layoutOptions  →  nearest layout-declaring ancestor  →  element's own layout
```

## Units

Every length is a **logical unit** resolved through `layoutOptions.unitSize` (default `100`). With `unitSize: 100`, `gap: 2` is 200 px. The conversion applies to `gap`, `padding`, `edgeSpacing`, `size`, `minSize` and `maxSize`; units and pixels are never mixed.

## Global Defaults: `layoutOptions`

`layoutOptions` is an optional root-level object that sets defaults for the whole diagram.

| Property | Values | Description |
|---|---|---|
| `engine` | `elk`, `custom`, `orthogonal`, `tsm` | Layout engine. A CLI/API override still wins; ELK is used when neither this nor the top-level `layout` is set. |
| `unitSize` | number > 0 | Pixels per logical unit. |
| `direction` | `LR` `RL` `TB` `BT` | Flow of the whole diagram; default for nested containers. |
| `gap` | number \| `{horizontal, vertical}` | Space between siblings. |
| `containerPadding` | number \| `{top,right,bottom,left}` | Default container padding. |
| `align` | `start` `center` `end` | Default cross-axis alignment for arranged containers. |
| `justify` | `start` `center` `end` `space-between` `space-around` | Default main-axis distribution for arranged containers. |
| `edgeSpacing` | number ≥ 0 | Edge-to-node clearance (edge-to-edge is half). |
| `edgeRouting` | `orthogonal` `polyline` `splines` `straight` | Default connection routing. |
| `background` | boolean (default `false`) | Default node/card background. |
| `labelMaxChars` | integer 4–80 | Most characters on one line of a node label; longer labels wrap, then end in `…`. Can be set per element via `visual.style.labelMaxChars`. |
| `edgeLabels` | boolean (default `true`) | Draw each connection `type` on its edge. |

## Per-Element Layout: `visual.layout`

Any service (or other element) can carry a `visual.layout` block describing how it arranges its **direct children** and where it sits among its siblings.

| Property | Values | Inheritance | Applies to |
|---|---|---|---|
| `direction` | `LR` `RL` `TB` `BT` | **inherited** | children |
| `gap` | number \| `{horizontal, vertical}` | **inherited** | children (per-axis merge) |
| `align` | `start` `center` `end` | **inherited** | children, cross axis |
| `justify` | `start` `center` `end` `space-between` `space-around` | **inherited** | children, main axis |
| `padding` | number \| `{top,right,bottom,left}` | local | this container |
| `wrap` | boolean | local | children |
| `itemsPerLine` | integer ≥ 1 (exact) | **never inherited** | children |
| `maxItemsPerLine` | integer ≥ 1 (maximum, lines balanced) | **never inherited** | children |
| `size` | `{width, height}` number \| `auto` | local | this element |
| `minSize` | `{width, height}` number \| `auto` | local | this element |
| `maxSize` | `{width, height}` number \| `auto` | local | this element |
| `order` | integer | placement | position among siblings |
| `position` | `top-left` … `bottom-right`, `center` | **never inherited** | region in the parent |

`order` and `position` describe the element itself within its parent, so they are never inherited either.

### Arrangement

A container is **arranged** once it (or its nearest layout-declaring ancestor) declares `direction`, `wrap`, `itemsPerLine`, `maxItemsPerLine`, `align` or `justify`. Declaring `order` on a child also arranges the parent. Arranged containers lay their children out in a line along `direction`, wrapping when a line limit is set. Containers that declare nothing keep the engine's own flow. `gap`, `padding` and sizes never arrange anything on their own.

- `itemsPerLine: 2` puts exactly two items on each line.
- `maxItemsPerLine: 4` uses the fewest lines and balances them: five items give `3 + 2`, not `4 + 1`.
- `wrap: false` together with a line limit is invalid.
- `RL` / `BT` reverse the sequence along the axis.
- `position` in an arranged container moves the element to the start or end of its line; elsewhere it pins the element to the first/last layer of the flow.

### Sizing

`size`, `minSize` and `maxSize` are constraints, not coordinates. A container can never be smaller than its content, so `size` and `minSize` act as a floor. `maxSize` is applied to leaf elements; for containers the engine cannot enforce a ceiling, so a warning is logged when the content does not fit.

## Connection Layout: `connections[].layout`

Connections can control which side of a node they leave and enter, and how they are routed.

```yaml
connections:
  - from: app
    to: database
    bidirectional: true
    layout:
      fromSide: right        # left | right | top | bottom | auto
      toSide: left
      routing: orthogonal    # orthogonal | polyline | splines | straight
```

- Sides become fixed ports; `auto` leaves the choice to the engine.
- `bidirectional: true` draws arrowheads at both ends.
- Two connections between the same nodes in opposite directions are nudged apart so they never overlap.
- A per-connection `routing` of `straight` or `splines` is drawn by the renderer; the ELK engine itself routes the whole diagram with `edgeRouting`.

## Styling: `visual.style`

`visual.style.background` overrides `layoutOptions.background` for a single element. With the default (`false`) no card or icon pill is drawn behind an icon; `true` restores the classic white card. `visual.style.labelMaxChars` overrides the global label width for one element.

## Complete Example

A VPC that stacks a public and a private subnet; the private subnet wraps its services into rows of three.

```yaml title="declarative-layout.adac.yaml"
version: '0.2'

metadata:
  name: 'Declarative layout example'
  created: '2026-01-01'

layoutOptions:
  engine: elk
  unitSize: 100
  direction: LR          # overall flow: left to right
  gap: 0.6
  containerPadding: 0.5
  edgeSpacing: 0.4
  edgeRouting: orthogonal
  background: false      # no card behind icons unless an element asks for one

infrastructure:
  clouds:
    - id: 'aws-main'
      provider: 'aws'
      region: 'us-east-1'
      services:
        - id: 'vpc'
          service: 'vpc'
          name: 'Production VPC'
          visual:
            layout:
              direction: TB      # subnets are stacked
              gap: 0.8
              minSize: { width: 6 }

        - id: 'public-subnet'
          service: 'subnet'
          name: 'Public Subnet'
          configuration: { vpc: 'vpc' }
          visual:
            layout:
              direction: LR
              align: center
              order: 1           # sits above the private subnet

        - id: 'private-subnet'
          service: 'subnet'
          name: 'Private Subnet'
          configuration: { vpc: 'vpc' }
          visual:
            layout:
              direction: LR
              itemsPerLine: 3    # wrap after three services
              justify: center
              order: 2

        - id: 'aurora'
          service: 'rds-aurora-postgres'
          name: 'Aurora'
          configuration: { subnets: ['private-subnet'] }
          visual:
            layout: { order: 4 }
            style:
              background: true   # this one keeps the classic card

connections:
  - id: 'api-to-db'
    from: 'api'
    to: 'aurora'
    type: 'database-query'
    bidirectional: true
    layout:
      fromSide: right
      toSide: left
```

## Deprecated Aliases

| Deprecated | Use |
|---|---|
| `unit` | `unitSize` |
| `routing` | `edgeRouting` |

Both still work. Validators report them as warnings, and the diagram log repeats them. When both names are set, the new one wins.

## How It Maps to the Engine

ELK ignores per-container `direction` when connections cross container boundaries, so the ELK adapter realises arrangements with structure it _does_ honour:

- a row along the flow is a chain of invisible, layout-only edges;
- wrapped lines are invisible groups (type `layout-line`), stacked or chained;
- `align`, `justify`, declared order within a stacked layer and `maxSize` checks run as a post-layout pass that moves nodes and re-attaches their edges;
- connections that run _between lines_ of one container are withheld from layering (otherwise ELK staggers the lines) and routed afterwards.

Layout-only edges (ids starting `__adac_layout__`) and line groups are never drawn. The `custom`, `orthogonal` and `tsm` engines receive the plain hierarchy and ignore arrangement properties and the connection-level `bidirectional` and `routing` properties; `background`, `labelMaxChars` and `edgeLabels` still apply.

## Known Limitations

- `order` among the root's own children is best-effort; use `position` or connections to steer the top level.
- Real connections between items of an arranged container follow the arranged structure rather than ELK's layering, so such edges are routed with a single orthogonal bend and may cross other items.
- `labelPosition`, `labelSpacing`, `avoidOverlap`, `laneSpacing` and other advanced options are not implemented yet.

## Next Steps

- [Connections](./connections) for the full connection object.
- [Infrastructure](./infrastructure) for services and clouds.
- [Full Schema Specification](../reference/schema) for the root object.
