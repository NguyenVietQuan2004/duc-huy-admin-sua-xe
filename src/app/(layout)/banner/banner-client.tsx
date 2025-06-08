"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useAppSelector } from "@/store/hook";
import { useRouter } from "next/navigation";
import { Banner } from "@/type/banner";
import { bannerApi } from "@/api-request/banner";

type BannerForm = {
  images: FileList;
};

export default function BannerClient() {
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();
  const [fileList, setFileList] = useState<File[]>([]);
  const [banner, setBanner] = useState<Banner | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // thêm state loading

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<BannerForm>>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await bannerApi.getBanner();
        if (data && data.images?.length > 0) {
          setBanner(data);
          const files: File[] = [];
          for (const url of data.images) {
            const file = await urlToFile(url, getFileNameFromUrl(url), "image/jpeg");
            files.push(file);
          }
          setFileList(files);
        } else {
          setBanner(null);
          setFileList([]);
        }
      } catch {
        setBanner(null);
        setFileList([]);
      }
    };

    fetchBanner();
  }, [token]);

  const urlToFile = async (url: string, filename: string, mimeType: string) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
  };

  const getFileNameFromUrl = (url: string) => {
    return url.split("/").pop() || "banner.jpg";
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      // Bỏ giới hạn số lượng ảnh, cho phép chọn thoải mái
      setFileList((prev) => [...prev, ...selectedFiles]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFileList((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async () => {
    if (fileList.length === 0) {
      setSubmitError("Bạn phải chọn ít nhất 1 ảnh để tải lên.");
      return;
    }

    setSubmitError(null);
    setIsLoading(true); // bắt đầu loading

    const formData = new FormData();
    fileList.forEach((file) => formData.append("images", file));
    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (banner?._id) {
        await bannerApi.updateBanner({ formData, headers, _id: banner._id });
      } else {
        await bannerApi.createBanner({ formData, headers });
      }

      router.refresh();
    } catch (error) {
      console.error("Upload banner thất bại", error);
      setSubmitError("Upload banner thất bại, vui lòng thử lại.");
    } finally {
      window.location.reload();
      setIsLoading(false);
    }
  };

  return (
    <div className="  mx-auto mt-6 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">{banner ? "Cập nhật Banner" : "Tải Banner mới"}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="images" className="mb-2">
            Chọn ảnh banner
          </Label>
          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            disabled={isLoading}
            {...register("images")}
            ref={fileInputRef}
            onChange={onFileChange}
          />
          {/* Bỏ cảnh báo giới hạn số lượng ảnh */}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {fileList.map((file, index) => (
            <div key={index} className="relative border rounded p-2">
              <Image
                src={URL.createObjectURL(file)}
                alt={`banner-${index}`}
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
          {isLoading ? "Đang tải..." : banner ? "Lưu chỉnh sửa" : "Tải lên"}
        </Button>

        {submitError && <p className="text-red-500 text-sm mt-2">{submitError}</p>}
      </form>
    </div>
  );
}
