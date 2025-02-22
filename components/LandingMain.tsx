"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import {
  ArrowRight,
  Shield,
  CreditCard,
  Globe,
  Zap,
  PiggyBank,
  Bell,
  ChevronRight,
  ArrowUpRight,
  CheckCircle,
  DollarSign,
  Building2,
  Wallet,
  Lock,
  Smartphone,
  Gift,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import BankCard from "./BankCard"
import { useRef } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star } from "lucide-react"
import React from "react"

// Demo data for the cards
const demoCards = [
  {
    account: {
      appwriteItemId: "demo1",
      name: "Savings Account",
      currentBalance: 45750.0,
      mask: "8448",
      shareableId: "demo-share-1",
    },
    userName: "John Doe",
  },
]

const features = [
  {
    title: "Global Banking",
    description: "Access your money anywhere with multi-currency accounts",
    icon: Globe,
    color: "bg-[#39A36A]/10 text-[#39A36A]",
  },
  {
    title: "Instant Cards",
    description: "Create virtual and physical cards in seconds",
    icon: CreditCard,
    color: "bg-[#2970FF]/10 text-[#2970FF]",
  },
  {
    title: "Fast Transfers",
    description: "Send money globally with real-time exchange rates",
    icon: Zap,
    color: "bg-[#39A36A]/10 text-[#39A36A]",
  },
  {
    title: "Smart Savings",
    description: "Automated vaults and round-up savings features",
    icon: PiggyBank,
    color: "bg-[#2970FF]/10 text-[#2970FF]",
  },
]

const stats = [
  { number: "2M+", label: "Active Users", icon: CheckCircle },
  { number: "$50B+", label: "Processed Annually", icon: DollarSign },
  { number: "190+", label: "Countries Supported", icon: Globe },
  { number: "99.99%", label: "Uptime SLA", icon: Shield },
]

const testimonials = [
  {
    quote: "YourBanK has transformed how we manage our business finances. The integration features are seamless.",
    author: "Sarah Chen",
    role: "CEO, TechStart Inc.",
    image: "/testimonials/sarah.jpg",
  },
  {
    quote: "The security features give us peace of mind. Best banking platform we've ever used.",
    author: "Michael Rodriguez",
    role: "CFO, Global Ventures",
    image: "/testimonials/michael.jpg",
  },
  {
    quote: "Their customer support is exceptional. They're always there when you need them.",
    author: "Emily Thompson",
    role: "Small Business Owner",
    image: "/testimonials/emily.jpg",
  },
]

const comparisonFeatures = [
  { feature: "Bank Integration", personal: true, business: true, enterprise: true },
  { feature: "Virtual Cards", personal: true, business: true, enterprise: true },
  { feature: "Multi-Currency Support", personal: false, business: true, enterprise: true },
  { feature: "API Access", personal: false, business: true, enterprise: true },
  { feature: "Custom Solutions", personal: false, business: false, enterprise: true },
  { feature: "Dedicated Support", personal: false, business: true, enterprise: true },
  { feature: "Advanced Analytics", personal: false, business: true, enterprise: true },
  { feature: "Team Management", personal: false, business: true, enterprise: true },
]

const integrationLogos = [
  { name: "Stripe", logo: "https://v0.dev/static/stripe.svg" },
  { name: "PayPal", logo: "https://v0.dev/static/paypal.svg" },
  { name: "Wise", logo: "https://v0.dev/static/wise.svg" },
  { name: "Plaid", logo: "https://v0.dev/static/plaid.svg" },
]

const FloatingParticles = () => {
  const [dimensions, setDimensions] = React.useState({ width: 1000, height: 800 })

  React.useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/10"
          animate={{
            x: [Math.random() * dimensions.width, Math.random() * dimensions.width],
            y: [Math.random() * dimensions.height, Math.random() * dimensions.height],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
        />
      ))}
    </div>
  )
}

export default function LandingPage() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const springY = useSpring(y, { stiffness: 100, damping: 30 })
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

  const featureRef = useRef(null)
  const isFeatureInView = useInView(featureRef, { once: true })

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section id="hero" ref={targetRef} className="relative min-h-screen overflow-hidden bg-[#1a1f2d] py-20 sm:py-32">
        <FloatingParticles />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#39A36A]/20 via-[#2970FF]/20 to-transparent"></div>
        <div className="container relative z-10 mx-auto max-w-[1400px]">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm"
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="flex h-2 w-2 rounded-full bg-[#39A36A]"
                  ></motion.span>
                  New: Multi-currency support is now live
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="font-ibm-plex-serif text-5xl font-bold tracking-tight text-white sm:text-6xl xl:text-7xl"
                >
                  Next-Gen{" "}
                  <span className="inline-block">
                    <span className="text-gradient bg-gradient-to-r from-[#39A36A] to-[#2970FF]">Banking</span>
                  </span>{" "}
                  For Everyone
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mt-8 text-lg leading-relaxed text-gray-300 sm:text-xl"
                >
                  Experience the future of banking with YourBanK. Connect all your accounts, create virtual cards, and
                  manage your money globally—all in one secure platform.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
                >
                  <Link href="/sign-up">
                    <Button
                      size="lg"
                      className="group relative h-14 w-full overflow-hidden bg-[#39A36A] px-8 text-lg hover:bg-[#2E8754] sm:w-auto"
                    >
                      <motion.span
                        initial={{ x: "100%" }}
                        whileHover={{ x: "-100%" }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />
                      Open Free Account
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/demo" className="group">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="h-14 w-full text-lg text-white hover:bg-white/10 sm:w-auto"
                    >
                      Watch Demo
                      <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mt-12 flex items-center gap-6"
                >
                  {["Secure", "FDIC Insured", "24/7 Support"].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 text-gray-300"
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#39A36A]">
                        <Shield className="h-3 w-3 text-[#39A36A]" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Cards Display Section */}
              <motion.div
                style={{
                  y: springY,
                  opacity: springOpacity,
                  scale: springScale,
                }}
                className="relative"
              >
                <div className="relative h-[300px] w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                  >
                    <motion.div
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, -2, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="scale-125 transform">
                        <BankCard account={demoCards[0].account} userName={demoCards[0].userName} showBalance={false} />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1f2d] to-transparent"
        />
      </section>

      {/* Personal Banking Section */}
      <section
        id="personal-banking"
        className="relative border-t border-gray-800 bg-[#1a1f2d] py-24 transition-all duration-700"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-transparent to-transparent opacity-75" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#39A36A]/5 via-transparent to-transparent"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-block text-sm font-medium text-[#39A36A] tracking-wider uppercase"
          >
            Personal Banking
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-ibm-plex-serif text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl bg-clip-text"
          >
            Banking Made Personal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-lg text-gray-400 sm:text-xl max-w-3xl mx-auto"
          >
            Experience banking that's tailored to your individual needs with powerful features and personalized service.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10"
        >
          <div className="container mx-auto max-w-[1400px]">
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: Wallet,
                  title: "Easy Account Management",
                  description: "Manage all your accounts in one place with our intuitive dashboard.",
                },
                {
                  icon: Smartphone,
                  title: "Mobile Banking",
                  description: "Bank on the go with our powerful mobile app available 24/7.",
                },
                {
                  icon: Gift,
                  title: "Rewards Program",
                  description: "Earn points on every transaction and redeem for exclusive rewards.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative rounded-2xl border border-gray-800 bg-gray-900/50 p-6 hover:bg-gray-800/50"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#39A36A]/10">
                    <item.icon className="h-6 w-6 text-[#39A36A]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Business Banking Section */}
      <section
        id="business-banking"
        className="relative border-t border-gray-800 bg-[#1a1f2d] py-24 transition-all duration-700"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-transparent to-transparent opacity-75" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#39A36A]/5 via-transparent to-transparent"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-block text-sm font-medium text-[#39A36A] tracking-wider uppercase"
          >
            Business Banking
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-ibm-plex-serif text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl bg-clip-text"
          >
            Empower Your Business Growth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-lg text-gray-400 sm:text-xl max-w-3xl mx-auto"
          >
            Comprehensive banking solutions designed to help your business thrive in today's competitive market.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10"
        >
          <div className="container mx-auto max-w-[1400px]">
            <div className="mt-16">
              <div className="grid gap-8 md:grid-cols-2">
                {[
                  {
                    icon: Building2,
                    title: "Business Accounts",
                    description: "Dedicated business accounts with powerful features for smooth operations.",
                    features: ["Multiple sub-accounts", "Team access control", "Automated reconciliation"],
                  },
                  {
                    icon: TrendingUp,
                    title: "Growth Tools",
                    description: "Tools and insights to help your business grow and succeed.",
                    features: ["Cash flow forecasting", "Expense management", "Business insights"],
                  },
                  {
                    icon: Globe,
                    title: "International Payments",
                    description: "Send and receive payments globally with competitive rates.",
                    features: ["Multi-currency support", "Real-time exchange rates", "SWIFT transfers"],
                  },
                  {
                    icon: Lock,
                    title: "Enhanced Security",
                    description: "Advanced security features to protect your business finances.",
                    features: ["Multi-factor authentication", "Fraud detection", "Transaction monitoring"],
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 p-8 hover:bg-gray-800/50"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2970FF]/10">
                      <item.icon className="h-6 w-6 text-[#2970FF]" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mb-4 text-gray-400">{item.description}</p>
                    <ul className="space-y-2">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="mr-2 h-4 w-4 text-[#39A36A]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Enterprise Solutions Section */}
      <section
        id="enterprise-solutions"
        className="relative border-t border-gray-800 bg-[#1a1f2d] py-24 transition-all duration-700"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-transparent to-transparent opacity-75" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#39A36A]/5 via-transparent to-transparent"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-block text-sm font-medium text-[#39A36A] tracking-wider uppercase"
          >
            Enterprise Solutions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-ibm-plex-serif text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl bg-clip-text"
          >
            Custom Solutions for Large Organizations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-lg text-gray-400 sm:text-xl max-w-3xl mx-auto"
          >
            Tailored banking solutions that scale with your enterprise needs.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10"
        >
          <div className="container mx-auto max-w-[1400px]">
            <div className="mt-16">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Features</TableHead>
                    <TableHead className="text-center text-white">Personal</TableHead>
                    <TableHead className="text-center text-white">Business</TableHead>
                    <TableHead className="text-center text-white">Enterprise</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonFeatures.map((item) => (
                    <TableRow key={item.feature}>
                      <TableCell className="font-medium text-white">{item.feature}</TableCell>
                      <TableCell className="text-center">
                        {item.personal ? (
                          <CheckCircle className="mx-auto h-5 w-5 text-[#39A36A]" />
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.business ? (
                          <CheckCircle className="mx-auto h-5 w-5 text-[#39A36A]" />
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.enterprise ? (
                          <CheckCircle className="mx-auto h-5 w-5 text-[#39A36A]" />
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="relative border-t border-gray-800 bg-[#1a1f2d] py-24 transition-all duration-700"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-transparent to-transparent opacity-75" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#39A36A]/5 via-transparent to-transparent"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-block text-sm font-medium text-[#39A36A] tracking-wider uppercase"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-ibm-plex-serif text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl bg-clip-text"
          >
            Trusted by Leaders Worldwide
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-lg text-gray-400 sm:text-xl max-w-3xl mx-auto"
          >
            See what our customers have to say about their experience with YourBanK.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10"
        >
          <div className="container mx-auto max-w-[1400px]">
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.author}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative rounded-2xl border border-gray-800 bg-gray-900/50 p-8"
                >
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="inline-block h-5 w-5 text-yellow-500" />
                    ))}
                  </div>
                  <p className="mb-4 text-gray-300">{testimonial.quote}</p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Integration Partners Section */}
      <section
        id="integrations"
        className="relative border-t border-gray-800 bg-[#1a1f2d] py-24 transition-all duration-700"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-transparent to-transparent opacity-75" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#39A36A]/5 via-transparent to-transparent"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-block text-sm font-medium text-[#39A36A] tracking-wider uppercase"
          >
            Integrations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-ibm-plex-serif text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl bg-clip-text"
          >
            Seamless Integration Partners
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-lg text-gray-400 sm:text-xl max-w-3xl mx-auto"
          >
            Connect with the tools you already use and love.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10"
        >
          <div className="container mx-auto max-w-[1400px]">
            <motion.div className="mt-16 flex flex-wrap items-center justify-center gap-12">
              {integrationLogos.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                  className="relative h-12 w-32"
                >
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    fill
                    className="object-contain opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative border-y border-gray-800 bg-[#1a1f2d] overflow-hidden">
        <div className="container mx-auto max-w-[1400px] py-12 sm:py-16">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative text-center"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                    className="absolute left-1/2 top-1/2 -z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  />
                  <Icon className="mx-auto mb-4 h-8 w-8 text-[#39A36A] transition-transform duration-300 group-hover:scale-110" />
                  <div className="text-3xl font-bold text-white sm:text-4xl xl:text-5xl">{stat.number}</div>
                  <div className="mt-2 text-sm text-gray-400 sm:text-base">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section ref={featureRef} className="relative overflow-hidden bg-[#1a1f2d] py-24 sm:py-32">
        <div className="container mx-auto max-w-[1400px] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFeatureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-ibm-plex-serif text-3xl font-bold tracking-tight text-white sm:text-4xl xl:text-5xl">
              Banking that works for you
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Everything you need to manage your money in one place. Simple, secure, and designed for the modern world.
            </p>
          </motion.div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-8 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 p-8 transition-all hover:bg-gray-800/50"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    className={cn("mb-6 inline-block rounded-xl p-3", feature.color)}
                  >
                    <feature.icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-4 text-gray-400">{feature.description}</p>
                  <motion.div
                    whileHover={{ x: 5, y: -5 }}
                    className="mt-6 flex items-center gap-2 text-sm font-medium text-[#39A36A]"
                  >
                    Learn more
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-[#39A36A]/10 to-[#2970FF]/10 opacity-0 transition-opacity group-hover:opacity-100"
                    initial={false}
                    animate={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="relative border-t border-gray-800 bg-[#1a1f2d] py-24 sm:py-32">
        <div className="container mx-auto max-w-[1400px]">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative mx-auto max-w-[300px]">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="overflow-hidden rounded-[2.5rem] border-[8px] border-gray-800 bg-white shadow-2xl"
                >
                  <Image src="/icons/phone_image.png" width={300} height={650} alt="Mobile App" className="w-full" />
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute -right-20 top-32 w-64 rounded-xl border border-gray-800 bg-gray-900/95 p-4 shadow-xl backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="rounded-full bg-[#39A36A]/10 p-2"
                    >
                      <Bell className="h-4 w-4 text-[#39A36A]" />
                    </motion.div>
                    <div>
                      <div className="text-sm font-medium text-white">Payment Received</div>
                      <div className="text-xs text-gray-400">You received $1,000 from John Doe</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute -left-16 top-96 w-48 overflow-hidden rounded-xl bg-gradient-to-br from-[#39A36A] to-[#2970FF] p-4 shadow-xl"
                >
                  <div className="space-y-2">
                    <div className="h-2 w-8 rounded-full bg-white/30" />
                    <div className="h-2 w-16 rounded-full bg-white/20" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 flex flex-col justify-center lg:order-2"
            >
              <h2 className="font-ibm-plex-serif text-3xl font-bold tracking-tight text-white sm:text-4xl xl:text-5xl">
                Banking at your fingertips
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-300">
                Download our mobile app to experience the future of banking. Manage your accounts, make payments, and
                track your spending—all from your phone.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <Link href="#" className="group inline-block">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Image
                      src="/icons/app-store.svg"
                      width={120}
                      height={40}
                      alt="Download on the App Store"
                      className="h-[48px] w-auto transition-opacity group-hover:opacity-80"
                    />
                  </motion.div>
                </Link>
                <Link href="#" className="group inline-block">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Image
                      src="/icons/play-store.svg"
                      width={120}
                      height={40}
                      alt="Get it on Google Play"
                      className="h-[48px] w-auto transition-opacity group-hover:opacity-80"
                    />
                  </motion.div>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-8 flex items-center gap-4"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="h-8 w-8 rounded-full border-2 border-[#1a1f2d] bg-gray-800"
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-400">Trusted by 2M+ users worldwide</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative border-t border-gray-800 bg-[#1a1f2d] py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#39A36A]/20 via-[#2970FF]/20 to-transparent"></div>
        <div className="container mx-auto max-w-[1400px] relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-ibm-plex-serif text-3xl font-bold tracking-tight text-white sm:text-4xl xl:text-5xl">
              Ready to transform your banking?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Join millions of people who trust YourBanK for their financial needs. Open your account in minutes.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="group relative w-full overflow-hidden bg-[#39A36A] hover:bg-[#2E8754] sm:w-auto"
                >
                  <motion.span
                    initial={{ x: "100%" }}
                    whileHover={{ x: "-100%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="group w-full text-white hover:bg-white/10 sm:w-auto">
                  Contact Sales
                  <motion.span initial={{ scale: 1 }} whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </motion.span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Add custom styles for text gradient */}
      <style jsx global>{`
        .text-gradient {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
      `}</style>
    </div>
  )
}