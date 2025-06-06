"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Contact } from "@/type/contact";
import CellStatusContact from "./contact-status-action";
import ContactAction from "./contact-action";

export const ContactColumns: ColumnDef<Contact>[] = [
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
    accessorKey: "message",
    header: "Lời nhắn",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <CellStatusContact row={row.original} />,
  },
  {
    id: "actions2",
    enableHiding: false,
    header: "Hành động",
    cell: ({ row }) => <ContactAction row={row.original} />,
  },
];
