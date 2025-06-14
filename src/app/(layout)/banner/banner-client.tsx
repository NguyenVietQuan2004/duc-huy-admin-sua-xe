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
import { bannerApi } from "@/api-request/bannerAPI";

interface BannerForm {
  images: FileList;
  images_name: string[];
}

export default function BannerClient() {
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();
  const [fileList, setFileList] = useState<File[]>([]);
  const [imageNames, setImageNames] = useState<string[]>([]);
  const [banner, setBanner] = useState<Banner | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
        const response = await bannerApi.getBanner();
        const data = response[0];
        if (data && data.images?.length > 0) {
          setBanner(data);
          const files: File[] = [];
          for (const url of data.images) {
            const file = await urlToFile(url, getFileNameFromUrl(url), "image/jpeg");
            files.push(file);
          }
          setFileList(files);
          setImageNames(data.images_name || new Array(files.length).fill(""));
        } else {
          setBanner(null);
          setFileList([]);
          setImageNames([]);
        }
      } catch {
        setBanner(null);
        setFileList([]);
        setImageNames([]);
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
      setFileList((prev) => [...prev, ...selectedFiles]);
      setImageNames((prev) => [...prev, ...selectedFiles.map(() => "")]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFileList((prev) => prev.filter((_, i) => i !== index));
    setImageNames((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async () => {
    if (fileList.length === 0) {
      setSubmitError("Bạn phải chọn ít nhất 1 ảnh để tải lên.");
      return;
    }

    setSubmitError(null);
    setIsLoading(true);

    const formData = new FormData();
    fileList.forEach((file) => formData.append("images", file));
    formData.append("images_name", JSON.stringify(imageNames)); // ✅ Gửi dưới dạng JSON string

    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (banner?._id) {
        await bannerApi.updateBanner({ formData, headers, _id: banner._id });
      } else {
        await bannerApi.createBanner({ formData, headers });
      }

      // router.refresh();
    } catch (error) {
      console.error("Upload banner thất bại", error);
      setSubmitError("Upload banner thất bại, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-6 p-6 bg-white rounded-xl shadow">
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
              <Input
                type="text"
                value={imageNames[index] || ""}
                onChange={(e) => {
                  const newNames = [...imageNames];
                  newNames[index] = e.target.value;
                  setImageNames(newNames);
                }}
                placeholder="Nhập nội dung hiển thị cho slider"
                className="mt-2"
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
