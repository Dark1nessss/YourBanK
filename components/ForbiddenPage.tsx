"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-white p-4 lg:p-16 gap-y-10 gap-x-10 lg:gap-x-40">
      <motion.div
        className="w-4/5 md:w-3/5 lg:w-1/2 flex items-center justify-center mx-auto"
        animate={{ x: [-10, 10, 10, -10], y: [0, 0, 0, 0], rotate: [0, 0, 0, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <Image 
          src="/icons/403 Error Forbidden-pana.svg"
          width={300}
          height={300}
          alt="404-error"
          className="w-full h-auto max-w-xs md:max-w-sm lg:max-w-md"
        /> 
      </motion.div>
      <div className="w-4/5 md:w-3/5 lg:w-1/2 mt-10 lg:mt-0 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:space-y-6">
        <motion.h1
          className="text-6xl md:text-7xl lg:text-9xl font-extrabold text-green-600 drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          403
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          It seems you are being naughty! You do not have access to this page.
        </motion.p>
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Link href="/" passHref>
          <Button className="px-8 py-4 md:px-10 md:py-5 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-all">
            Go Home
          </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;