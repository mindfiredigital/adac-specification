import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

function HeroSection() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#111] py-20 lg:py-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
            Architecture Diagram <span className="text-red-600 dark:text-red-500">as Code</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            ADAC is an open specification for describing cloud infrastructure architectures in YAML/JSON format. Think of it as OpenAPI for infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:text-white hover:no-underline"
              to="/docs/reference/adac-v0.1">
              Read the Spec
            </Link>
            <Link
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white hover:no-underline flex items-center gap-2"
              href="https://github.com/lakinmindfire/adac-specification">
              <span>⭐</span> GitHub
            </Link>
          </div>

          {/* Code Snippet block */}
          <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-black rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm relative group text-left flex items-center justify-between">
             <code className="text-gray-800 dark:text-gray-300 font-mono text-sm md:text-base">
               npm install -g adac-validator
             </code>
             <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" aria-label="Copy code">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                 <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
               </svg>
             </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ title, description, emoji }: { title: string, description: string, emoji: string }) {
  return (
    <div className="bg-white dark:bg-[#111] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-b-4 hover:border-b-red-500 text-left">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: 'Easy to Implement',
      description: 'ADAC is designed from the ground up to be a single source of truth for your architecture. Generate visuals straight from code.',
      emoji: '⚡'
    },
    {
      title: 'Focus on Logic',
      description: 'ADAC lets you focus on defining your infrastructure logically, and we\'ll do the chores. Rely on the standard schemas for cost tracking and validation.',
      emoji: '🎯'
    },
    {
      title: 'Powered by JSON',
      description: 'Extend or customize your architecture diagrams by reusing strict JSON Schema validation. Compatible across multiple cloud providers.',
      emoji: '🧩'
    }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 text-center max-w-6xl">
        <h2 className="text-sm font-bold tracking-widest text-red-600 dark:text-red-500 uppercase mb-4">Why Developers Love ADAC</h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-16">Document architectures without the headache.</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-[#111]">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Ready to simplify your architecture workflow?</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          Join the ecosystem and start building tools that conform to the ADAC Specification.
        </p>
        <Link
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:text-white hover:no-underline"
          to="/docs/reference/adac-v0.1">
          Get Started Now
        </Link>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="The standard specification for Architecture Diagram as Code.">
      <main className="w-full">
        <HeroSection />
        <FeaturesSection />
        <CtaSection />
      </main>
    </Layout>
  );
}
