"use client";
import ButtonAddNew from "@/components/button-add-new";
import { DataTable } from "@/components/data-table";
import { CategoryColumns } from "./table/category-columns";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hook";
import { categoryApi } from "@/api-request/categoryAPI";
import { AArrowDown } from "lucide-react";
export default function CategoryPage() {
  const [categorys, setCategorys] = useState([]);
  const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    const fetchAPI = async () => {
      const categorys = await categoryApi.getAllcategory({
        limit: 100,
        page: 1,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Gắn token vào header Authorization
        },
      });
      console.log(categorys, "fdsfsfsa");
      setCategorys(categorys);
    };
    fetchAPI();
  }, [token]);
  return (
    <div className="">
      <ButtonAddNew linkTo="category" />
      <div className="   mx-auto py-10">
        <DataTable columns={CategoryColumns} data={categorys} filterField="name" />
      </div>
    </div>
  );
}
