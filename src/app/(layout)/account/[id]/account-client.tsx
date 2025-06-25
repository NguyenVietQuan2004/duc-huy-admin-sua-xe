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
import { toast } from "sonner";

type Props = {
  accountId?: string | null;
};

type AccountForm = Omit<Account, "created_at" | "updated_at"> & { password: string };

export default function AccountDetailClient({ accountId }: Props) {
  const [account, setAccount] = useState<Account | null>(null);
  const token = useAppSelector((state) => state.auth.token);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<AccountForm>({
    defaultValues: {
      _id: "",
      name: "",
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

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
        document.getElementById("email")?.setAttribute("value", "");
        document.getElementById("password")?.setAttribute("value", "");
        return;
      }
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const fetchedAccount = await authApi.getAdminById({
          _id: accountId,
          headers,
        });
        setAccount(fetchedAccount);
        reset({
          ...fetchedAccount,
          password: "",
        });
        document.getElementById("email")?.setAttribute("value", fetchedAccount.email);
        document.getElementById("password")?.setAttribute("value", "");
      } catch (error) {
        console.error("Failed to fetch account:", error);
        setAccount(null);
        reset({
          _id: "",
          name: "",
          email: "",
          password: "",
        });
        document.getElementById("email")?.setAttribute("value", "");
        document.getElementById("password")?.setAttribute("value", "");
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
        toast.success("Sửa thành công");
      } catch (err) {
        console.error("Update failed:", err);
      }
    } else {
      try {
        await authApi.createAdmin({
          headers,
          body: { name, email, password },
        });
        toast.success("Tạo mới thành công");
      } catch (err) {}
    }

    router.push("/account");
    router.refresh();
  };

  const validatePasswordStrength = (password: string | undefined) => {
    if (!password) return true;
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
        <input type="hidden" {...register("_id")} />
        <input type="text" style={{ display: "none" }} autoComplete="off" />
        <input type="password" style={{ display: "none" }} autoComplete="off" />

        {/* Name */}
        <div>
          <Label className="mb-2" htmlFor="name">
            Họ tên
          </Label>
          <Input
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="new-password"
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
          {isLoading ? "Đang xử lí" : isEditing ? "Lưu chỉnh sửa" : "Tạo tài khoản"}
        </Button>
      </form>
    </div>
  );
}
