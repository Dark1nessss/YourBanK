'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const NotFound = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 p-4 lg:p-16 gap-y-10 gap-x-10 lg:gap-x-40">
      <motion.div
        className="w-4/5 md:w-3/5 lg:w-1/2 flex items-center justify-center mx-auto"
        animate={{
          x: [0, 10, -10, 0],
          y: [0, -5, 5, 0],
          rotate: [0, 2, -2, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      >
        <Image
          src="/icons/404-error-lost-in-space-animate.svg"
          width={400}
          height={400}
          alt="Astronaut floating in space, representing a 404 error"
          className="w-full h-auto max-w-sm md:max-w-md lg:max-w-lg"
        />
      </motion.div>
      <div className="w-4/5 md:w-3/5 lg:w-1/2 mt-10 lg:mt-0 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-8">
        <motion.h1
          className="text-7xl md:text-8xl lg:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          404
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-lg font-semibold"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Oops! It seems you&apos;ve ventured into uncharted digital space.
        </motion.p>
        <motion.p
          className="text-lg md:text-xl text-gray-600 max-w-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          The page you&apos;re looking for has drifted off into the cosmic void.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Link href="/" passHref>
            <Button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-all flex items-center gap-2">
              <ArrowLeft size={20} />
              Return Home
            </Button>
          </Link>
          <Button
            onClick={refreshPage}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <RefreshCw size={20} />
            Refresh Page
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
