import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./provider";
import PageTransitionLoading from "@/components/loading-ui";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DucHuy",
  description: "DucHuy App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={kanit.className}>
        {/* <div className="min-h-screen  p-6 flex  gap-4">
          <Sidebar />
          <div className="flex-1">
            <Header />

            <main className=" grid gap-4 bg-gray-100 py-8 px-14 rounded-2xl">{children}</main>
          </div>
        </div> */}
        <Providers>
          {children}

          <PageTransitionLoading />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
