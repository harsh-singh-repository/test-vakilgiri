import { Toaster } from '@/components/ui/sonner';
import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='bg-gray-100 h-full'>
        {children}
        <Toaster/>
    </div>
  );
}
