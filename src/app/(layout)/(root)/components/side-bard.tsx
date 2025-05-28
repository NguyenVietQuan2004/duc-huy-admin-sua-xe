"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const menuGroups = [
  {
    label: "HOME",
    items: [{ value: "Dashboard", linkTo: "/" }],
  },
  {
    label: "UTILITIES",
    items: [
      { value: "Bài viết", linkTo: "/blog" },
      { value: "Dịch vụ", linkTo: "/service" },
      { value: "Khuyến mại", linkTo: "/sale" },
      { value: "Đặt lịch", linkTo: "/appointment" },
      { value: "Liên hệ", linkTo: "/contact" },
      { value: "Banner", linkTo: "/banner" },
    ],
  },
  {
    label: "AUTH",
    items: [
      { value: "Login", linkTo: "/login" },
      { value: "Register", linkTo: "/register" },
    ],
  },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="col-span-2 p-4  h-[80vh] rounded-2xl overflow-y-scroll">
      <div className="text-xl font-bold text-indigo-600 mb-6">logo MatDash</div>
      <nav className="flex flex-col gap-2 h-[100vh]">
        {menuGroups.map((group) => (
          <div key={group.label}>
            <div className="mt-4 text-xs text-gray-500">{group.label}</div>
            {group.items.map((item) => {
              const isActive = pathname === item.linkTo;

              return (
                <Link href={item.linkTo} key={item.value} className="">
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
