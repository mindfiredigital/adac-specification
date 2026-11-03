import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/intro',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: false,
      items: [
        'core-concepts/applications',
        'core-concepts/infrastructure',
        'core-concepts/connections',
        'core-concepts/declarative-layout',
        'core-concepts/cost-tracking',
        'core-concepts/governance',
      ],
    },
    {
      type: 'category',
      label: 'Use Cases',
      collapsed: false,
      items: [
        'use-cases/web-application',
        'use-cases/microservices',
        'use-cases/data-pipeline',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      items: [
        'reference/schema',
        {
          type: 'category',
          label: 'Supported Clouds',
          collapsed: false,
          items: [
            'reference/supported-clouds/aws',
            'reference/supported-clouds/gcp',
            'reference/supported-clouds/azure',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Community',
      collapsed: true,
      items: [
        'contributing',
      ],
    },
  ],
};

export default sidebars;
