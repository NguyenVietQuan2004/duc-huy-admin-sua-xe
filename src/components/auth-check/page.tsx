"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hook";

export default function AuthCheckPage() {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const data = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      // Nếu có isAuthenticated thì chuyển về trang chính (hoặc bạn muốn redirect trang nào)
      window.location.href = "/";
    } else {
      // Nếu không có isAuthenticated thì chuyển sang login
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  return <div></div>;
}
