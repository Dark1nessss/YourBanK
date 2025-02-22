"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

const FooterLanding = () => {
  return (
    <footer className="border-t bg-gray-900 text-gray-300">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo_white.svg" width={32} height={32} alt="YourBanK logo" />
              <span className="font-ibm-plex-serif text-xl font-bold text-white">
                Your<span className="text-green-500">BanK</span>
              </span>
            </Link>
            <p className="text-sm">
              Simplifying banking for everyone. Connect, manage, and grow your finances in one place.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-white">Products</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#personal-banking" className="hover:text-green-400">
                  Bank Integration
                </Link>
              </li>
              <li>
                <Link href="/#business-banking" className="hover:text-green-400">
                  Virtual Cards
                </Link>
              </li>
              <li>
                <Link href="/#enterprise-solutions" className="hover:text-green-400">
                  Money Transfers
                </Link>
              </li>
              <li>
                <Link href="/#integrations" className="hover:text-green-400">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-white">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#about" className="hover:text-green-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#careers" className="hover:text-green-400">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/#press" className="hover:text-green-400">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-green-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-white">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#privacy" className="hover:text-green-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/#terms" className="hover:text-green-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/#security" className="hover:text-green-400">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-gray-800 pt-8 sm:flex-row">
          <p className="text-sm">© {new Date().getFullYear()} YourBanK. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-green-400">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="hover:text-green-400">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="hover:text-green-400">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="hover:text-green-400">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLanding;