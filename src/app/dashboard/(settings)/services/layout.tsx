import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='bg-white max-h-fit'>
    <div className='bg-gray-100 h-fit m-0 p-0'>
        {children}
    </div>
    </div>
  );
}
