import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./provider";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "BMBCAR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <style>{`
    [data-nextjs-toast="true"] {
      display: none !important;
      pointer-events: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      z-index: -1 !important;
    }

    figure.image,
    figure.image.image_resized,
    .cke_editable figure.image {
      background: transparent !important;
      border: none !important;
      outline: none !important;
      padding: 0 !important;
      margin: 1em auto !important;
    }
  `}</style>
      </head>

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

          {/* <PageTransitionLoading /> */}
        </Providers>
        <Toaster
          toastOptions={{
            style: {
              fontSize: "18px",
              padding: "16px 24px",
              fontWeight: "bold",
            },
          }}
        />
      </body>
    </html>
  );
}
