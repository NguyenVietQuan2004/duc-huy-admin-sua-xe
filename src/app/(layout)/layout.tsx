import Header from "@/components/header";
import Sidebar from "./(root)/components/side-bard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen max-w-full p-6 grid grid-cols-12  ">
      <Sidebar />
      <div className="col-span-10">
        <Header />

        {/* <main className=" bg-[#e9f2f8] py-8 px-14 rounded-2xl">{children}</main> */}
        <main className=" bg-[#f4f7fb] py-8 px-14 rounded-2xl h-full ml-1">{children}</main>
      </div>
    </div>
  );
}
