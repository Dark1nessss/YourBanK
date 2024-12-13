import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-500 w-[90%] max-w-[1200px] mx-auto rounded-2xl mt-8">
        <section className="py-16 px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h1 className="text-5xl font-bold font-ibm-plex-serif">Welcome to Our Platform</h1>
              <p className="text-xl opacity-90">
                Discover amazing features and boost your productivity with our innovative solutions.
              </p>
              <Button className="bg-green-500 hover:bg-green-600 text-white border-0">
                Get Started
              </Button>
            </div>
            <div className="bg-white rounded-xl p-8 aspect-[4/3] flex items-center justify-center">
              <span className="text-blue-500">Hero Image Placeholder</span>
            </div>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 font-ibm-plex-serif text-blue-900">
            Our Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-4 rounded-xl p-8 space-y-4 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-500">Feature 1</h3>
              <p className="text-blue-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
              <div className="bg-white rounded-lg p-6 aspect-video flex items-center justify-center">
                <span className="text-blue-200">Feature Image</span>
              </div>
            </div>
            <div className="bg-gray-4 rounded-xl p-8 space-y-4 shadow-sm">
              <h3 className="text-2xl font-semibold text-green-500">Feature 2</h3>
              <p className="text-green-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
              <div className="bg-white rounded-lg p-6 aspect-video flex items-center justify-center">
                <span className="text-green-200">Feature Image</span>
              </div>
            </div>
            <div className="bg-gray-4 rounded-xl p-8 space-y-4 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-500">Feature 3</h3>
              <p className="text-blue-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
              <div className="bg-white rounded-lg p-6 aspect-video flex items-center justify-center">
                <span className="text-blue-200">Feature Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-4 rounded-xl p-8 aspect-[4/3] flex items-center justify-center">
              <span className="text-blue-500">Benefits Image</span>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold font-ibm-plex-serif text-blue-900">
                Why Choose Us
              </h2>
              <p className="text-lg text-blue-700">
                Experience the difference with our platform. We provide innovative solutions that help you achieve more with less effort.
              </p>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-[800px] mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold font-ibm-plex-serif text-blue-900">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-blue-700">
            Join thousands of satisfied customers and take your business to the next level with our platform.
          </p>
          <Button className="bg-green-500 hover:bg-green-600 text-white text-lg px-8">
            Sign Up Now
          </Button>
        </div>
      </section>
    </div>
  )
}