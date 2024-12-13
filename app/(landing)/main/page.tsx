"use client";

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="welcome-landing">
        <div className="container mx-auto px-4">
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h1 className="text-5xl lg:text-6xl font-bold font-ibm-plex-serif text-white leading-tight">
                Welcome to Our Platform
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                Discover amazing features and boost your productivity with our innovative solutions.
              </p>
              <Link href="/sign-in">
                <Button 
                  className="button-hero"
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="image-hero">
                <span className="text-blue-500 text-lg">Hero Image Placeholder</span>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-0 bg-blue-600/20 backdrop-blur-[1px]" />
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-ibm-plex-serif text-blue-900">
              Our Features
            </h2>
            <p className="text-lg text-blue-700/70 max-w-2xl mx-auto">
              Everything you need to succeed, in one perfect solution.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { title: 'Smart Analytics', color: 'blue' },
              { title: 'Secure Platform', color: 'green' },
              { title: 'Fast Integration', color: 'blue' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className={`relative overflow-hidden rounded-[1.5rem] p-8 h-full bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <div className="space-y-4">
                    <h3 className={`text-2xl font-semibold ${feature.color === 'blue' ? 'text-blue-500' : 'text-green-500'}`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-6 aspect-video flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <span className={`${feature.color === 'blue' ? 'text-blue-500' : 'text-green-500'}`}>
                        Feature Image
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="benefits-image">
                <span className="text-blue-500 text-lg">Benefits Image</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl font-bold font-ibm-plex-serif text-blue-900">
                Why Choose Us
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Experience the difference with our platform. We provide innovative solutions that help you achieve more with less effort.
              </p>
              <Link href="/learn-more">
                <Button className="benefits-button">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 text-center"
        >
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold font-ibm-plex-serif text-blue-900">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Join thousands of satisfied customers and take your business to the next level with our platform.
            </p>
            <Link href="/sign-up">
              <Button className="cta-button">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
