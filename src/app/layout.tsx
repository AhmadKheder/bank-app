// "use client";

import { AppSidebar } from "@/components/app-sidebar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ModeToggle } from "@/components/ModeToggle";
import TranslationProvider from "@/components/TranslationProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ReduxProvider from "@/store/provider";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className=" max-2-2xl mx-auto p-4 lg:px-8 ">
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TranslationProvider>
              <SidebarProvider>
                <AppSidebar />
                <div className="flex flex-col w-full h-screen">
                  <div className="flex flex-row justify-between w-full h-screen items-center">
                    <div className="flex gap-2">
                      <SidebarTrigger />
                      <ModeToggle />
                    </div>
                    <LanguageSwitcher />
                  </div>

                  {children}
                </div>
              </SidebarProvider>
            </TranslationProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
