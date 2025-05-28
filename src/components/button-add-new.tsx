"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function ButtonAddNew({ linkTo }: { linkTo: string }) {
  const router = useRouter();

  return (
    <Button
      variant={"destructive"}
      className="cursor-pointer hover:opacity-70 !bg-[#635bff]"
      onClick={() => router.push(`/${linkTo}/new`)}
    >
      Thêm mới
    </Button>
  );
}

export default ButtonAddNew;
