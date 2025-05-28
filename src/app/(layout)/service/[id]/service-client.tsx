"use client";

import { Service } from "@/type/service";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ContentInput from "./content-service";
import ImageUpload from "@/components/image-upload";

type Props = {
  service?: Service | null;
};

type ServiceForm = Omit<Service, "images" | "created_at" | "updated_at"> & {
  images: { value: string }[];
};

export default function ServiceDetailClient({ service }: Props) {
  const isEditing = Boolean(service && service._id);

  const defaultValues: ServiceForm = service
    ? {
        ...service,
        images: service.images.map((url) => ({ value: url })),
      }
    : {
        _id: "",
        name: "",
        content: "",
        images: [],
        author_id: "",
      };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ServiceForm>({ defaultValues });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const onSubmit = (data: ServiceForm) => {
    const { created_at: _, updated_at: __, ...rest } = data as any;
    const serviceData: Service = {
      ...rest,
      images: data.images.map((item) => item.value),
    };
    console.log(isEditing ? "Updating service" : "Creating service", serviceData);
    // Gọi API POST hoặc PUT với serviceData ở đây
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow rounded-xl">
      <h1 className="text-xl font-bold text-indigo-600 mb-4">
        {isEditing ? "  Chỉnh sửa bài viết" : " Tạo bài viết mới"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="hidden" {...register("_id")} />

        {/* Tên chuyên mục */}
        <div>
          <Label htmlFor="name">Tên chuyên mục</Label>
          <Input id="name" {...register("name", { required: true })} />
          {errors.name && <p className="text-red-500 text-sm">Bắt buộc</p>}
        </div>

        {/* Nội dung bài viết */}
        <ContentInput setValue={setValue} getValues={getValues} errors={errors} />

        {/* Ảnh */}
        <div>
          <Label className="mb-2">Thêm ảnh</Label>
          <div className="mt-2">
            <ImageUpload
              value={imageFields.map((img) => img.value).filter((url) => url)}
              onChange={(url) => {
                appendImage({ value: url });
              }}
              onRemove={(url) => {
                const indexToRemove = imageFields.findIndex((item) => item.value === url);
                if (indexToRemove !== -1) {
                  removeImage(indexToRemove);
                }
              }}
            />
          </div>
        </div>

        {/* Tác giả */}
        <div>
          <Label className="mb-2" htmlFor="author_id">
            Tác giả
          </Label>
          <Input id="author_id" {...register("author_id", { required: true })} />
        </div>

        <Button type="submit" className="mt-4">
          {isEditing ? "Lưu chỉnh sửa" : "Tạo bài viết"}
        </Button>
      </form>
    </div>
  );
}
