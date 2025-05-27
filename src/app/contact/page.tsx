"use client";

import { ContactColumns } from "./contact-columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Contact } from "@/type/contact";
import { useRouter } from "next/navigation";

export default function BlogPage() {
  const contactMessages: Contact[] = [
    {
      _id: "1",
      full_name: "Nguyễn Văn A",
      phone_number: "0987654321",
      email: "nguyenvana@example.com",
      message: "Tôi muốn đặt lịch bảo dưỡng xe vào tuần sau.",
      createdAt: new Date("2025-05-20T08:30:00"),
    },
    {
      _id: "2",
      full_name: "Trần Thị B",
      phone_number: "0912345678",
      email: "tranthib@example.com",
      message: "Xe tôi có tiếng kêu lạ, cần kiểm tra gấp.",
      createdAt: new Date("2025-05-21T10:45:00"),
    },
    {
      _id: "3",
      full_name: "Lê Văn C",
      phone_number: "0901234567",
      email: "levanc@example.com",
      message: "Trung tâm có làm việc cuối tuần không?",
      createdAt: new Date("2025-05-22T14:15:00"),
    },
  ];
  const router = useRouter();
  return (
    <div>
      <Button
        variant={"destructive"}
        className="cursor-pointer hover:opacity-70"
        onClick={() => router.push("/khuyenmai/new")}
      >
        Thêm mới
      </Button>
      <div>
        <DataTable columns={ContactColumns} data={contactMessages} filterField="full_name" />
      </div>
    </div>
  );
}
