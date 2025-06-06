"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import BaiVietAcTion from "./blog-action";
import { Blog } from "@/type/blog";
import { stripHtml } from "@/lib/utils";

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
          Tiêu đề
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
    accessorKey: "name",
    header: "Loại bài",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Hành động", // hoặc "Action" tuỳ bạn
    cell: ({ row }) => <BaiVietAcTion row={row.original} />,
  },
];
