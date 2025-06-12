"use client";

import { Account } from "@/type/account";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hook";
import { authApi } from "@/api-request/authAPI";
import { useRouter } from "next/navigation";

type Props = {
  accountId?: string | null; // ID tài khoản hoặc "new"
};

type AccountForm = Omit<Account, "created_at" | "updated_at"> & { password: string };

export default function AccountDetailClient({ accountId }: Props) {
  const [account, setAccount] = useState<Account | null>(null);
  const token = useAppSelector((state) => state.auth.token);
  console.log(account);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccountForm>({
    defaultValues: {
      _id: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const isEditing = Boolean(account && account._id);

  useEffect(() => {
    const fetchAccount = async () => {
      if (!accountId || accountId === "new") {
        setAccount(null);
        reset({
          _id: "",
          name: "",
          email: "",
          password: "",
        });
        console.log(2);

        return;
      }
      console.log(1);
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const fetchedAccount = await authApi.getAdminById({
          _id: accountId,
          headers,
        });
        console.log(3);
        setAccount(fetchedAccount);
        reset({
          ...fetchedAccount,
          password: "", // không prefill password
        });
      } catch (error) {
        console.error("Failed to fetch account:", error);
        setAccount(null);
        reset({
          _id: "",
          name: "",
          email: "",
          password: "",
        });
      }
    };

    fetchAccount();
  }, [accountId, reset, token]);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const router = useRouter();

  const onSubmit = async (data: AccountForm) => {
    const { _id, name, email, password } = data;

    if (isEditing) {
      try {
        await authApi.updateAdmin({
          _id,
          headers,
          body: { name, email, password },
        });
      } catch (err) {
        console.error("Update failed:", err);
      }
    } else {
      try {
        await authApi.createAdmin({
          headers,
          body: { name, email, password },
        });
      } catch (err) {}
    }

    router.push("/account");
    router.refresh();
  };
  const validatePasswordStrength = (password: string | undefined) => {
    if (!password) return true; // Cho phép rỗng khi edit
    if (password.length < 6) return "Mật khẩu tối thiểu 6 ký tự";
    if (!/[a-z]/.test(password)) return "Phải có ít nhất 1 chữ thường";
    if (!/[A-Z]/.test(password)) return "Phải có ít nhất 1 chữ hoa";
    if (!/[0-9]/.test(password)) return "Phải có ít nhất 1 số";
    if (!/[^A-Za-z0-9]/.test(password)) return "Phải có ít nhất 1 ký tự đặc biệt";
    return true;
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow rounded-xl">
      <h1 className="text-xl font-bold text-indigo-600 mb-4">
        {isEditing ? "Chỉnh sửa tài khoản" : "Tạo tài khoản mới"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="hidden" {...register("_id")} />

        {/* Name */}
        <div>
          <Label className="mb-2" htmlFor="name">
            Họ tên
          </Label>
          <Input
            id="name"
            type="text"
            {...register("name", {
              required: "Họ tên bắt buộc",
              minLength: {
                value: 2,
                message: "Họ tên quá ngắn",
              },
            })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
              required: "Email bắt buộc",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Email không hợp lệ",
              },
            })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <Label className="mb-2" htmlFor="password">
            Mật khẩu {isEditing ? "(bỏ trống nếu không đổi)" : ""}
          </Label>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: !isEditing ? "Mật khẩu bắt buộc khi tạo mới" : false,
              validate: validatePasswordStrength,
            })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="mt-4">
          {isEditing ? "Lưu chỉnh sửa" : "Tạo tài khoản"}
        </Button>
      </form>
    </div>
  );
}
