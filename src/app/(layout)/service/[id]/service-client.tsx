// "use client";

// import { Service } from "@/type/service";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import ContentInput from "./content-service";
// import { useEffect, useState } from "react";
// import { useAppSelector } from "@/store/hook";
// import { serviceApi } from "@/api-request/serviceAPI";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// type Props = {
//   serviceId: string;
// };

// type ServiceForm = Omit<Service, "images" | "created_at" | "updated_at"> & {
//   images: FileList;
// };

// export default function ServiceDetailClient({ serviceId }: Props) {
//   const [service, setService] = useState<Service | null>(null);
//   const token = useAppSelector((state) => state.auth.token);
//   const adminId = useAppSelector((state) => state.auth.adminId);
//   const router = useRouter();

//   // State lưu file ảnh (file gốc từ URL + file chọn mới)
//   const [fileList, setFileList] = useState<File[]>([]);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     reset,
//     watch,

//     formState: { errors },
//   } = useForm<Partial<ServiceForm>>();

//   const isEditing = Boolean(service && service._id);

//   // Nếu tạo mới
//   useEffect(() => {
//     if (serviceId === "new") {
//       reset({
//         author_id: adminId || undefined,
//       });
//       setFileList([]);
//     }
//   }, [serviceId, adminId, reset]);

//   // Nếu chỉnh sửa thì fetch data, reset form và chuyển URL ảnh thành File
//   useEffect(() => {
//     const fetchAPI = async () => {
//       if (serviceId !== "new") {
//         const serviceData = await serviceApi.getServiceById({
//           serviceId,
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setService(serviceData);

//         const { created_at, updated_at, images, ...rest } = serviceData;
//         reset({
//           ...rest,
//           author_id: serviceData.author_id,
//         });

//         if (images && images.length > 0) {
//           const files: File[] = [];
//           for (let i = 0; i < images.length; i++) {
//             try {
//               const file = await urlToFile(images[i], getFileNameFromUrl(images[i]), "image/jpeg");
//               files.push(file);
//             } catch (e) {
//               console.error("Chuyển URL thành File lỗi:", e);
//             }
//           }
//           setFileList(files);
//         }
//       }
//     };

//     fetchAPI();
//   }, [serviceId, token, reset]);

//   // Hàm helper chuyển URL thành File
//   async function urlToFile(url: string, filename: string, mimeType: string) {
//     const res = await fetch(url);
//     const blob = await res.blob();
//     return new File([blob], filename, { type: mimeType });
//   }

//   function getFileNameFromUrl(url: string) {
//     return url.split("/").pop() || "image.jpg";
//   }

//   // Khi chọn file mới từ input
//   function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const files = e.target.files;
//     if (files) {
//       setFileList((prev) => [...prev, ...Array.from(files)]);
//     }
//   }

//   // Xóa file theo index
//   function removeFile(index: number) {
//     setFileList((prev) => prev.filter((_, i) => i !== index));
//   }

//   // Xử lý submit
//   const onSubmit = async (data: Partial<ServiceForm>) => {
//     try {
//       // Tạo formData
//       const formData = new FormData();
//       formData.append("name", data.name || "");
//       formData.append("content", data.content || "");
//       formData.append("price", data.price || "");
//       formData.append("author_id", isEditing ? service?.author_id || "" : adminId || "");

//       fileList.forEach((file) => formData.append("images", file));

//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       if (isEditing) {
//         if (!service) return;
//         await serviceApi.updateService({ formData, headers, _id: service?._id });
//       } else {
//         await serviceApi.createService({ formData, headers });
//       }
//       router.push("/service");
//       router.refresh();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow rounded-xl">
//       <h1 className="text-xl font-bold text-indigo-600 mb-4">{isEditing ? "Chỉnh sửa dịch vụ" : "Tạo dịch vụ mới"}</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {isEditing && <input type="hidden" value={service?._id} />}

//         <div>
//           <Label className="mb-1" htmlFor="name">
//             Tên dịch vụ
//           </Label>
//           <Input id="name" {...register("name", { required: true })} />
//           {errors.name && <p className="text-red-500 text-sm">Bắt buộc</p>}
//         </div>

//         <div>
//           <Label className="mb-1" htmlFor="price">
//             Giá
//           </Label>
//           <Input id="price" {...register("price", { required: true })} />
//           {errors.price && <p className="text-red-500 text-sm">Bắt buộc</p>}
//         </div>

//         {isEditing && getValues("content") && <ContentInput setValue={setValue} watch={watch} errors={errors} />}
//         {!isEditing && <ContentInput setValue={setValue} watch={watch} errors={errors} />}

//         <div>
//           <Label className="mb-1" htmlFor="images">
//             Hình ảnh
//           </Label>
//           <Input id="images" type="file" multiple onChange={onFileChange} />
//         </div>

//         {/* Preview ảnh */}
//         <div className="">
//           {fileList.map((file, index) => (
//             <div key={index} className="flex flex-col justify-center items-center border p-2 rounded relative">
//               <Image
//                 src={URL.createObjectURL(file)}
//                 alt={`image-${index}`}
//                 width={300}
//                 height={100}
//                 className="object-cover rounded"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeFile(index)}
//                 className="absolute top-1 right-1 bg-red-500 text-white rounded px-2 py-1 text-xs hover:bg-red-600"
//               >
//                 Xóa
//               </button>
//             </div>
//           ))}
//         </div>

//         <div>
//           <Label className="mb-1">Tác giả</Label>
//           <Input value={isEditing ? service?.author_id : adminId || ""} disabled />
//         </div>

//         <Button type="submit" className="mt-4">
//           {isEditing ? "Lưu chỉnh sửa" : "Tạo dịch vụ"}
//         </Button>
//       </form>
//     </div>
//   );
// }
"use client";

import { Service } from "@/type/service";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ContentInput from "./content-service";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hook";
import { serviceApi } from "@/api-request/serviceAPI";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  serviceId: string;
};

type ServiceForm = Omit<Service, "images" | "created_at" | "updated_at"> & {
  images: FileList;
};

export default function ServiceDetailClient({ serviceId }: Props) {
  const [service, setService] = useState<Service | null>(null);
  const token = useAppSelector((state) => state.auth.token);
  const adminId = useAppSelector((state) => state.auth.adminId);
  const router = useRouter();

  // State lưu file ảnh (file gốc từ URL + file chọn mới)
  const [fileList, setFileList] = useState<File[]>([]);

  // State lỗi cho images và content
  const [imagesError, setImagesError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);

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

  // Nếu tạo mới
  useEffect(() => {
    if (serviceId === "new") {
      reset({
        author_id: adminId || undefined,
      });
      setFileList([]);
    }
  }, [serviceId, adminId, reset]);

  // Nếu chỉnh sửa thì fetch data, reset form và chuyển URL ảnh thành File
  useEffect(() => {
    const fetchAPI = async () => {
      if (serviceId !== "new") {
        const serviceData = await serviceApi.getServiceById({
          serviceId,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setService(serviceData);

        const { created_at, updated_at, images, ...rest } = serviceData;
        reset({
          ...rest,
          author_id: serviceData.author_id,
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
  }, [serviceId, token, reset]);

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
      // Clear lỗi nếu có
      setImagesError(null);
    }
  }

  // Xóa file theo index
  function removeFile(index: number) {
    setFileList((prev) => prev.filter((_, i) => i !== index));
  }

  // Xử lý submit
  const onSubmit = async (data: Partial<ServiceForm>) => {
    // Reset lỗi trước submit
    setImagesError(null);
    setContentError(null);

    // Kiểm tra images không được rỗng
    if (fileList.length === 0) {
      setImagesError("Phải chọn ít nhất 1 hình ảnh.");
      return;
    }

    // Kiểm tra content không rỗng
    const content = data.content?.trim();
    if (!content) {
      setContentError("Nội dung không được để trống.");
      return;
    }

    try {
      // Tạo formData
      const formData = new FormData();
      formData.append("name", data.name || "");
      formData.append("content", content);
      formData.append("price", data.price || "");
      formData.append("author_id", isEditing ? service?.author_id || "" : adminId || "");

      fileList.forEach((file) => formData.append("images", file));

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (isEditing) {
        if (!service) return;
        await serviceApi.updateService({ formData, headers, _id: service?._id });
      } else {
        await serviceApi.createService({ formData, headers });
      }
      router.push("/service");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow rounded-xl">
      <h1 className="text-xl font-bold text-indigo-600 mb-4">{isEditing ? "Chỉnh sửa dịch vụ" : "Tạo dịch vụ mới"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {isEditing && <input type="hidden" value={service?._id} />}

        <div>
          <Label className="mb-1" htmlFor="name">
            Tên dịch vụ
          </Label>
          <Input id="name" {...register("name", { required: true })} />
          {errors.name && <p className="text-red-500 text-sm">Bắt buộc</p>}
        </div>

        <div>
          <Label className="mb-1" htmlFor="price">
            Giá
          </Label>
          <Input id="price" {...register("price", { required: true })} />
          {errors.price && <p className="text-red-500 text-sm">Bắt buộc</p>}
        </div>

        {/* ContentInput tự validate content rỗng */}
        {isEditing && getValues("content") !== undefined && (
          <ContentInput setValue={setValue} watch={watch} errors={errors} />
        )}
        {!isEditing && <ContentInput setValue={setValue} watch={watch} errors={errors} />}
        {contentError && <p className="text-red-500 text-sm mt-1">{contentError}</p>}

        <div>
          <Label className="mb-1" htmlFor="images">
            Hình ảnh
          </Label>
          <Input id="images" type="file" multiple onChange={onFileChange} />
          {imagesError && <p className="text-red-500 text-sm mt-1">{imagesError}</p>}
        </div>

        {/* Preview ảnh */}
        <div className="grid grid-cols-3 gap-3">
          {fileList.map((file, index) => (
            <div key={index} className="flex flex-col justify-center items-center border p-2 rounded relative">
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

        <div>
          <Label className="mb-1">Tác giả</Label>
          <Input value={isEditing ? service?.author_id : adminId || ""} disabled />
        </div>

        <Button type="submit" className="mt-4">
          {isEditing ? "Lưu chỉnh sửa" : "Tạo dịch vụ"}
        </Button>
      </form>
    </div>
  );
}
