"use client";

import { Blog } from "@/type/blog";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/store/hook";
import { blogApi } from "@/api-request/concuaapi";

import { useRouter } from "next/navigation";
import Image from "next/image";
import ContentInput from "@/components/content-blog";

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
  } = useForm<Partial<BlogForm>>();

  const isEditing = Boolean(blog && blog._id);

  useEffect(() => {
    if (blogId === "new") {
      reset({ author_id: adminId || undefined });
      setFileList([]);
    }
  }, [blogId, adminId, reset]);

  useEffect(() => {
    const fetchAPI = async () => {
      if (blogId !== "new") {
        const blogData = await blogApi.getBlogById({
          blogId,
          headers: { Authorization: `Bearer ${token}` },
        });

        setBlog(blogData);
        const { created_at, updated_at, images, images_name, ...rest } = blogData;
        reset({ ...rest, author_id: blogData.author_id });

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
    imageNameRefs.current.splice(index, 1);
    setImageNameErrors((prev) => {
      const newErrors = [...prev];
      newErrors.splice(index, 1);
      return newErrors;
    });
  }

  const onSubmit = async (data: Partial<BlogForm>) => {
    try {
      const errors: string[] = [];

      if (!data.title || !data.title.trim()) {
        errors.push("Tiêu đề không được để trống.");
      }

      if (!data.content || !data.content.trim()) {
        errors.push("Nội dung không được để trống.");
      }

      if (!data.author_id) {
        errors.push("Tác giả không hợp lệ.");
      }

      if (fileList.length === 0) {
        errors.push("Bạn phải chọn ít nhất 1 ảnh.");
      }

      const imageNameErrorsTemp: string[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const nameValue = imageNameRefs.current[i]?.value || "";
        if (!nameValue.trim()) {
          imageNameErrorsTemp[i] = "Tên ảnh không được để trống.";
        } else {
          imageNameErrorsTemp[i] = "";
        }
      }

      setImageNameErrors(imageNameErrorsTemp);

      if (errors.length > 0 || imageNameErrorsTemp.some((e) => e !== "")) {
        setFormErrors(errors);
        return;
      }

      setFormErrors([]); // Clear errors if valid

      const formData = new FormData();
      formData.append("title", data.title || "");
      formData.append("name", data.name || "Góc tư vấn");
      formData.append("content", data.content || "");
      formData.append("author_id", isEditing ? blog?.author_id || "" : adminId || "");

      fileList.forEach((file) => formData.append("images", file));

      const imageNames = fileList.map((_, i) => imageNameRefs.current[i]?.value || "");
      formData.append("images_name", JSON.stringify(imageNames));

      const headers = { Authorization: `Bearer ${token}` };

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
    <div className=" mx-auto mt-6 p-6 bg-white shadow rounded-xl">
      <h1 className="text-xl font-bold text-indigo-600 mb-4">
        {isEditing ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {isEditing && <input type="hidden" value={blog?._id} />}
        <div>
          <Label htmlFor="title">Tiêu đề</Label>
          <Input id="title" {...register("title", { required: true })} />
          {errors.title && <p className="text-red-500 text-sm">Bắt buộc</p>}
        </div>
        <div className="hidden">
          <Input id="name" {...register("name")} />
        </div>
        {isEditing && getValues("content") && <ContentInput setValue={setValue} watch={watch} errors={errors} />}
        {!isEditing && <ContentInput setValue={setValue} watch={watch} errors={errors} />}
        {/* <ContentInput setValue={setValue} watch={watch} errors={errors} /> */}
        <div>
          <Label htmlFor="images">Hình ảnh</Label>
          <Input id="images" type="file" multiple onChange={onFileChange} />
        </div>
        <div className="space-y-2">
          {fileList.map((file, index) => (
            <div key={index} className="flex flex-col items-center border p-2 rounded relative">
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
          <Label>Tác giả</Label>
          <Input value={isEditing ? blog?.author_id : adminId || ""} disabled />
        </div>
        {formErrors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded">
            <ul className="list-disc ml-5 text-sm">
              {formErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}
        <Button type="submit" className="mt-4">
          {isEditing ? "Lưu chỉnh sửa" : "Tạo bài viết"}
        </Button>
      </form>
    </div>
  );
}
