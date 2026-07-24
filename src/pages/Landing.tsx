import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Type, Ruler, FileText, Sparkles, Download, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Layout className="w-6 h-6 text-indigo-600" />,
    title: 'Multi-Page Builder',
    description: 'Create worksheets with different content on each page, and reorder pages in one place.'
  },
  {
    icon: <Type className="w-6 h-6 text-indigo-600" />,
    title: '100+ Educational Fonts',
    description: 'Pick handwriting-friendly fonts including Zaner-Bloser, D\u2019Nealian, and cursive styles.'
  },
  {
    icon: <Ruler className="w-6 h-6 text-indigo-600" />,
    title: 'Educational Guidelines',
    description: 'Standard 3:3:2 handwriting proportions, dotted midlines, and customizable line spacing.'
  },
  {
    icon: <FileText className="w-6 h-6 text-indigo-600" />,
    title: 'Smart Practice Content',
    description: 'Generate sight words, word patterns, sentence templates, name practice, and custom lists.'
  },
  {
    icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
    title: 'Traceable Text',
    description: 'Dotted, dashed, outline, and solid trace styles with adjustable opacity for handwriting practice.'
  },
  {
    icon: <Download className="w-6 h-6 text-indigo-600" />,
    title: 'Print-Ready PDF Export',
    description: 'Export worksheets as 150, 300, or 600 DPI PDFs for home, school, or classroom printing.'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
    title: 'Free and Browser-Based',
    description: 'No sign-up, no installs. Your settings are saved locally and you stay in control of your data.'
  }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'InkTrace',
  url: 'https://inktrace.wongpinter.com',
  description: 'Create beautiful handwriting practice worksheets with customizable fonts, guidelines, and PDF export.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Person',
    name: 'wongpinter',
  },
};

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">InkTrace</span>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link to="/settings-guide" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors hidden sm:inline-block">
              Settings guide
            </Link>
            <a href="/wiki/" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors hidden sm:inline-block">
              Wiki
            </a>
            <Link
              to="/builder"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm hover:shadow transition-all duration-200"
            >
              Open builder
            </Link>
          </nav>
        </div>
      </header>

      <section className="px-6 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-4">
            Free handwriting worksheet generator
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
            Free Handwriting Worksheet Generator — Create practice sheets in your browser.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
            InkTrace helps teachers, parents, and students design custom handwriting worksheets
            with proper handwriting proportions, educational fonts, and print-ready PDF export.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/builder"
              className="px-6 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              Start creating
            </Link>
            <a
              href="https://github.com/wongpinter/inktrace"
              target="_blank"
              rel="noreferrer noopener"
              className="px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 hover:border-indigo-400 hover:text-indigo-700 rounded-lg transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
            Everything you need to design handwriting practice
          </h2>
          <p className="mt-4 text-gray-600 text-center max-w-2xl mx-auto">
            Built for educators and parents with standards-aligned settings and a simple workflow.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(feature => (
              <div
                key={feature.title}
                className="p-6 border border-gray-200 rounded-xl bg-gray-50 hover:border-indigo-300 transition-colors"
              >
                <div className="mb-4" aria-hidden="true">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Ready to create your first worksheet?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            No sign-up required. Open the builder and start designing.
          </p>
          <div className="mt-8">
            <Link
              to="/builder"
              className="px-8 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              Open the builder
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} InkTrace. Free for personal and commercial use.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
