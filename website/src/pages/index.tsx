import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { ShineBorder } from '../components/ui/ShineBorder';
import { ArrowRight, Zap, Target, Puzzle, FileCode2, ShieldCheck, Cloud } from 'lucide-react';

/* ─── Standard Github SVG Icon ──────────────────────────────── */
function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

/* ─── Section Title Capsule ─────────────────────────────────── */
function SectionCapsule({ text }: { text: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--muted-foreground)',
        marginBottom: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        background: 'color-mix(in oklab, hsl(var(--primary)) 8%, transparent)',
        border: '1px solid color-mix(in oklab, hsl(var(--primary)) 15%, transparent)',
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'hsl(var(--primary))',
          animation: 'pulse 2s infinite',
        }}
      />
      {text}
    </div>
  );
}

/* ─── Hero Section ──────────────────────────────────────────── */
function HeroSection() {

  return (
    <section aria-label="Hero" className="relative overflow-hidden">
      <header className="flex items-center justify-center sm:py-24 py-16">
        <div className="w-full relative z-10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="font-extrabold tracking-tight text-5xl sm:text-6xl lg:text-7xl leading-[1.08] mb-6">
                Architecture Diagram{' '}
                <span style={{ color: 'hsl(var(--primary))' }}>as Code</span>
              </h1>

              <p
                style={{
                  fontSize: '1.25rem',
                  lineHeight: '1.75rem',
                  color: 'var(--muted-foreground)',
                  maxWidth: '640px',
                  margin: '0 auto 2.5rem',
                }}
              >
                ADAC is an open specification for describing cloud infrastructure
                architectures in YAML format. Think of it as{' '}
                <strong>OpenAPI for infrastructure</strong>.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Button
                asChild
                size="lg"
                variant="default"
                className="rounded-xl font-semibold px-8 py-4"
              >
                <Link
                  to="/docs/reference/adac-v0.1"
                  className="hover:no-underline flex items-center gap-2"
                >
                  Read the Spec <ArrowRight size={18} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-xl font-semibold px-8 py-4"
              >
                <Link
                  href="https://github.com/lakinmindfire/adac-specification"
                  className="hover:no-underline flex items-center gap-2"
                >
                  <GithubIcon size={18} /> GitHub
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </header>
    </section>
  );
}

/* ─── Features Data ─────────────────────────────────────────── */
const features = [
  {
    icon: <Zap size={24} style={{ color: 'hsl(var(--primary))' }} />,
    title: 'Single Source of Truth',
    description:
      'Define your architecture once in YAML and generate diagrams, documentation, and validation from a single file.',
  },
  {
    icon: <ShieldCheck size={24} style={{ color: 'hsl(var(--primary))' }} />,
    title: 'Built-in Validation',
    description:
      'Strict schema validation catches errors early. Track costs, enforce SLAs, and audit compliance natively.',
  },
  {
    icon: <Cloud size={24} style={{ color: 'hsl(var(--primary))' }} />,
    title: 'Multi-Cloud Support',
    description:
      'First-class support for AWS, Azure, GCP, and Kubernetes. Extend the schema for on-premise environments.',
  },
  {
    icon: <Target size={24} style={{ color: 'hsl(var(--primary))' }} />,
    title: 'Focus on Logic',
    description:
      'Describe your infrastructure logically and let tooling handle the visual representation and layout.',
  },
  {
    icon: <Puzzle size={24} style={{ color: 'hsl(var(--primary))' }} />,
    title: 'Extensible Schema',
    description:
      'Use the standard schema as-is or extend it with custom properties for your organization\'s needs.',
  },
  {
    icon: <FileCode2 size={24} style={{ color: 'hsl(var(--primary))' }} />,
    title: 'Open Specification',
    description:
      'Apache 2.0 licensed. Build tooling, validators, and diagram generators on top of the open standard.',
  },
];

/* ─── Features Section ──────────────────────────────────────── */
function FeaturesSection() {
  return (
    <section
      aria-labelledby="why-adac-title"
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: '4rem',
        paddingBottom: '4rem',
        paddingLeft: '1.25rem',
        paddingRight: '1.25rem',
        background: 'color-mix(in oklab, hsl(var(--primary)) 5%, transparent)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{ textAlign: 'center', maxWidth: '868px', margin: '0 auto 3.5rem auto' }}>
          <SectionCapsule text="Why developers love ADAC" />

          <h2
            id="why-adac-title"
            className="font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.08]"
            style={{ color: 'var(--foreground)' }}
          >
            Built for <span style={{ color: 'hsl(var(--primary))' }}>infrastructure</span>,{' '}
            powered by <span style={{ color: 'hsl(var(--primary))' }}>code</span>
          </h2>

          <p
            style={{
              fontSize: '1.125rem',
              lineHeight: '1.75rem',
              color: 'var(--muted-foreground)',
              maxWidth: '600px',
              margin: '1rem auto 0',
            }}
          >
            Every aspect of the specification is designed with clarity, validation, and developer experience in mind.
          </p>
        </header>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {features.map((feature, idx) => (
            <Card
              key={idx}
              variant="default"
              interactive="lift"
              animation="fadeIn"
              className="h-full"
              style={{
                background: 'var(--card)',
                borderColor: 'var(--border)',
              }}
            >
              <CardHeader>
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: 'color-mix(in oklab, hsl(var(--primary)) 10%, transparent)',
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  {feature.icon}
                </motion.div>
                <CardTitle size="md" className="mb-1" style={{ color: 'var(--foreground)' }}>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ───────────────────────────────────────────── */
function CtaSection() {
  return (
    <section className="w-full pt-20 pb-10 md:pb-20 px-5 relative flex flex-col justify-center items-center overflow-visible">
      <ShineBorder
        className="w-full max-w-4xl"
        borderRadius={24}
        borderWidth={1.5}
        duration={6}
        color={['hsl(var(--primary))', 'hsl(var(--primary-light))', 'hsl(var(--primary-lightest))']}
      >
        <div
          className="px-6 md:px-10 py-10 md:py-14 text-center"
          style={{ background: 'var(--background)' }}
        >
          <SectionCapsule text="Get started" />

          <h2
            className="font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.08] mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Ready to simplify your{' '}
            <span style={{ color: 'hsl(var(--primary))' }}>architecture workflow</span>?
          </h2>

          <p
            style={{
              fontSize: '1.125rem',
              lineHeight: '1.75rem',
              color: 'var(--muted-foreground)',
              maxWidth: '560px',
              margin: '0 auto 2rem',
            }}
          >
            Join the ecosystem and start building tools that conform to the ADAC Specification.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              variant="default"
              className="rounded-xl font-semibold px-8 py-4"
            >
              <Link
                to="/docs/reference/adac-v0.1"
                className="hover:no-underline flex items-center gap-2"
              >
                Get Started <ArrowRight size={18} />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl font-semibold px-8 py-4"
            >
              <Link
                href="https://github.com/lakinmindfire/adac-specification"
                className="hover:no-underline flex items-center gap-2"
              >
                <GithubIcon size={18} /> Star on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </ShineBorder>
    </section>
  );
}

/* ─── Custom Footer (homepage only) ─────────────────────────── */
function HomepageFooter() {
  return (
    <footer
      style={{
        position: 'relative',
        width: '100%',
        height: '64px',
        zIndex: 50,
      }}
    >
      <div
        style={{
          margin: '0 auto',
          maxWidth: '1200px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '0 1.5rem',
          fontSize: '0.875rem',
          color: 'var(--muted-foreground)',
        }}
      >
        © 2026 Mindfire FOSS
      </div>
    </footer>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      noFooter
      title="Home"
      description="ADAC — an open specification for describing cloud infrastructure architectures in YAML format."
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <main className="w-full">
          <HeroSection />
          <FeaturesSection />
          <CtaSection />
        </main>
        <HomepageFooter />
      </div>
    </Layout>
  );
}
