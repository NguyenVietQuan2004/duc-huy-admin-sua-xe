import Image from "next/image";
import { File, TrashIcon } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { Button, buttonVariants } from "@/components/ui/button";

interface ImageUploadProps {
  title?: string;
  value?: string[];
  isLoading?: boolean;
  children?: React.ReactNode;
  onChange: (url: string) => void;
  onRemove: (url?: string) => void;
}

export default function ImageUpload({ value = [], isLoading, onChange, onRemove, title }: ImageUploadProps) {
  const onUpload = (result: any) => {
    // Nếu multiple: true => Cloudinary vẫn trả về từng ảnh riêng lẻ qua callback
    if (result?.info?.secure_url) {
      onChange(result.info.secure_url);
    }
  };
  return (
    <div>
      <div className="flex gap-6 flex-wrap">
        {value.map((item) => (
          <div key={item} className="relative w-[200px] h-[200px] object-cover overflow-hidden">
            <Image
              alt=""
              src={item}
              width={600}
              height={600}
              className="w-[200px] h-[200px] object-cover rounded-sm select-none"
            />
            <Button
              type="button"
              className={buttonVariants({
                className: "absolute z-50 top-2 right-2 px-2",
                variant: "destructive",
                size: "sm",
              })}
              onClick={() => onRemove(item)}
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <CldUploadWidget onSuccess={onUpload} uploadPreset="duc-huy-admin" options={{ multiple: true }}>
        {({ open }) => {
          const handleClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              onClick={handleClick}
              disabled={isLoading}
              className={buttonVariants({
                variant: "secondary",
                className: "text-black mt-2",
              })}
            >
              <File className="h-4 w-4 mr-2" />
              {title || "Upload ảnh"}
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
