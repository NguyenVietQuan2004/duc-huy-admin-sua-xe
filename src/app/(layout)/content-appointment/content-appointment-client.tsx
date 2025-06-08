"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useAppSelector } from "@/store/hook";
import { useRouter } from "next/navigation";
import { ContentAppointmentType } from "@/type/content-appointment";
import { contentAppointmentApi } from "@/api-request/contentAppointmentAPI";

type ContentAppointmentForm = {
  title: string;
  content: string;
  images: FileList;
  adminId: string; // thêm adminId trong form type để dùng register
};

export default function ContentAppointmentClient() {
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();
  const adminId = useAppSelector((state) => state.auth.adminId);
  console.log(adminId);
  const [fileList, setFileList] = useState<File[]>([]);
  const [contentData, setContentData] = useState<ContentAppointmentType | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<Partial<ContentAppointmentForm>>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await contentAppointmentApi.getContentAppointment();
        const data = response[0];
        if (data) {
          setContentData(data);
          reset({ title: data.title, content: data.content, adminId: adminId || undefined }); // reset form có adminId
          const files: File[] = [];
          if (data.images?.length) {
            for (const url of data.images) {
              const file = await urlToFile(url, getFileNameFromUrl(url), "image/jpeg");
              files.push(file);
            }
          }
          // Chỉ lấy 1 ảnh đầu tiên nếu có
          setFileList(files.length > 0 ? [files[0]] : []);
        } else {
          setContentData(null);
          setFileList([]);
          reset({ title: "", content: "", adminId: adminId || undefined });
        }
      } catch {
        setContentData(null);
        setFileList([]);
        reset({ title: "", content: "", adminId: adminId || undefined });
      }
    };

    fetchContent();
  }, [token, reset, adminId]);
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
      const selectedFile = files[0];
      setFileList([selectedFile]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFileList((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: Partial<ContentAppointmentForm>) => {
    if (!data.title || !data.content) {
      setSubmitError("Vui lòng nhập đầy đủ tiêu đề và nội dung.");
      return;
    }

    setSubmitError(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("author_id", adminId || ""); // gửi adminId trong field author_id
    fileList.forEach((file) => formData.append("images", file));

    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (contentData?._id) {
        await contentAppointmentApi.updateContentAppointment({ formData, headers, _id: contentData._id });
      } else {
        await contentAppointmentApi.createContentAppointment({ formData, headers });
      }
      router.refresh();
    } catch (error) {
      console.error("Upload content thất bại", error);
      setSubmitError("Upload thất bại, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="  mx-auto mt-6 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        {contentData ? "Cập nhật Nội dung cuộc hẹn" : "Tạo Nội dung cuộc hẹn mới"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="adminId" className="mb-2">
            Admin ID
          </Label>
          <Input id="adminId" {...register("adminId")} value={adminId || ""} disabled readOnly />
        </div>

        <div>
          <Label htmlFor="title" className="mb-2">
            Tiêu đề
          </Label>
          <Input id="title" {...register("title", { required: "Tiêu đề là bắt buộc" })} disabled={isLoading} />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <Label htmlFor="content" className="mb-2">
            Nội dung
          </Label>
          <textarea
            id="content"
            {...register("content", { required: "Nội dung là bắt buộc" })}
            disabled={isLoading}
            className="w-full p-2 border rounded"
            rows={5}
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
        </div>

        <div>
          <Label htmlFor="images" className="mb-2">
            Chọn ảnh
          </Label>
          <Input
            id="images"
            type="file"
            accept="image/*"
            disabled={fileList.length >= 1 || isLoading}
            {...register("images")}
            ref={fileInputRef}
            onChange={onFileChange}
          />
          {fileList.length >= 1 && <p className="text-sm text-green-400 mt-1">Bạn đã chọn 1 ảnh tối đa.</p>}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {fileList.map((file, index) => (
            <div key={index} className="relative border rounded p-2">
              <Image
                src={URL.createObjectURL(file)}
                alt={`content-img-${index}`}
                width={100}
                height={100}
                className="object-contain rounded"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                disabled={isLoading}
                className="absolute top-1 right-1 text-xs bg-red-500 text-white rounded px-2 py-1"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>

        <Button type="submit" className="mt-4" disabled={isLoading}>
          {isLoading ? "Đang tải..." : contentData ? "Lưu chỉnh sửa" : "Tạo mới"}
        </Button>

        {submitError && <p className="text-red-500 text-sm mt-2">{submitError}</p>}
      </form>
    </div>
  );
}
