'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BanknoteIcon as Bank,
  CreditCard,
  RefreshCcw,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function IntroductionPage() {
  const features = [
    {
      icon: Bank,
      title: 'Bank Integration',
      description:
        'Connect with over 11,000 financial institutions across the United States through our secure Plaid integration.',
    },
    {
      icon: CreditCard,
      title: 'Card Management',
      description:
        'Create and manage virtual and physical credit cards with custom spending limits and real-time notifications.',
    },
    {
      icon: RefreshCcw,
      title: 'Instant Transfers',
      description:
        'Send and receive money instantly between any connected bank account or card with zero fees.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description:
        'Bank-grade encryption and security measures to protect all financial transactions and sensitive data.',
    },
  ];

  return (
    <div className="space-y-12 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h1 className="font-ibm-plex-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Welcome to YourBanK
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl">
          YourBanK is revolutionizing the way Americans interact with their
          finances by providing a unified platform that connects multiple bank
          accounts, credit cards, and financial services into one seamless
          experience.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-8 md:grid-cols-2"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            className="relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 p-6"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#39A36A]/10">
              <feature.icon className="h-6 w-6 text-[#39A36A]" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">
              {feature.title}
            </h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-3xl font-bold text-white">
          Our Platform
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">
              For Individuals
            </h3>
            <ul className="list-disc space-y-2 pl-6 text-gray-400">
              <li>Connect all your bank accounts in one dashboard</li>
              <li>Track spending across multiple cards and accounts</li>
              <li>Send money instantly to friends and family</li>
              <li>Create virtual cards for secure online shopping</li>
              <li>Real-time transaction notifications</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">For Businesses</h3>
            <ul className="list-disc space-y-2 pl-6 text-gray-400">
              <li>Corporate card management and controls</li>
              <li>Automated expense tracking and categorization</li>
              <li>Multi-user access with role-based permissions</li>
              <li>API integration for custom solutions</li>
              <li>Detailed financial reporting and analytics</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-3xl font-bold text-white">
          Technology Stack
        </h2>
        <p className="text-gray-400">
          Built with modern technologies for maximum performance, security, and
          scalability:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Next.js', logo: '/icons/nextjs.svg' },
            { name: 'React', logo: '/icons/react.svg' },
            { name: 'TypeScript', logo: '/icons/typescript.svg' },
            { name: 'Tailwind CSS', logo: '/icons/tailwind.svg' },
          ].map(tech => (
            <div
              key={tech.name}
              className="flex items-center gap-2 p-4 rounded-lg border border-gray-800 bg-gray-900/50"
            >
              <div className="relative h-6 w-6">
                <Image
                  src={tech.logo || '/placeholder.svg'}
                  alt={tech.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="flex gap-4"
      >
        <Link href="/docs/installation">
          <Button size="lg" className="bg-[#39A36A] hover:bg-[#2E8754]">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/docs/components/animated-counter">
          <Button
            variant="outline"
            size="lg"
            className="text-white hover:bg-white/10"
          >
            Browse Components
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
