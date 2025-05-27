"use client";

import { Sale } from "@/type/sale";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ContentInput from "./content-sale";
import ImageUpload from "@/components/image-upload";

type Props = {
  sale?: Sale | null;
};

// Bỏ created_at, updated_at trong SaleForm
type SaleForm = Omit<Sale, "images" | "images_name" | "created_at" | "updated_at"> & {
  images: { value: string }[];
  images_name: { value: string }[];
};

export default function BaiVietDetailClient({ sale }: Props) {
  const isEditing = Boolean(sale && sale._id);

  const defaultValues: SaleForm = sale
    ? {
        ...sale,
        images: sale.images.map((url) => ({ value: url })),
        images_name: sale.images_name.map((name) => ({ value: name })),
      }
    : {
        _id: "",
        title: "",
        name: "Tin khuyến mãi",
        content: "",
        images: [],
        images_name: [],
        author_id: "",
      };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SaleForm>({ defaultValues });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const {
    fields: imageNameFields,
    append: appendImageName,
    remove: removeImageName,
  } = useFieldArray({
    control,
    name: "images_name",
  });
  const onSubmit = (data: SaleForm) => {
    // Loại bỏ created_at và updated_at khỏi dữ liệu gửi đi
    const { created_at: _, updated_at: __, ...rest } = data as any;

    const saleData: Sale = {
      ...rest,
      images: data.images.map((item) => item.value),
      images_name: data.images_name.map((item) => item.value),
    };
    if (isEditing) {
    }
    console.log(isEditing ? "Updating sale" : "Creating sale", saleData);
    // Gọi API POST hoặc PUT với saleData ở đây
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow rounded-xl">
      <h1 className="text-xl font-bold text-indigo-600 mb-4">
        {isEditing ? "✏️ Chỉnh sửa khuyến mãi" : "➕ Tạo khuyến mãi mới"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="hidden" {...register("_id")} />

        <div>
          <Label className="mb-2" htmlFor="title">
            Tiêu đề
          </Label>
          <Input id="title" {...register("title", { required: true })} />
          {errors.title && <p className="text-red-500 text-sm">Bắt buộc</p>}
        </div>

        <div className="hidden">
          <Label className="mb-2" htmlFor="name">
            Góc tư vấn
          </Label>
          <Input id="name" {...register("name", { required: true })} />
        </div>

        <ContentInput setValue={setValue} getValues={getValues} errors={errors} />

        <div>
          <Label className="mb-2">Thêm ảnh</Label>
          <div className="mt-2">
            <ImageUpload
              value={imageFields.map((img) => img.value).filter((url) => url)}
              onChange={(url) => {
                appendImage({ value: url });
                appendImageName({ value: "" }); // ➕ tên ảnh trống tương ứng
              }}
              onRemove={(url) => {
                const indexToRemove = imageFields.findIndex((item) => item.value === url);
                if (indexToRemove !== -1) {
                  removeImage(indexToRemove);
                  removeImageName(indexToRemove); // Xóa tên ảnh tương ứng
                }
              }}
            />
          </div>
        </div>

        <div>
          <Label className="mb-2">Tên ảnh</Label>
          {imageNameFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mt-2">
              <Input {...register(`images_name.${index}.value` as const, { required: true })} />
            </div>
          ))}
        </div>
        {/* Author */}
        <div>
          <Label className="mb-2" htmlFor="author_id">
            Tác giả
          </Label>
          <Input id="author_id" {...register("author_id", { required: true })} />
        </div>

        {/* Submit */}
        <Button type="submit" className="mt-4">
          {isEditing ? "Lưu chỉnh sửa" : "Tạo khuyến mãi"}
        </Button>
      </form>
    </div>
  );
}
