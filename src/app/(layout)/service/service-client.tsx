"use client";
import ButtonAddNew from "@/components/button-add-new";
import { DataTable } from "@/components/data-table";
import { ServiceColumns } from "./table/service-columns";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hook";
import { serviceApi } from "@/api-request/serviceAPI";
import { AArrowDown } from "lucide-react";
export default function ServicePage() {
  const [services, setServices] = useState([]);
  const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    const fetchAPI = async () => {
      const services = await serviceApi.getAllservices({
        limit: 100,
        page: 1,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Gắn token vào header Authorization
        },
      });
      console.log(services, "fdsfsfsa");
      setServices(services);
    };
    fetchAPI();
  }, [token]);
  return (
    <div className="">
      <ButtonAddNew linkTo="service" />
      <div className="   mx-auto py-10">
        <DataTable columns={ServiceColumns} data={services} filterField="name" />
      </div>
    </div>
  );
}
