"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hook";

const menuGroups = [
  {
    label: "TRANG CHỦ",
    items: [
      { value: "Dashboard", linkTo: "/", private: false },

      { value: "Logo", linkTo: "/logo", private: false },
      { value: "Lý do", linkTo: "/reason", private: false },
      { value: "Ảnh nền", linkTo: "/banner", private: false },
      { value: "Trung tâm", linkTo: "/center", private: false },
      { value: "Thông tin liên hệ ", linkTo: "/address", private: false },
      { value: "Nội dung đặt lịch", linkTo: "/content-appointment", private: false },
    ],
  },
  {
    label: "DANH MỤC",
    items: [
      { value: "Dịch vụ", linkTo: "/service", private: false },
      { value: "Liên hệ", linkTo: "/contact", private: false },
      { value: "Bài viết", linkTo: "/blog", private: false },
      { value: "Đặt lịch", linkTo: "/appointment", private: false },
      { value: "Khuyến mãi", linkTo: "/sale", private: false },
    ],
  },
  {
    label: "Quản trị viên (Boss)",
    items: [{ value: "Manage account", linkTo: "/account", private: true }],
  },
];

function Sidebar() {
  const pathname = usePathname();
  const isBoss = !useAppSelector((state) => state.auth.role);
  return (
    <aside className="col-span-2 p-4  h-[92vh] rounded-2xl overflow-scroll">
      <div className="text-xl font-bold text-indigo-600 mb-6">DucHuy</div>
      <nav className="flex flex-col gap-2 h-[100vh]">
        {menuGroups.map((group) => (
          <div key={group.label}>
            <div className="mt-4 text-xs text-gray-500">{group.label}</div>
            {group.items.map((item) => {
              const isActive = pathname === item.linkTo;

              return (
                <Link href={item.linkTo} key={item.value} className={`    ${item.private && !isBoss && "hidden"} `}>
                  <Button
                    variant="ghost"
                    className={`justify-start cursor-pointer transition-all duration-200 w-full mt-2 font-light ${
                      isActive
                        ? "bg-[#635bff] text-white shadow-[0_15px_20px_-8px_rgba(77,91,236,0.231)] hover:bg-[#635bff] hover:text-white"
                        : "hover:bg-indigo-100 hover:text-indigo-600"
                    }`}
                  >
                    {item.value}
                  </Button>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
