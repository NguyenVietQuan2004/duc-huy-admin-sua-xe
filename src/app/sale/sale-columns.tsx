"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import SaleAcTion from "./sale-action";
import { Sale } from "@/type/sale";

export const SaleColumns: ColumnDef<Sale>[] = [
  {
    accessorKey: "title",
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
    accessorKey: "content",
    header: "content",
  },
  {
    accessorKey: "name",
    header: "name",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <SaleAcTion row={row.original} />,
  },
];
