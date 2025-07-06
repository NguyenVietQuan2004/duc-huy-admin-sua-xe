"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, Mail, ListChecks, LogOut } from "lucide-react";
import Image from "next/image";
import { authApi } from "@/api-request/authAPI";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hook";
import { logout } from "@/store/slices/authSlice";

export function UserMenu() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    await authApi.signOutNextServer();
    dispatch(logout());
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2 select-none hover:bg-transparent">
          {/* <User className="w-5 h-5" /> */}

          <div className=" relative  border-2 border-transparent hover:border-indigo-600  rounded-full overflow-hidden transition-all duration-300 cursor-pointer">
            <Image
              alt=""
              src={
                "data:image/jpeg;base64,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"
              }
              width={36}
              height={36}
              className="object-cover aspect-square"
            />
            <div className="absolute"></div>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52 p-2 space-y-1">
        {/* <DropdownMenuItem className="gap-2">
          <User className="w-4 h-4" />
          My Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Mail className="w-4 h-4" />
          My Account
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <ListChecks className="w-4 h-4" />
          My Task
        </DropdownMenuItem> */}
        <div className="pt-2" onClick={handleLogout}>
          <Button variant="outline" className="w-full border border-violet-500 text-violet-600 hover:bg-violet-50">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
