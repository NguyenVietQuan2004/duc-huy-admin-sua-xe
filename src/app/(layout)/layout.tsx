import Header from "@/components/header";
import Sidebar from "./(root)/components/side-bard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen max-w-full p-6 grid grid-cols-12 ">
      <Sidebar />
      <div className="col-span-10">
        <Header />

        <main className=" bg-[#fafdff] py-8 px-14 rounded-2xl">{children}</main>
      </div>
    </div>
  );
}
