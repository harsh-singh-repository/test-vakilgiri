'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';
import Image from 'next/image';
import ServerErrorImage from '@/assets/InternalServerErrorImage.jpg';

export default function Custom500() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 bg-white">
      <div className="max-w-2xl w-full text-center space-y-6">
        {/* Image container with responsive sizing */}
        <div className="w-full max-w-xl mx-auto">
          <Image
            src={ServerErrorImage}
            alt="500 Internal Server Error Illustration"
            width={600}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-[#091747]">Internal Server Error</h1>
          <p className="text-lg text-gray-600">
            Oops! Something went wrong on our server. We're working to fix the issue.
          </p>
          <p className="text-sm text-gray-500">
            Please try again later or contact support if the problem persists.
          </p>
        </div>

        {/* <Link href="/dashboard" passHref>
          <Button className="inline-flex items-center space-x-2 bg-[#f21300] mt-2">
            <HomeIcon className="w-4 h-4" />
            <span>Return Dashboard</span>
          </Button>
        </Link> */}
      </div>
    </div>
  );
}