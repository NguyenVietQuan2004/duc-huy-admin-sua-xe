import Header from "@/components/header";
import Sidebar from "./(root)/components/side-bard";
import MobileMenu from "./(root)/components/side-bard-mobile";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen max-w-full p-0 xl:p-6 flex  ">
      <div className="hidden xl:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="flex lg:block justify-between px-4 pt-4">
          <div className="block xl:hidden">
            <MobileMenu />
          </div>
          <Header />
        </div>

        <main className=" bg-[#f4f7fb] py-8 px-4 xl:px-14 rounded-2xl h-full xl:ml-1 max-w-[100vw]">{children}</main>
      </div>
    </div>
  );
}
