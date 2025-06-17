"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useAppSelector } from "@/store/hook";
import Image from "next/image";

const menuGroups = [
  {
    label: "TRANG CHỦ",
    items: [
      { value: "Dashboard", linkTo: "/", private: false },
      { value: "Logo", linkTo: "/logo", group: "Hiển thị", private: false },
      { value: "Lý do", linkTo: "/reason", group: "Hiển thị", private: false },
      { value: "Banner trang chủ", linkTo: "/banner", group: "Hiển thị", private: false },
      { value: "Trung tâm", linkTo: "/center", group: "Hiển thị", private: false },
      { value: "Giới thiệu", linkTo: "/intro", group: "Hiển thị", private: false },
      { value: "Banner các trang", linkTo: "/poster", group: "Hiển thị", private: false },
      { value: "Bảng giá dịch vụ", linkTo: "/bang-gia-dich-vu", group: "Hiển thị", private: false },
      { value: "Thông tin liên hệ", linkTo: "/address", group: "Hiển thị", private: false },
      { value: "Mô tả chung dịch vụ (Homepage)", linkTo: "/content-appointment", group: "Hiển thị", private: false },
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
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});

  const toggleGroup = (groupKey: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <aside className="hidden xl:block w-[260px] p-4 h-[92vh] rounded-2xl overflow-scroll">
      <div className="text-xl font-bold text-[#f8ab34] mb-6">
        <Link href={"/"} className="flex gap-2 items-center">
          <Image
            alt=""
            src={
              "https://res.cloudinary.com/dbuerrrqv/image/upload/v1750137460/moto-automate/banner-images-1750137460443-1.png"
            }
            width={40}
            height={40}
            className=""
          ></Image>
          BMB CAR
        </Link>
      </div>
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

          const groupKey = group.label + "_hiển_thị";
          const isOpen = openGroups[groupKey];

          return (
            <div key={group.label}>
              <div className="mt-4 text-xs text-gray-500">{group.label}</div>

              {/* Mục không thuộc nhóm */}
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

              {/* Mục thuộc nhóm "Hiển thị" */}
              {groupedItems.grouped.length > 0 && (
                <div>
                  <Button
                    variant="ghost"
                    onClick={() => toggleGroup(groupKey)}
                    className="justify-between w-full mt-2 font-light hover:bg-indigo-100 hover:text-indigo-600 flex items-center"
                  >
                    <span>Trang hiển thị</span>
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </Button>

                  {/* Hiệu ứng trượt */}
                  <div
                    ref={contentRef}
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    <div className="ml-4 mt-2 flex flex-col gap-1">
                      {groupedItems.grouped.map((item) => {
                        const isActive = pathname === item.linkTo;
                        return (
                          <Link
                            href={item.linkTo}
                            key={item.value}
                            className={`${item.private && !isBoss ? "hidden" : ""}`}
                          >
                            <Button
                              variant="ghost"
                              className={`justify-start w-full font-light ${
                                isActive ? "bg-indigo-100 text-indigo-600" : "hover:bg-indigo-100 hover:text-indigo-600"
                              }`}
                            >
                              {item.value}
                            </Button>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
