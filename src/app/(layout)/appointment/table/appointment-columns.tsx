"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Appointment } from "@/type/appointment";
import CellStatusAppointment from "./appointment-status-action";
import AppointmentAction from "./appointment-action";

export const AppointmentColumns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="cursor-pointer hover:opacity-70"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone_number",
    header: "Số điện thoại",
  },
  {
    accessorKey: "license_plate",
    header: "Biển số xe",
  },
  {
    accessorKey: "expected_date",
    header: "Ngày dự kiến",
  },
  {
    accessorKey: "expected_time",
    header: "Giờ dự kiến",
  },
  {
    accessorKey: "car_type",
    header: "Loại xe",
  },
  {
    accessorKey: "services",
    header: "Dịch vụ",
  },
  {
    id: "actions1",
    enableHiding: false,
    cell: ({ row }) => <CellStatusAppointment row={row.original} />,
  },
  {
    id: "actions2",
    enableHiding: false,
    header: "Hành động", // hoặc "Action" tuỳ bạn
    cell: ({ row }) => <AppointmentAction row={row.original} />,
  },
];
