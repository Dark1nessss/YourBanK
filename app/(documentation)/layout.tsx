import type React from 'react';
import type { Metadata } from 'next';
import { DocsSidebarNav } from '@/components/docs/sidebar-nav';
import { NavDocs } from '@/components/docs/nav-docs';

export const metadata: Metadata = {
  title: 'Documentation | YourBanK',
  description: 'Learn how to integrate and build with YourBanK',
};

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

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#1a1f2d]">
      <NavDocs />
      <div className="border-b border-gray-800" />
      <div className="container flex-1 items-start md:grid md:grid-cols-[280px_1fr] md:gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto custom-scrollbar md:sticky md:block">
          <div className="h-full py-6 pl-8 pr-6 lg:py-8">
            <DocsSidebarNav items={sidebarNavItems} />
          </div>
          <div className="absolute top-0 right-0 h-full w-[1px] bg-gray-800" />
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_200px]">
          <div className="mx-auto w-full min-w-0 max-w-[800px] px-4 md:px-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
