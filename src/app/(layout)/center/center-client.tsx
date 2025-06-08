"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hook";
import { useRouter } from "next/navigation";
import { Center } from "@/type/center";
import { centerApi } from "@/api-request/centerAPI";
import AlertModal from "@/components/alert-modal";
import { Textarea } from "@/components/ui/textarea";

type CenterForm = {
  center: string;
};

export default function CenterClient() {
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();
  const [centeres, setCenteres] = useState<Center[]>([]);
  const [editingCenter, setEditingCenter] = useState<Center | null>(null);
  const [deletingCenter, setDeletingCenter] = useState<Center | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CenterForm>();

  useEffect(() => {
    const fetchCenteres = async () => {
      try {
        const response = await centerApi.getCenters();
        console.log("API response:", response);
        const data = Array.isArray(response) ? response : response.data || [];
        setCenteres(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách trung tâm:", error);
        setCenteres([]);
      }
    };

    fetchCenteres();
  }, [token]);

  const onSubmit = async (data: CenterForm) => {
    setSubmitError(null);
    setIsLoading(true);

    const payload = {
      name: data.center,
    };
    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (editingCenter?._id) {
        await centerApi.updateCenter({ data: payload, headers, _id: editingCenter._id });
        setCenteres((prev) =>
          prev.map((addr) => (addr._id === editingCenter._id ? { ...addr, center: data.center } : addr))
        );
      } else {
        const newCenter = await centerApi.createCenter({ data: payload, headers });
        console.log(newCenter);
        setCenteres((prev) => [...prev, newCenter.center]);
      }

      reset({ center: "" });
      setEditingCenter(null);
      router.refresh();
    } catch (error) {
      console.error("Lỗi khi xử lý trung tâm:", error);
      setSubmitError("Lỗi khi xử lý trung tâm, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleEdit = (center: Center) => {
    setEditingCenter(center);
    reset({ center: center.name });
  };

  const handleCancelEdit = () => {
    setEditingCenter(null);
    reset({ center: "" });
  };

  const headers = { Authorization: `Bearer ${token}` };

  // Chỉ set center cần xóa và mở modal xác nhận
  const confirmDelete = (center: Center) => {
    setDeletingCenter(center);
    setOpen(true);
  };

  // Xóa thật sau khi user xác nhận
  const handleDelete = async () => {
    if (!deletingCenter?._id) return;

    setIsLoading(true);

    try {
      await centerApi.deleteCenter({ headers, _id: deletingCenter._id });
      setCenteres((prev) => prev.filter((addr) => addr._id !== deletingCenter._id));
      setOpen(false);
      setDeletingCenter(null);
      router.refresh();
    } catch (error) {
      console.error("Lỗi khi xóa trung tâm:", error);
      setSubmitError("Lỗi khi xóa trung tâm, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-6 p-6 bg-white rounded-xl shadow ">
      <h2 className="text-xl font-bold mb-4">{editingCenter ? "Cập nhật Trung tâm" : "Thêm Trung tâm mới"}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="center" className="mb-2">
            Trung tâm
          </Label>
          <Textarea
            id="center"
            placeholder="Nhập trung tâm"
            disabled={isLoading}
            rows={4}
            {...register("center", { required: "Trung tâm là bắt buộc" })}
          />
          {errors.center && <p className="text-red-500 text-sm mt-1">{errors.center.message}</p>}
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="mt-4" disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : editingCenter ? "Lưu chỉnh sửa" : "Thêm mới"}
          </Button>
          {editingCenter && (
            <Button type="button" variant="outline" className="mt-4" onClick={handleCancelEdit} disabled={isLoading}>
              Hủy
            </Button>
          )}
        </div>

        {submitError && <p className="text-red-500 text-sm mt-2">{submitError}</p>}
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Danh sách trung tâm</h3>
        {centeres.length === 0 ? (
          <p className="text-gray-500">Chưa có trung tâm nào.</p>
        ) : (
          <ul className="space-y-2">
            {centeres.map((center) => (
              <li
                key={center._id || Math.random().toString(36).substring(2)}
                className="flex justify-between items-center p-2 border rounded hover:bg-gray-100"
              >
                <span className="line-clamp-3">{center.name || "Trung tâm không xác định"}</span>
                <div className="flex gap-2">
                  <Button variant="link" onClick={() => handleEdit(center)} disabled={isLoading}>
                    Chỉnh sửa
                  </Button>
                  <Button
                    variant="link"
                    className="text-red-500"
                    onClick={() => confirmDelete(center)}
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
