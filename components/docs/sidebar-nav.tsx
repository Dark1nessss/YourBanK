'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface DocsSidebarNavProps {
  items: {
    title: string;
    items: {
      title: string;
      href: string;
    }[];
  }[];
  onLinkClick?: (href: string) => void;
}

export function DocsSidebarNav({ items, onLinkClick }: DocsSidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className={cn('pb-4')}>
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-gray-300">
            {item.title}
          </h4>
          {item.items?.length && (
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {item.items.map((subItem, subIndex) => (
                <div key={subIndex}>
                  {onLinkClick ? (
                    <button
                      onClick={() => onLinkClick(subItem.href)}
                      className={cn(
                        'group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-left hover:underline',
                        pathname === subItem.href
                          ? 'font-medium text-[#39A36A]'
                          : 'text-gray-400'
                      )}
                    >
                      {subItem.title}
                    </button>
                  ) : (
                    <Link
                      href={subItem.href}
                      className={cn(
                        'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline',
                        pathname === subItem.href
                          ? 'font-medium text-[#39A36A]'
                          : 'text-gray-400'
                      )}
                    >
                      {subItem.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
