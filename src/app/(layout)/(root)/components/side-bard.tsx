"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/store/hook";

const menuGroups = [
  {
    label: "TRANG CHỦ",
    items: [
      { value: "Dashboard", linkTo: "/", private: false },

      // Gom nhóm hiển thị vào 1 dropdown
      { value: "Logo", linkTo: "/logo", group: "Hiển thị", private: false },
      { value: "Lý do", linkTo: "/reason", group: "Hiển thị", private: false },
      { value: "Ảnh nền", linkTo: "/banner", group: "Hiển thị", private: false },
      { value: "Trung tâm", linkTo: "/center", group: "Hiển thị", private: false },
      { value: "Giới thiệu", linkTo: "/intro", group: "Hiển thị", private: false },
      { value: "Poster các trang", linkTo: "/poster", group: "Hiển thị", private: false },
      { value: "Thông tin liên hệ", linkTo: "/address", group: "Hiển thị", private: false },
      { value: "Nội dung đặt lịch", linkTo: "/content-appointment", group: "Hiển thị", private: false },
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
    <aside className="hidden xl:block w-[260px] p-4 h-[92vh] rounded-2xl overflow-scroll">
      <div className="text-xl font-bold text-indigo-600 mb-6">DucHuy</div>
      <nav className="flex flex-col gap-2 h-[100vh]">
        {menuGroups.map((group) => {
          const groupedItems = group.items.reduce(
            (acc, item) => {
              if (item.group) {
                acc.grouped.push(item);
              } else {
                acc.ungrouped.push(item);
              }
              return acc;
            },
            { grouped: [] as typeof group.items, ungrouped: [] as typeof group.items }
          );

          return (
            <div key={group.label}>
              <div className="mt-4 text-xs text-gray-500">{group.label}</div>

              {/* Hiển thị các item không thuộc nhóm */}
              {groupedItems.ungrouped.map((item) => {
                const isActive = pathname === item.linkTo;
                return (
                  <Link href={item.linkTo} key={item.value} className={`${item.private && !isBoss ? "hidden" : ""}`}>
                    <Button
                      variant="ghost"
                      className={`justify-start w-full mt-2 font-light transition-all ${
                        isActive
                          ? "bg-[#635bff] text-white shadow hover:bg-[#635bff]"
                          : "hover:bg-indigo-100 hover:text-indigo-600"
                      }`}
                    >
                      {item.value}
                    </Button>
                  </Link>
                );
              })}

              {/* Dropdown cho các mục thuộc nhóm "Hiển thị" */}
              {groupedItems.grouped.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="justify-start w-full mt-2 font-light hover:bg-indigo-100 hover:text-indigo-600"
                    >
                      Trang hiển thị
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {groupedItems.grouped.map((item) => {
                      const isActive = pathname === item.linkTo;
                      return (
                        <Link
                          href={item.linkTo}
                          key={item.value}
                          className={`${item.private && !isBoss ? "hidden" : ""}`}
                        >
                          <DropdownMenuItem
                            className={`cursor-pointer ${isActive ? "bg-indigo-100 text-indigo-600" : ""}`}
                          >
                            {item.value}
                          </DropdownMenuItem>
                        </Link>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
