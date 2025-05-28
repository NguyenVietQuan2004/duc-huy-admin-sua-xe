import ButtonAddNew from "@/components/button-add-new";
import { DataTable } from "@/components/data-table";
import { Sale } from "@/type/sale";
import { SaleColumns } from "./table/sale-columns";

const initialSales: Sale[] = [
  {
    _id: "1",
    title: "First sale",
    name: "first-sale",
    content: "This is the content of the first sale.",
    images: ["https://nhatphatauto.vn/wp-content/uploads/2025/04/25T04-05-NhatPhat-Post-BaoDuong-1200x1200-02.jpg"],
    images_name: ["placeholder.png"],
    author_id: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: "5",
    title: "First dfsdsale",
    name: "first-sale",
    content: "This is the content of the first sale.",
    images: ["https://nhatphatauto.vn/wp-content/uploads/2025/04/25T04-05-NhatPhat-Post-BaoDuong-1200x1200-02.jpg"],
    images_name: ["placeholder.png"],
    author_id: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: "2",
    title: "First Bldsadfsog",
    name: "first-sale",
    content: "This is the content of the first sale.",
    images: ["https://nhatphatauto.vn/wp-content/uploads/2025/04/25T04-05-NhatPhat-Post-BaoDuong-1200x1200-02.jpg"],
    images_name: ["placeholder.png"],
    author_id: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: "3",
    title: "First Bsdfdsslog",
    name: "first-sale",
    content: "This is the content of the first sale.",
    images: ["https://nhatphatauto.vn/wp-content/uploads/2025/04/25T04-05-NhatPhat-Post-BaoDuong-1200x1200-02.jpg"],
    images_name: ["placeholder.png"],
    author_id: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export default function SalePage() {
  return (
    <div className="">
      <ButtonAddNew linkTo="sale" />
      <div className="">
        <DataTable
          columns={SaleColumns}
          data={[...initialSales, ...initialSales, ...initialSales, ...initialSales]}
          filterField="title"
        />
      </div>
    </div>
  );
}
