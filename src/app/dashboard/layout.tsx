import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_component/AppSidebar";
import Navbar from "./_component/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full bg-white">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col w-full">
          <Navbar/>
          <main className="bg-gray-50 h-full">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
