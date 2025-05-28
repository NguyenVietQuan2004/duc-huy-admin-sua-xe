import ButtonAddNew from "@/components/button-add-new";
import { DataTable } from "@/components/data-table";
import { ServiceColumns } from "./table/service-columns";
import { Service } from "@/type/service";

const initialServices: Service[] = [
  {
    _id: "1",
    name: "first-blog",
    content:
      "This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.This is the content of the first blog.",
    images: ["https://nhatphatauto.vn/wp-content/uploads/2025/04/25T04-05-NhatPhat-Post-BaoDuong-1200x1200-02.jpg"],
    author_id: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: "5",
    name: "first-blog",
    content: "This is the content of the first blog.",
    images: ["https://nhatphatauto.vn/wp-content/uploads/2025/04/25T04-05-NhatPhat-Post-BaoDuong-1200x1200-02.jpg"],
    author_id: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: "2",
    name: "first-blog",
    content: "This is the content of the first blog.",
    images: ["https://nhatphatauto.vn/wp-content/uploads/2025/04/25T04-05-NhatPhat-Post-BaoDuong-1200x1200-02.jpg"],
    author_id: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: "3",
    name: "first-blog",
    content: "This is the content of the first blog.",
    images: ["https://nhatphatauto.vn/wp-content/uploads/2025/04/25T04-05-NhatPhat-Post-BaoDuong-1200x1200-02.jpg"],
    author_id: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export default function ServicePage() {
  return (
    <div className="">
      <ButtonAddNew linkTo="service" />
      <div className="   mx-auto py-10">
        <DataTable
          columns={ServiceColumns}
          data={[...initialServices, ...initialServices, ...initialServices, ...initialServices]}
          filterField="name"
        />
      </div>
    </div>
  );
}
