// "use client";

import { AppSidebar } from "@/components/app-sidebar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
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
      <body className=" max-2-2xl mx-auto p-4 lg:px-8 ">
        <ReduxProvider>
          <TranslationProvider>
            <SidebarProvider>
              <AppSidebar />
              <div className="flex flex-col w-full h-screen">
                <div className="flex flex-row justify-between w-full h-screen items-center">
                  <SidebarTrigger />
                  <LanguageSwitcher />
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
