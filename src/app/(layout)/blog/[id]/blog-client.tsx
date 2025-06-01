"use client";

import { Blog } from "@/type/blog";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ContentInput from "./content-blog";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/store/hook";
import { blogApi } from "@/api-request/blogApi";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  blogId: string;
};

type BlogForm = Omit<Blog, "images" | "images_name" | "created_at" | "updated_at"> & {
  images: FileList;
  images_name: string[];
};

export default function BlogDetailClient({ blogId }: Props) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const token = useAppSelector((state) => state.auth.token);
  const adminId = useAppSelector((state) => state.auth.adminId);
  const router = useRouter();
  const imageNameRefs = useRef<HTMLInputElement[]>([]);
  const [imageNameErrors, setImageNameErrors] = useState<string[]>([]);

  // State lưu file ảnh (file gốc từ URL + file chọn mới)
  const [fileList, setFileList] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Partial<BlogForm>>();

  const isEditing = Boolean(blog && blog._id);

  // Nếu tạo mới
  useEffect(() => {
    if (blogId === "new") {
      reset({
        author_id: adminId || undefined,
      });
      setFileList([]);
    }
  }, [blogId, adminId, reset]);

  // Nếu chỉnh sửa thì fetch data, reset form và chuyển URL ảnh thành File
  useEffect(() => {
    const fetchAPI = async () => {
      if (blogId !== "new") {
        const blogData = await blogApi.getBlogById({
          blogId,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBlog(blogData);

        const { created_at, updated_at, images, images_name, ...rest } = blogData;
        reset({
          ...rest,
          author_id: blogData.author_id,
        });

        if (images && images.length > 0) {
          const files: File[] = [];
          for (let i = 0; i < images.length; i++) {
            try {
              const file = await urlToFile(images[i], getFileNameFromUrl(images[i]), "image/jpeg");
              files.push(file);
            } catch (e) {
              console.error("Chuyển URL thành File lỗi:", e);
            }
          }
          setFileList(files);
        }
      }
    };

    fetchAPI();
  }, [blogId, token, reset]);

  // Hàm helper chuyển URL thành File
  async function urlToFile(url: string, filename: string, mimeType: string) {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
  }

  function getFileNameFromUrl(url: string) {
    return url.split("/").pop() || "image.jpg";
  }

  // Khi chọn file mới từ input
  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      setFileList((prev) => [...prev, ...Array.from(files)]);
    }
  }

  // Xóa file theo index
  function removeFile(index: number) {
    setFileList((prev) => prev.filter((_, i) => i !== index));
    // Xóa luôn ref input tên ảnh tương ứng
    imageNameRefs.current.splice(index, 1);
    // Xóa lỗi tương ứng nếu có
    setImageNameErrors((prev) => {
      const newErrors = [...prev];
      newErrors.splice(index, 1);
      return newErrors;
    });
  }

  // Xử lý submit
  const onSubmit = async (data: Partial<BlogForm>) => {
    try {
      // Kiểm tra tên ảnh
      const errors: string[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const nameValue = imageNameRefs.current[i]?.value || "";
        if (!nameValue.trim()) {
          errors[i] = "Tên ảnh không được để trống";
        } else {
          errors[i] = "";
        }
      }

      if (errors.some((e) => e !== "")) {
        setImageNameErrors(errors);
        return;
      } else {
        setImageNameErrors([]);
      }

      const formData = new FormData();
      formData.append("title", data.title || "");
      formData.append("name", data.name || "Gốc tư vấn");
      formData.append("content", data.content || "");
      formData.append("author_id", isEditing ? blog?.author_id || "" : adminId || "");

      fileList.forEach((file) => formData.append("images", file));

      const imageNames = fileList.map((_, i) => imageNameRefs.current[i]?.value || "");
      formData.append("images_name", JSON.stringify(imageNames));

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (isEditing) {
        if (!blog) return;
        await blogApi.updateBlog({ formData, headers, _id: blog._id });
      } else {
        await blogApi.createBlog({ formData, headers });
      }
      router.push("/blog");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow rounded-xl">
      <h1 className="text-xl font-bold text-indigo-600 mb-4">
        {isEditing ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {isEditing && <input type="hidden" value={blog?._id} />}

        <div>
          <Label className="mb-1" htmlFor="title">
            Tiêu đề
          </Label>
          <Input id="title" {...register("title", { required: true })} />
          {errors.title && <p className="text-red-500 text-sm">Bắt buộc</p>}
        </div>

        <div className="hidden">
          <Input id="name" {...register("name")} />
        </div>

        {isEditing && getValues("content") && <ContentInput setValue={setValue} watch={watch} errors={errors} />}
        {!isEditing && <ContentInput setValue={setValue} watch={watch} errors={errors} />}
        <div>
          <Label className="mb-1" htmlFor="images">
            Hình ảnh
          </Label>
          <Input id="images" type="file" multiple onChange={onFileChange} />
        </div>

        {/* Preview ảnh */}
        <div className="">
          {fileList.map((file, index) => (
            <div key={index} className="flex flex-col justify-center items-center border p-2 rounded relative">
              <Image
                src={URL.createObjectURL(file)}
                alt={`image-${index}`}
                width={300}
                height={100}
                className="object-cover rounded"
              />
              <Input
                placeholder={`Tên ảnh ${index + 1}`}
                ref={(el) => {
                  if (el) imageNameRefs.current[index] = el;
                }}
                className={imageNameErrors[index] ? "border-red-500" : ""}
                defaultValue={blog?.images_name?.[index] || ""}
              />
              {imageNameErrors[index] && <p className="text-red-500 text-sm mt-1">{imageNameErrors[index]}</p>}

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

        <div>
          <Label className="mb-1">Tác giả</Label>
          <Input value={isEditing ? blog?.author_id : adminId || ""} disabled />
        </div>

        <Button type="submit" className="mt-4">
          {isEditing ? "Lưu chỉnh sửa" : "Tạo bài viết"}
        </Button>
      </form>
    </div>
  );
}
