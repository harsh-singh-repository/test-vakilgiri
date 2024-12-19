import React from 'react';
// import  Poppins  from 'next/font/google';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='bg-[#EEEEEE] overflow-hidden h-full'>
        {children}
    </div>
  );
}
