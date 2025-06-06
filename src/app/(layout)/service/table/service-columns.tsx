"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import BaiVietAcTion from "./service-action";
import { Service } from "@/type/service";
import { stripHtml } from "@/lib/utils";

export const ServiceColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "name",
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
    accessorKey: "content",
    header: "Nội dung",
    cell: ({ row }) => {
      const rawContent = row.getValue("content") as string;
      return stripHtml(rawContent);
    },
  },
  {
    header: "Hành động", // hoặc "Action" tuỳ bạn
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <BaiVietAcTion row={row.original} />,
  },
];
