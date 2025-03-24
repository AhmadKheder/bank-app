// "use client";

import { Navbar } from "@/components/Navbar";
import TranslationProvider from "@/components/TranslationProvider";
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
            <Navbar />
            {children}
          </TranslationProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
