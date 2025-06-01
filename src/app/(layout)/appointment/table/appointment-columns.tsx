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
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone_number",
    header: "phone_number",
  },
  {
    accessorKey: "license_plate",
    header: "license_plate",
  },
  {
    id: "actions1",
    enableHiding: false,
    cell: ({ row }) => <CellStatusAppointment row={row.original} />,
  },
  {
    id: "actions2",
    enableHiding: false,
    cell: ({ row }) => <AppointmentAction row={row.original} />,
  },
];
