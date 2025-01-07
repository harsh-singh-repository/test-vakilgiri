"use client"
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_component/AppSidebar";
import Navbar from "./_component/Navbar";
// import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // const [sideBarOpen,setSideBarOpen] = useState<boolean>(false);
  
  // const isMobile = useMediaQuery({ maxWidth: 768 });

  // useEffect(() => {
  //   if (isMobile) {
  //     setIsSidebarOpen(false);
  //   }
  // }, [isMobile]);

  return (
    <div className="h-full bg-white object-contain">
      <SidebarProvider>
       
        <div className="flex flex-col w-full">
          <Navbar/>
          <main className="bg-[#f6f6f6] h-full flex">
            <div className="mt-10">
               <AppSidebar />
            </div>
            <div className="w-full">
            {children}
            </div>
            </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
