'use client';

import { ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sidebarNavItems = [
  {
    title: 'Overview',
    items: [
      {
        title: 'Home',
        href: '/docs',
      },
    ],
  },
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Introduction',
        href: '/docs/introduction',
      },
      {
        title: 'Installation',
        href: '/docs/installation',
      },
      {
        title: 'Components.json',
        href: '/docs/components-json',
      },
      {
        title: 'Constants.ts',
        href: '/docs/constants',
      },
      {
        title: 'Types.ts',
        href: '/docs/types',
      },
      {
        title: 'Styling',
        href: '/docs/styling',
      },
    ],
  },
  {
    title: 'Components',
    items: [
      {
        title: 'AnimatedCounter',
        href: '/docs/components/animated-counter',
      },
      {
        title: 'AuthForm',
        href: '/docs/components/auth-form',
      },
      {
        title: 'BankCard',
        href: '/docs/components/bank-card',
      },
      {
        title: 'BankTabItem',
        href: '/docs/components/bank-tab-item',
      },
      {
        title: 'CardAuth',
        href: '/docs/components/card-auth',
      },
      {
        title: 'Category',
        href: '/docs/components/category',
      },
      {
        title: 'Copy',
        href: '/docs/components/copy',
      },
      {
        title: 'DoughnutChart',
        href: '/docs/components/doughnut-chart',
      },
      {
        title: 'Sidebar',
        href: '/docs/components/sidebar',
      },
      {
        title: 'RightSidebar',
        href: '/docs/components/right-sidebar',
      },
      {
        title: 'Footer',
        href: '/docs/components/footer',
      },
      {
        title: 'RecentTransactions',
        href: '/docs/components/recent-transactions',
      },
      {
        title: 'TransactionTable',
        href: '/docs/components/transaction-table',
      },
      {
        title: 'Pagination',
        href: '/docs/components/pagination',
      },
      {
        title: 'PaymentTransferForm',
        href: '/docs/components/payment-transfer-form',
      },
      {
        title: 'PlaidLink',
        href: '/docs/components/plaid-link',
      },
    ],
  },
  {
    title: 'Actions',
    items: [
      {
        title: 'Bank Actions',
        href: '/docs/actions/bank-actions',
      },
      {
        title: 'Dwolla Actions',
        href: '/docs/actions/dwolla-actions',
      },
      {
        title: 'Transaction Actions',
        href: '/docs/actions/transactions',
      },
      {
        title: 'User Actions',
        href: '/docs/actions/user-actions',
      },
      {
        title: 'Appwrite',
        href: '/docs/actions/appwrite',
      },
      {
        title: 'Plaid',
        href: '/docs/actions/plaid',
      },
      {
        title: 'Utils',
        href: '/docs/actions/utils',
      },
    ],
  },
];

function MobileNav({
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedSections, setExpandedSections] = React.useState<string[]>([
    'Overview',
    'Getting Started',
    'Components',
    'Actions',
    'Lib',
  ]);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1a1f2d] flex flex-col">
      {/* Header with close button */}
      <div className="flex items-center justify-between border-b border-gray-800 px-4 py-4 min-h-[64px]">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={24}
            height={24}
            alt="YourBanK logo"
          />
          <span className="font-ibm-plex-serif text-lg font-bold text-white">
            Your<span className="text-[#39A36A]">BanK</span>
          </span>
        </Link>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 text-white hover:bg-gray-800 rounded-md transition-colors"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close menu</span>
        </button>
      </div>

      {/* Scrollable navigation content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <nav className="space-y-6">
          {sidebarNavItems.map((section, index) => (
            <div key={index}>
              <button
                onClick={() => toggleSection(section.title)}
                className="flex w-full items-center justify-between text-left py-2"
              >
                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  {section.title}
                </h4>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-gray-400 transition-transform duration-200',
                    expandedSections.includes(section.title) && 'rotate-180'
                  )}
                />
              </button>

              {expandedSections.includes(section.title) && (
                <div className="mt-2 space-y-1 ml-2">
                  {section.items.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      onClick={() => handleLinkClick(item.href)}
                      className={cn(
                        'flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                        pathname === item.href
                          ? 'bg-[#39A36A]/20 text-[#39A36A] font-medium border-l-2 border-[#39A36A]'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                      )}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Fixed bottom buttons */}
      <div className="border-t border-gray-800 p-4 bg-[#1a1f2d]">
        <div className="space-y-3">
          <button
            onClick={() => handleLinkClick('/sign-in')}
            className="w-full px-4 py-3 text-white border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => handleLinkClick('/sign-up')}
            className="w-full px-4 py-3 bg-[#39A36A] text-white rounded-lg hover:bg-[#2E8754] transition-colors font-medium"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export function NavDocs() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-[#1a1f2d]">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/icons/logo.svg"
                  width={32}
                  height={32}
                  alt="YourBanK logo"
                />
                <span className="font-ibm-plex-serif text-xl font-bold text-white">
                  Your<span className="text-[#39A36A]">BanK</span>
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {/* Desktop buttons */}
              <div className="hidden lg:flex lg:items-center lg:gap-4">
                <Link href="/sign-in">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-gray-800 hover:text-white"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-[#39A36A] hover:bg-[#2E8754]">
                    Get Started
                  </Button>
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 text-white hover:bg-gray-800 rounded-md transition-colors"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isOpen && <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}
