import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const stripHtml = (html: string): string => {
  // 1. Tạo thẻ DOM ảo để parse HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // 2. Lấy textContent để loại bỏ mọi tag HTML
  let text = tempDiv.textContent || "";

  // 3. Loại bỏ các ký tự trắng dư thừa (bao gồm khoảng trắng, tab, xuống dòng)
  text = text.replace(/\s+/g, " ").trim();

  return text;
};
