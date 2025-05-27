"use client";

import { AppointmentColumns } from "./appointment-columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/type/appointment";
import { useRouter } from "next/navigation";

const appointments: Appointment[] = [
  {
    status: true,
    _id: "647f1f77bcf86cd799439011",
    full_name: "Nguyễn Văn A",
    phone_number: "0987654321",
    license_plate: "30A-12345",
    expected_date: new Date("2025-06-01"),
    expected_time: "14:30",
    car_type: "Toyota Camry",
    services: [
      { _id: "647f1f77bcf86cd799439012", name: "Thay dầu" },
      { _id: "647f1f77bcf86cd799439013", name: "Vệ sinh nội thất" },
      { _id: "647f1f77bcf86cd799439014", name: "Sửa phanh" },
    ],
    center: {
      _id: "647f1f77bcf86cd799439017",
      name: "Trung tâm bảo dưỡng ABC",
      address: "123 Đường Lê Lợi",
    },
    created_at: new Date("2025-05-01T10:00:00"),
    updated_at: new Date("2025-05-20T15:00:00"),
  },
  {
    status: true,

    _id: "647f1f77bcf86cd799439015",
    full_name: "Trần Thị B",
    phone_number: "0912345678",
    license_plate: "29B-98765",
    expected_date: new Date("2025-06-02"),
    expected_time: "09:00",
    car_type: "Honda Civic",
    services: [
      { _id: "647f1f77bcf86cd799439015", name: "Thay lốp" },
      { _id: "647f1f77bcf86cd799439016", name: "Kiểm tra phanh" },
      { _id: "647f1f77bcf86cd799439014", name: "Sửa phanh" },
    ],
    center: {
      _id: "647f1f77bcf86cd799439018",
      name: "Garage XYZ",
      address: "456 Đường Nguyễn Huệ",
    },
    created_at: new Date("2025-05-02T11:00:00"),
    updated_at: new Date("2025-05-22T16:00:00"),
  },
  {
    status: false,
    _id: "647f1f77bcf86cd799439019",
    full_name: "Lê Văn C",
    phone_number: "0977654321",
    license_plate: "31C-54321",
    expected_date: new Date("2025-06-03"),
    expected_time: "13:00",
    car_type: "Mazda 3",
    services: [
      { _id: "647f1f77bcf86cd799439012", name: "Thay dầu" },
      { _id: "647f1f77bcf86cd799439017", name: "Rửa xe" },
      { _id: "647f1f77bcf86cd799439018", name: "Kiểm tra máy" },
    ],
    center: {
      _id: "647f1f77bcf86cd799439019",
      name: "Trung tâm Dịch vụ Ô tô DEF",
      address: "789 Đường Phan Đình Phùng",
    },
    created_at: new Date("2025-05-03T12:00:00"),
    updated_at: new Date("2025-05-23T14:00:00"),
  },
];

export default function BlogPage() {
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
        <DataTable columns={AppointmentColumns} data={appointments} filterField="full_name" />
      </div>
    </div>
  );
}
