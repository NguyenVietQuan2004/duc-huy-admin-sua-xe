import ButtonAddNew from "@/components/button-add-new";
import { DataTable } from "@/components/data-table";
import { Blog } from "@/type/blog";
import { BlogColumns } from "./table/blog-columns";

const initialBlogs: Blog[] = [
  {
    _id: "1",
    title: "First Blog",
    name: "first-blog",
    content:
      "This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.",
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
  return (
    <div className="">
      <ButtonAddNew linkTo="blog" />
      <div className="   mx-auto py-10">
        <DataTable
          columns={BlogColumns}
          data={[...initialBlogs, ...initialBlogs, ...initialBlogs, ...initialBlogs]}
          filterField="title"
        />
      </div>
    </div>
  );
}
