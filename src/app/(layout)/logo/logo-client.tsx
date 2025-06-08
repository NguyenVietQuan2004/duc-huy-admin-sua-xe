"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useAppSelector } from "@/store/hook";
import { useRouter } from "next/navigation";
import { Logo } from "@/type/logo";
import { logoApi } from "@/api-request/logoAPI";

type LogoForm = {
  images: FileList;
};

export default function LogoClient() {
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();
  const [fileList, setFileList] = useState<File[]>([]);
  const [logo, setLogo] = useState<Logo | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // thêm state loading

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<LogoForm>>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const data = await logoApi.getLogo();
        if (data && data.images?.length > 0) {
          setLogo(data);
          const files: File[] = [];
          for (const url of data.images) {
            const file = await urlToFile(url, getFileNameFromUrl(url), "image/jpeg");
            files.push(file);
          }
          setFileList(files);
        } else {
          setLogo(null);
          setFileList([]);
        }
      } catch {
        setLogo(null);
        setFileList([]);
      }
    };

    fetchLogo();
  }, [token]);

  const urlToFile = async (url: string, filename: string, mimeType: string) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
  };

  const getFileNameFromUrl = (url: string) => {
    return url.split("/").pop() || "logo.jpg";
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      const totalFiles = fileList.length + selectedFiles.length;

      if (totalFiles > 2) {
        alert("Chỉ được chọn đúng đa 2 ảnh.");
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      setFileList((prev) => [...prev, ...selectedFiles]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFileList((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async () => {
    if (fileList.length !== 2) {
      setSubmitError("Bạn phải chọn đúng 2 ảnh để tải lên.");
      return;
    }

    setSubmitError(null);
    setIsLoading(true); // bắt đầu loading

    const formData = new FormData();
    fileList.forEach((file) => formData.append("images", file));
    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (logo?._id) {
        await logoApi.updateLogo({ formData, headers });
      } else {
        await logoApi.createLogo({ formData, headers });
      }

      router.refresh();
    } catch (error) {
      console.error("Upload logo thất bại", error);
      setSubmitError("Upload logo thất bại, vui lòng thử lại.");
    } finally {
      setIsLoading(false); // kết thúc loading
      // Bạn có thể không reload page nếu dùng router.refresh()
      // window.location.reload();
    }
  };

  return (
    <div className="   mx-auto mt-6 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">{logo ? "Cập nhật Logo" : "Tải Logo mới"}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="images" className="mb-2">
            Chọn ảnh logo
          </Label>
          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            disabled={fileList.length >= 2 || isLoading}
            {...register("images")}
            ref={fileInputRef}
            onChange={onFileChange}
          />
          {fileList.length >= 2 && <p className="text-sm text-green-400 mt-1">Bạn đã chọn đủ 2 ảnh tối đa.</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {fileList.map((file, index) => (
            <div key={index} className="relative border rounded p-2">
              <Image
                src={URL.createObjectURL(file)}
                alt={`logo-${index}`}
                width={150}
                height={150}
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
          {isLoading ? "Đang tải..." : logo ? "Lưu chỉnh sửa" : "Tải lên"}
        </Button>

        {submitError && <p className="text-red-500 text-sm mt-2">{submitError}</p>}
      </form>
    </div>
  );
}
