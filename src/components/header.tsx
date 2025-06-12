"use client";
import Image from "next/image";
import { UserMenu } from "./user-menu";

function Header() {
  return (
    <div className="px-0 xl:px-8 pb-4  flex justify-end">
      <UserMenu />
    </div>
  );
}

export default Header;
