import ButtonAddNew from "@/components/button-add-new";
import { ContactColumns } from "./table/contact-columns";
import { DataTable } from "@/components/data-table";
import { Contact } from "@/type/contact";

export default function ContactPage() {
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
  return (
    <div>
      <ButtonAddNew linkTo="contact" />
      <div>
        <DataTable
          columns={ContactColumns}
          data={[...contactMessages, ...contactMessages, ...contactMessages, ...contactMessages]}
          filterField="full_name"
        />
      </div>
    </div>
  );
}
