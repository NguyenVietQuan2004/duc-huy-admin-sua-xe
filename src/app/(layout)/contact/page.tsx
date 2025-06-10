"use client";
import ButtonAddNew from "@/components/button-add-new";
import { ContactColumns } from "./table/contact-columns";
import { DataTable } from "@/components/data-table";
import { Contact } from "@/type/contact";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hook";
import { contactApi } from "@/api-request/contactAPI";

export default function ContactPage() {
  const [contacts, setContacts] = useState([]);
  const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    const fetchAPI = async () => {
      const contacts = await contactApi.getAllContacts({
        limit: 100,
        page: 1,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Gắn token vào header Authorization
        },
      });
      setContacts(contacts.data);
    };
    fetchAPI();
  }, [token]);
  return (
    <div>
      {/* <ButtonAddNew linkTo="contact" /> */}
      <div>
        <DataTable columns={ContactColumns} data={contacts} filterField="full_name" />
      </div>
    </div>
  );
}
