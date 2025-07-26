'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Book, Code2, Lightbulb, Puzzle, Zap } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'Components',
    description:
      'Pre-built components that you can copy and paste into your apps.',
    icon: Puzzle,
    href: '/docs/components',
  },
  {
    title: 'Quick Start',
    description: "Learn how to get started with YourBanK's API and components.",
    icon: Zap,
    href: '/docs/quick-start',
  },
  {
    title: 'API Reference',
    description: 'Detailed API documentation for all YourBanK features.',
    icon: Code2,
    href: '/docs/api',
  },
  {
    title: 'Guides',
    description:
      'Step-by-step guides for common banking integration scenarios.',
    icon: Book,
    href: '/docs/guides',
  },
];

export default function Documentation() {
  return (
    <div className="container relative mx-auto flex min-h-screen flex-col px-4">
      <section className="mx-auto flex w-full max-w-[980px] flex-col items-start gap-4 py-8 md:py-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start gap-4"
        >
          <span className="rounded-lg bg-[#39A36A]/10 px-4 py-2 text-sm text-[#39A36A]">
            Documentation
          </span>
          <h1 className="font-ibm-plex-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Build with YourBanK
          </h1>
          <p className="max-w-[700px] text-lg text-gray-400 sm:text-xl">
            Explore our guides and examples to integrate YourBanK into your
            applications.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Link href="/docs/quick-start">
            <Button size="lg" className="bg-[#39A36A] hover:bg-[#2E8754]">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/docs/components">
            <Button
              variant="outline"
              size="lg"
              className="text-white hover:bg-white/10"
            >
              Browse Components
            </Button>
          </Link>
        </motion.div>
      </section>

      <section className="mx-auto grid w-full max-w-[980px] gap-6 py-8 md:grid-cols-2">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
          >
            <Link href={feature.href}>
              <div className="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 p-6 transition-colors hover:bg-gray-800/50">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#39A36A]/10">
                  <feature.icon className="h-6 w-6 text-[#39A36A]" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
                <motion.div
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-[#39A36A]/10 to-[#2970FF]/10 opacity-0 transition-opacity group-hover:opacity-100"
                  initial={false}
                  animate={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto flex w-full max-w-[980px] flex-col gap-8 py-12">
        <div className="flex flex-col gap-4">
          <h2 className="font-ibm-plex-serif text-3xl font-bold text-white">
            Latest Updates
          </h2>
          <p className="text-gray-400">
            Stay up to date with the latest changes and improvements.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {[
            {
              title: 'Multi-Currency Support',
              description:
                'New features for handling multiple currencies in your applications.',
              date: 'March 2024',
              type: 'Feature',
            },
            {
              title: 'Enhanced Security',
              description:
                'Improved authentication and authorization mechanisms.',
              date: 'February 2024',
              type: 'Update',
            },
          ].map(update => (
            <div
              key={update.title}
              className="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 p-6 transition-colors hover:bg-gray-800/50"
            >
              <div className="mb-4 flex items-center gap-4">
                <span className="rounded-full bg-[#39A36A]/10 px-3 py-1 text-sm text-[#39A36A]">
                  {update.type}
                </span>
                <span className="text-sm text-gray-500">{update.date}</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {update.title}
              </h3>
              <p className="text-gray-400">{update.description}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto flex w-full max-w-[980px] flex-col gap-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col items-center gap-6 rounded-lg border border-gray-800 bg-gray-900/50 p-8 text-center"
        >
          <div className="rounded-full bg-[#39A36A]/10 p-3">
            <Lightbulb className="h-6 w-6 text-[#39A36A]" />
          </div>
          <h3 className="font-ibm-plex-serif text-2xl font-bold text-white">
            Need Help?
          </h3>
          <p className="max-w-[500px] text-gray-400">
            Can&apos;t find what you&apos;re looking for? Our support team is
            here to help you integrate YourBanK into your applications.
          </p>
          <Button variant="outline" className="text-white hover:bg-white/10">
            Contact Support
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
