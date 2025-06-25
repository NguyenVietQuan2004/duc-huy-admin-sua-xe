"use client";
import ButtonAddNew from "@/components/button-add-new";
import { DataTable } from "@/components/data-table";
import { AccountColumns } from "./table/account-columns";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hook";
import { authApi } from "@/api-request/authAPI";

export default function AccountClient() {
  const [listAdmins, setListAdmins] = useState([]);
  const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    const fetchAPI = async () => {
      const listAdmins = await authApi.getListAdmins({
        limit: 100,
        page: 1,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setListAdmins(listAdmins);
    };
    fetchAPI();
  }, [token]);
  return (
    <div className="">
      <ButtonAddNew linkTo="account" />
      <div className="   mx-auto py-10">
        <DataTable columns={AccountColumns} data={listAdmins} filterField="name" />
      </div>
    </div>
  );
}
