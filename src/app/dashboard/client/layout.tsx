import React from 'react';
// import  Poppins  from 'next/font/google';
// import Providers from '@/components/Providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='bg-[#eeeeee] h-full'>
      {/* <Providers> */}
        {children}
      {/* </Providers> */}
    </div>
  );
}
