"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hook";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
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

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isBoss = !useAppSelector((state) => state.auth.role);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Menu className="h-6 w-6 cursor-pointer" />
      </SheetTrigger>

      <SheetContent side="right" className="w-[300px] p-4 bg-white text-black">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-[#f8ab34]">
            <Link href={"/"} className="flex gap-2">
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
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          {menuGroups.map((group) => {
            const groupedItems = group.items.reduce(
              (acc: any, item: any) => {
                if (item.group) {
                  acc.grouped.push(item);
                } else {
                  acc.ungrouped.push(item);
                }
                return acc;
              },
              { grouped: [], ungrouped: [] }
            );

            return (
              <Accordion type="multiple" key={group.label} className="mb-4">
                <AccordionItem value={group.label}>
                  <AccordionTrigger className="text-sm text-left" tabIndex={-1}>
                    {group.label}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-1 text-sm">
                    {groupedItems.ungrouped.map(
                      (item: any) =>
                        (!item.private || isBoss) && (
                          <Link key={item.value} href={item.linkTo} onClick={() => setOpen(false)}>
                            <Button
                              variant="ghost"
                              className={`w-full justify-start font-light text-sm ${
                                pathname === item.linkTo
                                  ? "bg-[#635bff] text-white shadow"
                                  : "hover:bg-indigo-100 hover:text-indigo-600"
                              }`}
                            >
                              {item.value}
                            </Button>
                          </Link>
                        )
                    )}

                    {groupedItems.grouped.length > 0 && (
                      <div>
                        <div className="font-semibold text-xs text-gray-500 mt-2 px-2">Trang hiển thị</div>
                        {groupedItems.grouped.map(
                          (item: any) =>
                            (!item.private || isBoss) && (
                              <Link tabIndex={-1} key={item.value} href={item.linkTo} onClick={() => setOpen(false)}>
                                <Button
                                  variant="ghost"
                                  className={`w-full justify-start font-light text-sm pl-4 ${
                                    pathname === item.linkTo
                                      ? "bg-[#635bff] text-white shadow"
                                      : "hover:bg-indigo-100 hover:text-indigo-600"
                                  }`}
                                >
                                  {item.value}
                                </Button>
                              </Link>
                            )
                        )}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
