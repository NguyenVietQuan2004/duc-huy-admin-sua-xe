"use client";
import ButtonAddNew from "@/components/button-add-new";
import { DataTable } from "@/components/data-table";
import { BlogColumns } from "./table/blog-columns";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hook";
import { blogApi } from "@/api-request/concuaapi";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    const fetchAPI = async () => {
      const blogs = await blogApi.getAllBlogs({
        limit: 100,
        page: 1,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(blogs.data);
    };
    fetchAPI();
  }, [token]);
  return (
    <div className="">
      <ButtonAddNew linkTo="blog" />
      <div className="   mx-auto py-10">
        <DataTable columns={BlogColumns} data={blogs} filterField="title" />
      </div>
    </div>
  );
}
