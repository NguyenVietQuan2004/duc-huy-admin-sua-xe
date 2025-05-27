"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/image-upload";

export type BannerForm = {
  banner: { value: string }[];
};

interface BannerClientProps {
  initialData?: string[] | null;
}

export default function BannerClient({ initialData }: BannerClientProps) {
  // export default function BannerClient({}: BannerClientProps) {

  const { control, handleSubmit } = useForm<BannerForm>({
    defaultValues: { banner: [] },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "banner",
  });

  // Khi initialData thay đổi hoặc có giá trị, thay thế toàn bộ fields
  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      replace(initialData.map((url) => ({ value: url })));
    } else {
      replace([]);
    }
  }, [replace, initialData]);

  const onSubmit = async (data: BannerForm) => {
    const imageUrls = data.banner.map((b) => b.value);
    console.log("Submit banner urls:", imageUrls);

    // TODO: gọi API gửi imageUrls lên server
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4 text-indigo-600">🖼️ Cập nhật banner</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label>Thêm ảnh</Label>
          <ImageUpload
            value={fields.map((item) => item.value)}
            onChange={(url) => append({ value: url })}
            onRemove={(url) => {
              const index = fields.findIndex((item) => item.value === url);
              if (index !== -1) remove(index);
            }}
          />
        </div>

        <Button type="submit">Lưu banner</Button>
      </form>
    </div>
  );
}
