'use client';
import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';
import Image from 'next/image';
import NotFoundImage from '@/assets/notFoundImage.jpg';
import Link from 'next/link';

export default function Page() {

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 bg-white">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Image container with responsive sizing */}
        <div className="w-full max-w-sm mx-auto">
          <Image
            src={NotFoundImage}
            alt="404 Error Illustration"
            className="w-full h-auto"
          />
        </div>
        
        {/* Error text */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-[#091747]">Page Not Found</h1>
          <p className="text-md text-gray-600">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Return home button */}
        <Link href="/dashboard">
          <Button className="inline-flex items-center space-x-2 my-2 bg-[#f21300]">
            <HomeIcon className="w-4 h-4" />
            <span>Return Dashboard</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}