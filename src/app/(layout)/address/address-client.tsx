"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hook";
import { useRouter } from "next/navigation";
import { Address } from "@/type/address";
import { addressApi } from "@/api-request/address";
import AlertModal from "@/components/alert-modal";
import { Textarea } from "@/components/ui/textarea";

type AddressForm = {
  address: string;
};

export default function AddressClient() {
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deletingAddress, setDeletingAddress] = useState<Address | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressForm>();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await addressApi.getAddresses();
        const data = Array.isArray(response) ? response : response.data || [];
        setAddresses(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách thông tin liên hệ:", error);
        setAddresses([]);
      }
    };

    fetchAddresses();
  }, [token]);

  const onSubmit = async (data: AddressForm) => {
    setSubmitError(null);
    setIsLoading(true);

    const payload = {
      address: data.address,
    };
    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (editingAddress?._id) {
        await addressApi.updateAddress({ data: payload, headers, _id: editingAddress._id });
        setAddresses((prev) =>
          prev.map((addr) => (addr._id === editingAddress._id ? { ...addr, address: data.address } : addr))
        );
      } else {
        const newAddress = await addressApi.createAddress({ data: payload, headers });
        setAddresses((prev) => [...prev, newAddress.address]);
      }

      reset({ address: "" });
      setEditingAddress(null);
      router.refresh();
    } catch (error) {
      console.error("Lỗi khi xử lý thông tin liên hệ:", error);
      setSubmitError("Lỗi khi xử lý thông tin liên hệ, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    reset({ address: address.address });
  };

  const handleCancelEdit = () => {
    setEditingAddress(null);
    reset({ address: "" });
  };

  const headers = { Authorization: `Bearer ${token}` };

  // Chỉ set address cần xóa và mở modal xác nhận
  const confirmDelete = (address: Address) => {
    setDeletingAddress(address);
    setOpen(true);
  };

  // Xóa thật sau khi user xác nhận
  const handleDelete = async () => {
    if (!deletingAddress?._id) return;

    setIsLoading(true);

    try {
      await addressApi.deleteAddress({ headers, _id: deletingAddress._id });
      setAddresses((prev) => prev.filter((addr) => addr._id !== deletingAddress._id));
      setOpen(false);
      setDeletingAddress(null);
      router.refresh();
    } catch (error) {
      console.error("Lỗi khi xóa thông tin liên hệ:", error);
      setSubmitError("Lỗi khi xóa thông tin liên hệ, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-6 p-6 bg-white rounded-xl shadow  ">
      <h2 className="text-xl font-bold mb-4">
        {editingAddress ? "Cập nhật thông tin liên hệ" : "Thêm thông tin liên hệ mới"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="address" className="mb-2">
            Thông tin liên hệ
          </Label>
          <Textarea
            id="address"
            placeholder="Nhập thông tin liên hệ"
            disabled={isLoading}
            rows={4}
            {...register("address", { required: "thông tin liên hệ là bắt buộc" })}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="mt-4" disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : editingAddress ? "Lưu chỉnh sửa" : "Thêm mới"}
          </Button>
          {editingAddress && (
            <Button type="button" variant="outline" className="mt-4" onClick={handleCancelEdit} disabled={isLoading}>
              Hủy
            </Button>
          )}
        </div>

        {submitError && <p className="text-red-500 text-sm mt-2">{submitError}</p>}
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Danh sách thông tin liên hệ</h3>
        {addresses.length === 0 ? (
          <p className="text-gray-500">Chưa có thông tin liên hệ nào.</p>
        ) : (
          <ul className="space-y-2">
            {addresses.map((address) => (
              <li
                key={address._id || Math.random().toString(36).substring(2)}
                className="flex justify-between items-center p-2 border rounded hover:bg-gray-100"
              >
                <span className="line-clamp-3">{address.address || "thông tin liên hệ không xác định"}</span>
                <div className="flex gap-2">
                  <Button variant="link" onClick={() => handleEdit(address)} disabled={isLoading}>
                    Chỉnh sửa
                  </Button>
                  <Button
                    variant="link"
                    className="text-red-500"
                    onClick={() => confirmDelete(address)}
                    disabled={isLoading}
                  >
                    Xóa
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        action="Xóa"
        variant="destructive"
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
