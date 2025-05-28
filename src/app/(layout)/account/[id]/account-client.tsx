"use client";

import { Account } from "@/type/account";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  account?: Account | null;
};

type AccountForm = Omit<Account, "created_at" | "updated_at">;

export default function AccountDetailClient({ account }: Props) {
  const isEditing = Boolean(account && account._id);

  const defaultValues: AccountForm = account
    ? {
        ...account,
      }
    : {
        _id: "",
        name: "",
        email: "",
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountForm>({ defaultValues });

  const onSubmit = (data: AccountForm) => {
    const { created_at: _, updated_at: __, ...rest } = data as any;
    const accountData: Account = {
      ...rest,
      created_at: new Date(),
      updated_at: new Date(),
    };
    console.log(isEditing ? "Updating account" : "Creating account", accountData);
    // Gọi API POST hoặc PUT với accountData ở đây
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow rounded-xl">
      <h1 className="text-xl font-bold text-indigo-600 mb-4">
        {isEditing ? "  Chỉnh sửa tài khoản" : " Tạo tài khoản mới"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Hidden ID */}
        <input type="hidden" {...register("_id")} />

        {/* Name */}
        <div>
          <Label className="mb-2" htmlFor="name">
            Họ và tên
          </Label>
          <Input id="name" {...register("name", { required: true })} />
          {errors.name && <p className="text-red-500 text-sm">Bắt buộc</p>}
        </div>

        {/* Email */}
        <div>
          <Label className="mb-2" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+\.\S+$/,
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.type === "pattern" ? "Email không hợp lệ" : "Bắt buộc"}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button type="submit" className="mt-4">
          {isEditing ? "Lưu chỉnh sửa" : "Tạo tài khoản"}
        </Button>
      </form>
    </div>
  );
}
