"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AlertModal from "@/components/alert-modal";
import { Blog } from "@/type/blog";
import { blogApi } from "@/api-request/concuaapi";
import { useAppSelector } from "@/store/hook";
import Link from "next/link";
interface CellActionProps {
  row: Blog;
}
function BlogAction({ row }: CellActionProps) {
  const [open, setOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const router = useRouter();
  const onCopy = () => {
    toast("Đã copy");
    navigator.clipboard.writeText(row._id);
  };
  const handleDeleteProduct = async () => {
    await blogApi.deleteBlog({ _id: row._id, headers });
    window.location.reload();
    setOpen(false);
  };

  return (
    <div>
      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        action="Xóa"
        variant="destructive"
        onConfirm={handleDeleteProduct}
        // isLoading={isLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onCopy}>Copy ID</DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem onClick={() => router.push(`/blog/${row._id}`)}> */}
          <DropdownMenuItem
            onClick={() => {
              window.location.href = `/blog/${row._id}`;
            }}
          >
            Update
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => router.push(`/blog/${row._id}`)}>Update</DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => setOpen(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default BlogAction;
