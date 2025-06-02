"use client";
import { appointmentApi } from "@/api-request/appointment";
import { AppointmentColumns } from "./table/appointment-columns";
import { DataTable } from "@/components/data-table";
import { useAppSelector } from "@/store/hook";
import { useEffect, useState } from "react";

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    const fetchAPI = async () => {
      const appointments = await appointmentApi.getAllAppointments({
        limit: 100,
        page: 1,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Gắn token vào header Authorization
        },
      });
      console.log(appointments);
      setAppointments(appointments.data);
    };
    fetchAPI();
  }, [token]);

  return (
    <div>
      <div>
        <DataTable columns={AppointmentColumns} data={appointments} filterField="full_name" />
      </div>
    </div>
  );
}
