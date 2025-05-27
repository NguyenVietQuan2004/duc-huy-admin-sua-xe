"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import BaiVietAcTion from "./blog-action";
import { Blog } from "@/type/blog";

export const BlogColumns: ColumnDef<Blog>[] = [
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
    cell: ({ row }) => <BaiVietAcTion row={row.original} />,
  },
];
