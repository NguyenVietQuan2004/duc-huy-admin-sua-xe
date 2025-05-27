"use client";

import { BlogColumns } from "./blog-columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Blog } from "@/type/blog";
import { useRouter } from "next/navigation";

const initialBlogs: Blog[] = [
  {
    _id: "1",
    title: "First Blog",
    name: "first-blog",
    content: "This is the content of the first blog.",
    images: ["https://nhatphatauto.vn/wp-content/uploads/2025/04/25T04-05-NhatPhat-Post-BaoDuong-1200x1200-02.jpg"],
    images_name: ["placeholder.png"],
    author_id: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: "5",
    title: "First dfsdBlog",
    name: "first-blog",
    content: "This is the content of the first blog.",
    images: ["https://nhatphatauto.vn/wp-content/uploads/2025/04/25T04-05-NhatPhat-Post-BaoDuong-1200x1200-02.jpg"],
    images_name: ["placeholder.png"],
    author_id: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: "2",
    title: "First Bldsadfsog",
    name: "first-blog",
    content: "This is the content of the first blog.",
    images: ["https://nhatphatauto.vn/wp-content/uploads/2025/04/25T04-05-NhatPhat-Post-BaoDuong-1200x1200-02.jpg"],
    images_name: ["placeholder.png"],
    author_id: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: "3",
    title: "First Bsdfdsslog",
    name: "first-blog",
    content: "This is the content of the first blog.",
    images: ["https://nhatphatauto.vn/wp-content/uploads/2025/04/25T04-05-NhatPhat-Post-BaoDuong-1200x1200-02.jpg"],
    images_name: ["placeholder.png"],
    author_id: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export default function BlogPage() {
  const router = useRouter();
  return (
    <div className="">
      <Button
        variant={"destructive"}
        className="cursor-pointer hover:opacity-70"
        onClick={() => router.push("/baiviet/new")}
      >
        Thêm mới
      </Button>
      <div className="">
        <DataTable columns={BlogColumns} data={initialBlogs} filterField="title" />
      </div>
    </div>
  );
}
