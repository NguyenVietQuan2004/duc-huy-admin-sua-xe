"use client";

import { Service } from "@/type/service";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hook";
import { serviceApi } from "@/api-request/serviceAPI";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ContentInput from "@/components/content-blog";
import { toast } from "sonner";
import { Category } from "@/type/category";
import { categoryApi } from "@/api-request/categoryAPI";

type Props = {
  serviceId: string;
};

type ServiceForm = Omit<Service, "images" | "created_at" | "updated_at"> & {
  images: FileList;
  extra_images?: FileList[];
  extra_images_text?: string[];
};

export default function ServiceDetailClient({ serviceId }: Props) {
  const [service, setService] = useState<Service | null>(null);
  const token = useAppSelector((state) => state.auth.token);
  const adminId = useAppSelector((state) => state.auth.adminId);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [fileList, setFileList] = useState<File[]>([]);
  const [extraFields, setExtraFields] = useState<{ file: File | null; text: string; id: number }[]>([]);
  const [imagesError, setImagesError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  const [listCategory, setlistCategory] = useState<Category[]>();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<Partial<ServiceForm>>();

  const isEditing = Boolean(service && service._id);

  const addExtraField = () => {
    setExtraFields((prev) => {
      if (prev.length >= 2) return prev;
      return [...prev, { file: null, text: "", id: Date.now() }];
    });
  };

  const removeExtraField = (id: number) => {
    setExtraFields((prev) => prev.filter((field) => field.id !== id));
  };

  const handleExtraFileChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const file = e.target.files?.[0] || null;
    setExtraFields((prev) => prev.map((field) => (field.id === id ? { ...field, file } : field)));
  };

  const handleExtraTextChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const text = e.target.value;
    setExtraFields((prev) => prev.map((field) => (field.id === id ? { ...field, text } : field)));
  };

  useEffect(() => {
    if (serviceId === "new") {
      reset({ author_id: adminId || undefined });
      setFileList([]);
      setExtraFields([]);
    }
  }, [serviceId, adminId, reset]);

  useEffect(() => {
    const fetchAPI = async () => {
      const categorys = await categoryApi.getAllcategory({
        limit: 100,
        page: 1,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setlistCategory(categorys);

      if (serviceId !== "new") {
        const serviceData = await serviceApi.getServiceById({
          serviceId,
          headers: { Authorization: `Bearer ${token}` },
        });
        setService(serviceData);
        const { created_at, updated_at, images, extra_images, extra_images_text, ...rest } = serviceData;
        reset({
          ...rest,
          author_id: serviceData.author_id,
          category_id: serviceData.category_id,
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

        if (extra_images && extra_images_text && extra_images.length === extra_images_text.length) {
          const extraFieldsData = await Promise.all(
            extra_images.map(async (url: any, index: any) => {
              try {
                const file = await urlToFile(url, getFileNameFromUrl(url), "image/jpeg");
                return { file, text: extra_images_text[index], id: Date.now() + index };
              } catch (e) {
                return { file: null, text: extra_images_text[index], id: Date.now() + index };
              }
            })
          );
          setExtraFields(extraFieldsData);
        }
      }
    };

    fetchAPI();
  }, [serviceId, token, reset]);

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
      setImagesError(null);
    }
  }

  function removeFile(index: number) {
    setFileList((prev) => prev.filter((_, i) => i !== index));
  }

  const onSubmit = async (data: Partial<ServiceForm>) => {
    setImagesError(null);
    setContentError(null);

    if (fileList.length === 0) {
      setImagesError("Phải chọn ít nhất 1 hình ảnh.");
      return;
    }

    const content = data.content?.trim();
    if (!content) {
      setContentError("Nội dung không được để trống.");
      return;
    }

    const validExtraFields = extraFields.filter((field) => field.file && field.text.trim() !== "");
    if (validExtraFields.length < 1) return;

    try {
      const formData = new FormData();
      formData.append("name", data.name || "");
      formData.append("content", content);
      formData.append("price", data.price || "");
      formData.append("author_id", isEditing ? service?.author_id || "" : adminId || "");
      formData.append("category_id", data.category_id || "");

      fileList.forEach((file) => formData.append("images", file));

      const extraTextList: string[] = [];
      validExtraFields.forEach((field) => {
        if (field.file) {
          formData.append("extra_images", field.file);
          extraTextList.push(field.text);
        }
      });
      formData.append("extra_images_text", JSON.stringify(extraTextList));

      const headers = { Authorization: `Bearer ${token}` };
      setIsLoading(true);
      if (isEditing) {
        if (!service) return;
        await serviceApi.updateService({ formData, headers, _id: service?._id });
      } else {
        await serviceApi.createService({ formData, headers });
      }
      toast.success("Thao tác thành công");
      router.push("/service");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow rounded-xl">
      <h1 className="text-xl font-bold text-indigo-600 mb-4">{isEditing ? "Chỉnh sửa dịch vụ" : "Tạo dịch vụ mới"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {isEditing && <input type="hidden" value={service?._id} />}

        <div>
          <Label htmlFor="name">Tên dịch vụ</Label>
          <Input id="name" {...register("name", { required: true })} />
          {errors.name && <p className="text-red-500 text-sm">Bắt buộc</p>}
        </div>

        <div>
          <Label htmlFor="price">Giá</Label>
          <Input id="price" {...register("price", { required: true })} />
          {errors.price && <p className="text-red-500 text-sm">Bắt buộc</p>}
        </div>

        <div>
          <Label htmlFor="category_id">Danh mục</Label>
          <select
            id="category_id"
            {...register("category_id", { required: true })}
            className="w-full border px-3 py-2 rounded max-w-fit"
            defaultValue={getValues("category_id") || ""}
          >
            <option value="" disabled>
              -- Chọn danh mục --
            </option>
            {listCategory?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category_id && <p className="text-red-500 text-sm">Bắt buộc chọn danh mục</p>}
        </div>

        {isEditing && getValues("content") && <ContentInput setValue={setValue} watch={watch} errors={errors} />}
        {!isEditing && <ContentInput setValue={setValue} watch={watch} errors={errors} />}
        {contentError && <p className="text-red-500 text-sm">{contentError}</p>}

        <div>
          <Label htmlFor="images">Hình ảnh chính</Label>
          <Input id="images" type="file" multiple onChange={onFileChange} />
          {imagesError && <p className="text-red-500 text-sm">{imagesError}</p>}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {fileList.map((file, index) => (
            <div key={index} className="relative border p-2 rounded">
              <Image
                src={URL.createObjectURL(file)}
                alt={`image-${index}`}
                width={300}
                height={100}
                className="rounded"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 text-white bg-red-500 text-xs px-2 py-1 rounded"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Hình ảnh và văn bản bổ sung</Label>
            <Button type="button" onClick={addExtraField} className="bg-green-500 hover:bg-green-600">
              Thêm mới
            </Button>
          </div>
          {extraFields.length < 1 && (
            <p className="text-red-500 text-sm">Phải có ít nhất hình ảnh và văn bản bổ sung.</p>
          )}

          {extraFields.map((field) => (
            <div key={field.id} className="border p-4 rounded space-y-2">
              <div>
                <Label htmlFor={`extra_image_${field.id}`}>Hình ảnh bổ sung</Label>
                <Input
                  id={`extra_image_${field.id}`}
                  type="file"
                  onChange={(e) => handleExtraFileChange(e, field.id)}
                />
              </div>
              {field.file && (
                <Image
                  src={URL.createObjectURL(field.file)}
                  alt={`extra-image-${field.id}`}
                  width={150}
                  height={100}
                  className="rounded"
                />
              )}
              <div>
                <Label htmlFor={`extra_text_${field.id}`}>Văn bản bổ sung</Label>
                <Input
                  id={`extra_text_${field.id}`}
                  value={field.text}
                  onChange={(e) => handleExtraTextChange(e, field.id)}
                />
              </div>
              <Button type="button" onClick={() => removeExtraField(field.id)} className="bg-red-500 hover:bg-red-600">
                Xóa
              </Button>
            </div>
          ))}
        </div>

        <div>
          <Label>Tác giả</Label>
          <Input value={isEditing ? service?.author_id : adminId || ""} disabled />
        </div>

        <Button type="submit" className="mt-4" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : isEditing ? "Lưu chỉnh sửa" : "Thêm mới"}
        </Button>
      </form>
    </div>
  );
}
