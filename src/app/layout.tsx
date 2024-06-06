import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./_components/Sidebar";
import MaxWidthWrapper from "./_components/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <div className="flex py-6 pr-6 h-screen">
          <Sidebar />

          <div className="ml-[80px] p-2 flex-grow bg-muted rounded-2xl ">
            <ScrollArea className="h-full w-full rounded-2xl p-4">
              {children}
            </ScrollArea>
          </div>
        </div>
      </body>
    </html>
  );
}
