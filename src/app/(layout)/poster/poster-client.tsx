"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/store/hook";
import { useRouter } from "next/navigation";
import { PosterType } from "@/type/poster";
import { posterApi } from "@/api-request/posterAPI";

type PosterForm = {
  images_intro: FileList;
  images_contact: FileList;
  images_advise: FileList;
  images_promotion: FileList;
  images_service: FileList;
};

type ImageGroup = "images_intro" | "images_contact" | "images_advise" | "images_promotion" | "images_service";

export default function PosterClient() {
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();
  const [poster, setPoster] = useState<PosterType | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileGroups, setFileGroups] = useState<Record<ImageGroup, File[]>>({
    images_intro: [],
    images_contact: [],
    images_advise: [],
    images_promotion: [],
    images_service: [],
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<PosterForm>>();

  const fileInputRefs = {
    images_intro: useRef<HTMLInputElement>(null),
    images_contact: useRef<HTMLInputElement>(null),
    images_advise: useRef<HTMLInputElement>(null),
    images_promotion: useRef<HTMLInputElement>(null),
    images_service: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const data = await posterApi.getPoster();
        if (data) {
          // Chuyển đổi dữ liệu thành định dạng component cần
          const transformedData: PosterType = {
            _id: data._id,
            images_intro: data.images_intro,
            images_contact: data.images_contact,
            images_advise: data.images_advise,
            images_promotion: data.images_promotion,
            images_service: data.images_service,
          };

          setPoster(transformedData);

          const newFileGroups: Record<ImageGroup, File[]> = {
            images_intro: [],
            images_contact: [],
            images_advise: [],
            images_promotion: [],
            images_service: [],
          };

          for (const group of [
            "images_intro",
            "images_contact",
            "images_advise",
            "images_promotion",
            "images_service",
          ] as ImageGroup[]) {
            const url = transformedData[group][0];
            if (url) {
              const file = await urlToFile(url, getFileNameFromUrl(url), "image/jpeg");
              newFileGroups[group] = [file];
            }
          }

          setFileGroups(newFileGroups);
        } else {
          setPoster(null);
        }
      } catch (e) {
        console.error("Lỗi khi fetch poster:", e);
        setPoster(null);
      }
    };

    fetchPoster();
  }, [token]);

  const urlToFile = async (url: string, filename: string, mimeType: string) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
  };

  const getFileNameFromUrl = (url: string) => url.split("/").pop() || "image.jpg";

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>, group: ImageGroup) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (files.length > 1) {
        setSubmitError("Chỉ được phép chọn một ảnh cho mỗi nhóm.");
        return;
      }
      const file = files[0];
      setFileGroups((prev) => ({
        ...prev,
        [group]: [file],
      }));
      if (fileInputRefs[group].current) fileInputRefs[group].current!.value = "";
    }
  };

  const removeFile = (group: ImageGroup) => {
    setFileGroups((prev) => ({
      ...prev,
      [group]: [],
    }));
    if (fileInputRefs[group].current) fileInputRefs[group].current!.value = "";
  };

  const onSubmit = async () => {
    setSubmitError(null);

    const groups = [
      "images_intro",
      "images_contact",
      "images_advise",
      "images_promotion",
      "images_service",
    ] as ImageGroup[];
    for (const group of groups) {
      if (fileGroups[group].length !== 1) {
        setSubmitError(
          `Mỗi nhóm phải có đúng một ảnh. Vui lòng kiểm tra nhóm "${
            group === "images_intro"
              ? "Ảnh giới thiệu"
              : group === "images_contact"
              ? "Ảnh liên hệ"
              : group === "images_advise"
              ? "Ảnh tư vấn"
              : group === "images_promotion"
              ? "Ảnh khuyến mãi"
              : "Ảnh dịch vụ"
          }".`
        );
        return;
      }
    }

    setIsLoading(true);

    const formData = new FormData();
    for (const group of groups) {
      formData.append(group, fileGroups[group][0]);
    }

    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (poster?._id) {
        await posterApi.updatePoster({ formData, headers, _id: poster._id });
      } else {
        await posterApi.createPoster({ formData, headers });
      }

      router.refresh();
    } catch (error) {
      console.error("Lỗi khi gửi poster:", error);
      setSubmitError("Không thể gửi dữ liệu, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="mx-auto mt-6 p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">{poster ? "Cập nhật Poster" : "Tải Poster mới"}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {(
          ["images_intro", "images_contact", "images_advise", "images_promotion", "images_service"] as ImageGroup[]
        ).map((group) => (
          <div key={group}>
            <Label htmlFor={group}>
              {group === "images_intro"
                ? "Ảnh giới thiệu"
                : group === "images_contact"
                ? "Ảnh liên hệ"
                : group === "images_advise"
                ? "Ảnh tư vấn"
                : group === "images_promotion"
                ? "Ảnh khuyến mãi"
                : "Ảnh dịch vụ"}
            </Label>
            <Input
              id={group}
              type="file"
              accept="image/*"
              {...register(group)}
              disabled={isLoading}
              ref={fileInputRefs[group]}
              onChange={(e) => onFileChange(e, group)}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
              {fileGroups[group][0] && (
                <div className="relative border rounded p-2">
                  <Image
                    src={URL.createObjectURL(fileGroups[group][0])}
                    alt={`${group}-0`}
                    width={150}
                    height={150}
                    className="object-contain rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(group)}
                    className="absolute top-1 right-1 text-xs bg-red-500 text-white rounded px-2 py-1"
                  >
                    Xóa
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : poster ? "Lưu chỉnh sửa" : "Tải lên"}
        </Button>
      </form>
    </div>
  );
}
