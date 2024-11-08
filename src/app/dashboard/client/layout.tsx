
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full bg-white">
      <div className="flex flex-col w-full">
      <main className="">
        {children}
      </main>
      </div>
  </div>
  );
}