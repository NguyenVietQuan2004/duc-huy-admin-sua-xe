"use client";

import { SaleColumns } from "./sale-columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Sale } from "@/type/sale";
import { useRouter } from "next/navigation";

const initialSales: Sale[] = [
  {
    _id: "1",
    title: "First sale",
    name: "first-sale",
    content: "This is the content of the first sale.",
    images: ["https://nhatphatauto.vn/wp-content/uploads/2025/04/25T04-05-NhatPhat-Post-BaoDuong-1200x1200-02.jpg"],
    images_name: ["placeholder.png"],
    author_id: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: "5",
    title: "First dfsdsale",
    name: "first-sale",
    content: "This is the content of the first sale.",
    images: ["https://nhatphatauto.vn/wp-content/uploads/2025/04/25T04-05-NhatPhat-Post-BaoDuong-1200x1200-02.jpg"],
    images_name: ["placeholder.png"],
    author_id: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: "2",
    title: "First Bldsadfsog",
    name: "first-sale",
    content: "This is the content of the first sale.",
    images: ["https://nhatphatauto.vn/wp-content/uploads/2025/04/25T04-05-NhatPhat-Post-BaoDuong-1200x1200-02.jpg"],
    images_name: ["placeholder.png"],
    author_id: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: "3",
    title: "First Bsdfdsslog",
    name: "first-sale",
    content: "This is the content of the first sale.",
    images: ["https://nhatphatauto.vn/wp-content/uploads/2025/04/25T04-05-NhatPhat-Post-BaoDuong-1200x1200-02.jpg"],
    images_name: ["placeholder.png"],
    author_id: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export default function SalePage() {
  const router = useRouter();
  return (
    <div className="">
      <Button
        variant={"destructive"}
        className="cursor-pointer hover:opacity-70"
        onClick={() => router.push("/khuyenmai/new")}
      >
        Thêm mới
      </Button>
      <div className="">
        <DataTable
          columns={SaleColumns}
          data={[...initialSales, ...initialSales, ...initialSales, ...initialSales]}
          filterField="title"
        />
      </div>
    </div>
  );
}
