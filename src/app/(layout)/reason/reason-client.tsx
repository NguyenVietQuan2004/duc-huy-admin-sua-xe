"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useAppSelector } from "@/store/hook";
import { useRouter } from "next/navigation";
import { Reason } from "@/type/reason";
import { reasonApi } from "@/api-request/reasonAPI";
import { toast } from "sonner";

type ReasonForm = {
  title: string;
  content: string;
  reason: string;
  images: FileList;
};

export default function ReasonClient() {
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();
  const [fileList, setFileList] = useState<File[]>([]);
  const [reasonData, setReasonData] = useState<Reason | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReasonForm>();

  useEffect(() => {
    const fetchReason = async () => {
      try {
        const data = await reasonApi.getReason();
        if (data && data.images?.length > 0) {
          setReasonData(data);
          const file = await urlToFile(data.images[0], getFileNameFromUrl(data.images[0]), "image/jpeg");
          setFileList([file]);
          reset({
            title: data.title,
            content: data.content,
            reason: data.reason.slice(0, 6).join("; "),
          });
        } else {
          setReasonData(null);
          setFileList([]);
        }
      } catch {
        setReasonData(null);
        setFileList([]);
      }
    };

    fetchReason();
  }, [token, reset]);

  const urlToFile = async (url: string, filename: string, mimeType: string) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
  };

  const getFileNameFromUrl = (url: string) => {
    return url.split("/").pop() || "image.jpg";
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileList([files[0]]); // Chỉ lấy đúng 1 ảnh
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = () => {
    setFileList([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: ReasonForm) => {
    if (fileList.length === 0) {
      setSubmitError("Bạn phải chọn 1 ảnh để tải lên.");
      return;
    }

    setSubmitError(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("author_id", token || "");

    const reasons = data.reason
      .split(";")
      .map((r) => r.trim())
      .filter(Boolean)
      .slice(0, 6);
    reasons.forEach((r) => formData.append("reason[]", r));
    formData.append("images", fileList[0]); // Chỉ 1 ảnh

    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (reasonData?._id) {
        await reasonApi.updateReason({ formData, headers, _id: reasonData._id });
      } else {
        await reasonApi.createReason({ formData, headers });
      }
      toast.success("Thao tác thành công");
      router.refresh();
    } catch (error) {
      console.error("Lỗi khi xử lý lý do", error);
      setSubmitError("Lỗi khi xử lý lý do, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="  mx-auto mt-6 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">{reasonData ? "Cập nhật Lý do" : "Tạo Lý do mới"}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="title" className="mb-2">
            Tiêu đề
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Nhập tiêu đề"
            disabled={isLoading}
            {...register("title", { required: "Tiêu đề là bắt buộc" })}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <Label htmlFor="content" className="mb-2">
            Nội dung
          </Label>
          <Textarea
            id="content"
            placeholder="Nhập nội dung"
            disabled={isLoading}
            {...register("content", { required: "Nội dung là bắt buộc" })}
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
        </div>

        <div>
          <Label htmlFor="reason" className="mb-2">
            Lý do (cách nhau bởi dấu **chấm phẩy `;`** - tối đa 6)
          </Label>
          <Textarea
            id="reason"
            rows={10}
            placeholder="Nhập các lý do, ví dụ: lý do 1; lý do 2"
            disabled={isLoading}
            {...register("reason", { required: "Lý do là bắt buộc" })}
          />
          {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>}
        </div>

        <div>
          <Label htmlFor="images" className="mb-2">
            Chọn ảnh (chỉ 1 ảnh duy nhất)
          </Label>
          <Input
            id="images"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register("images")}
            ref={fileInputRef}
            onChange={onFileChange}
          />
          {fileList.length === 1 && <p className="text-sm text-green-400 mt-1">Bạn đã chọn 1 ảnh.</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {fileList.map((file, index) => (
            <div key={index} className="relative border rounded p-2">
              <Image
                src={URL.createObjectURL(file)}
                alt={`image-${index}`}
                width={150}
                height={150}
                className="object-contain rounded"
              />
              <button
                type="button"
                onClick={removeFile}
                disabled={isLoading}
                className="absolute top-1 right-1 text-xs bg-red-500 text-white rounded px-2 py-1"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>

        <Button type="submit" className="mt-4" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : reasonData ? "Lưu chỉnh sửa" : "Tạo mới"}
        </Button>

        {submitError && <p className="text-red-500 text-sm mt-2">{submitError}</p>}
      </form>
    </div>
  );
}
