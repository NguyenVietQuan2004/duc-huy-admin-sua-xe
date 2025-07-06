"use client";

import { IntroType } from "@/type/intro";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hook";
import { introApi } from "@/api-request/introAPI";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ContentInput from "@/components/content-blog";
import { toast } from "sonner";

type IntroForm = Omit<IntroType, "images" | "created_at" | "updated_at"> & {
  images: FileList;
};

export default function IntroClient() {
  const [intro, setIntro] = useState<IntroType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [fileList, setFileList] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Partial<IntroForm>>();

  const isEditing = Boolean(intro?._id);

  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const response = await introApi.getIntro();
        const data = Array.isArray(response) ? response[0] || null : response.data || null;
        setIntro(data);
        if (data) {
          const { created_at, updated_at, images, ...rest } = data;
          reset(rest);
          const files: File[] = [];
          for (const url of images) {
            try {
              const file = await urlToFile(url, getFileNameFromUrl(url), "image/jpeg");
              files.push(file);
            } catch (e) {
              console.error("Chuyển URL thành File lỗi:", e);
            }
          }
          setFileList(files);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu giới thiệu:", error);
        setIntro(null);
      }
    };

    fetchIntro();
  }, [token, reset]);

  async function urlToFile(url: string, filename: string, mimeType: string) {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
  }

  function getFileNameFromUrl(url: string) {
    return url.split("/").pop() || "image.jpg";
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      setFileList((prev) => [...prev, ...Array.from(files)]);
    }
  }

  function removeFile(index: number) {
    setFileList((prev) => prev.filter((_, i) => i !== index));
  }

  const onSubmit = async (data: Partial<IntroForm>) => {
    try {
      setIsLoading(true);
      const errors: string[] = [];

      if (!data.title?.trim()) errors.push("Tiêu đề không được để trống.");
      if (!data.name?.trim()) errors.push("Tên không được để trống.");
      if (!data.content?.trim()) errors.push("Nội dung không được để trống.");

      if (errors.length > 0) {
        setFormErrors(errors);
        setIsLoading(false);
        return;
      }

      setFormErrors([]);

      const formData = new FormData();
      formData.append("title", data.title || "");
      formData.append("name", data.name || "");
      formData.append("content", data.content || "");
      fileList.forEach((file) => formData.append("images", file));

      const headers = { Authorization: `Bearer ${token}` };

      if (isEditing && intro?._id) {
        await introApi.updateIntro({ formData, headers, _id: intro._id });
      } else {
        await introApi.createIntro({ formData, headers });
      }
      toast.success("Thao tác thành công");

      router.push("/intro");
      router.refresh();
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="mx-auto mt-6 p-6 bg-white shadow rounded-xl">
      <h1 className="text-xl font-bold text-indigo-600 mb-4">
        {isEditing ? "Chỉnh sửa phần giới thiệu" : "Tạo phần giới thiệu"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {isEditing && <input type="hidden" value={intro?._id} />}

        <div>
          <Label htmlFor="title">Tiêu đề</Label>
          <Input id="title" {...register("title", { required: true })} />
          {errors.title && <p className="text-red-500 text-sm">Bắt buộc</p>}
        </div>

        <div>
          <Label htmlFor="name">Tên phần giới thiệu</Label>
          <Input id="name" {...register("name", { required: true })} />
          {errors.name && <p className="text-red-500 text-sm">Bắt buộc</p>}
        </div>

        {/* {isEditing && getValues("content") && <ContentInput setValue={setValue} watch={watch} errors={errors} />}
        {!isEditing && <ContentInput setValue={setValue} watch={watch} errors={errors} />} */}
        {<ContentInput isEditting={isEditing} setValue={setValue} watch={watch} errors={errors} />}

        <div>
          <Label htmlFor="images">Hình ảnh (không bắt buộc)</Label>
          <Input id="images" type="file" multiple onChange={onFileChange} />
        </div>

        <div className="space-y-2">
          {fileList.map((file, index) => (
            <div key={index} className="flex flex-col items-start border p-2 rounded relative">
              <Image
                src={URL.createObjectURL(file)}
                alt={`image-${index}`}
                width={300}
                height={100}
                className="object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded px-2 py-1 text-xs hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>

        {formErrors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-[#f8ab34] p-3 rounded">
            <ul className="list-disc ml-5 text-sm">
              {formErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <Button type="submit" className="mt-4" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : isEditing ? "Lưu chỉnh sửa" : "Tạo mới"}
        </Button>
      </form>
    </div>
  );
}
