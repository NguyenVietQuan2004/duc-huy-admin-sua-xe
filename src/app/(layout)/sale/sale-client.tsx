"use client";
import ButtonAddNew from "@/components/button-add-new";
import { DataTable } from "@/components/data-table";
import { SaleColumns } from "./table/sale-columns";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hook";
import { saleApi } from "@/api-request/saleAPI";

export default function SalePage() {
  const [sales, setSales] = useState([]);
  const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    const fetchAPI = async () => {
      const sales = await saleApi.getAllSales({
        limit: 100,
        page: 1,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Gắn token vào header Authorization
        },
      });
      setSales(sales.data);
    };
    fetchAPI();
  }, [token]);

  return (
    <div className="">
      <ButtonAddNew linkTo="sale" />
      <div className="">
        <DataTable columns={SaleColumns} data={sales} filterField="title" />
      </div>
    </div>
  );
}
