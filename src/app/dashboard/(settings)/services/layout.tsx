import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='bg-gray-100 h-[calc(100vh-100px)] m-0 p-0'>
        {children}
    </div>
  );
}
