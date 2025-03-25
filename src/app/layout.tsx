// "use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/Navbar";
import TranslationProvider from "@/components/TranslationProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ReduxProvider from "@/store/provider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black max-2-2xl mx-auto p-4 lg:px-8 text-white">
        <ReduxProvider>
          <TranslationProvider>
            <SidebarProvider>
              <AppSidebar />
              <div className="flex flex-col w-full h-screen">
                <div className="flex flex-row justify-between w-full h-screen items-center">
                  <SidebarTrigger />
                  <Navbar />
                </div>

                {children}
              </div>
            </SidebarProvider>
          </TranslationProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
