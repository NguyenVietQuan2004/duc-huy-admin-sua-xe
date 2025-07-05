"use client";

import { FC, useEffect, useState } from "react";
import { UseFormSetValue, FieldErrors, UseFormWatch } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { CKEditor } from "ckeditor4-react";
import { Skeleton } from "@/components/ui/skeleton";
type Props = {
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  errors: FieldErrors<any>;
};

const ContentInput: FC<Props> = ({ setValue, watch, errors }) => {
  const content = watch("content");

  const [mounted, setMounted] = useState(false);
  const [editorKey, setEditorKey] = useState("editor-0");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);

      if (content) {
        setEditorKey(`editor-${Date.now()}`);
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <Label className="mb-2" htmlFor="content">
        Nội dung
      </Label>

      {mounted ? (
        <CKEditor
          key={editorKey}
          initData={content || ""}
          config={{
            extraPlugins: "justify, font",
            removePlugins: "updatehandler",
            filebrowserUploadUrl: "/api/upload",
            filebrowserUploadMethod: "xhr",
            image2_alignClasses: ["image-align-left", "image-align-center", "image-align-right"],
            image2_captionedClass: "image-captioned",
            allowedContent: true,
            contentsCss: [
              `
                body { background: none !important; }
                img { background: none !important; display: block; margin: 0 auto; }
                figure { background: none !important; margin: 1em auto; display: table; }
                figcaption {
                  text-align: center;
                  font-style: italic;
                  font-size: 0.875rem;
                  color: #666;
                  margin-top: 0.5em;
                }
              `,
            ],
          }}
          onPaste={(evt: any) => {
            let html = evt.data.dataValue;

            // Chuyển span có font-weight:700 thành <strong>
            html = html.replace(
              /<span[^>]*style="[^"]*font-weight\s*:\s*700[^"]*"[^>]*>(.*?)<\/span>/gi,
              "<strong>$1</strong>"
            );

            // Xoá các span rỗng không cần thiết
            html = html.replace(/<span[^>]*>(.*?)<\/span>/gi, "$1");

            evt.data.dataValue = html;

            console.log("✅ Cleaned HTML pasted:", html);
          }}
          onChange={(event: any) => {
            const data = event.editor.getData();
            setValue("content", data, { shouldValidate: true });
          }}
        />
      ) : (
        <Skeleton className="h-[300px] w-full rounded-md" />
      )}

      {errors.content && <p className="text-red-500 text-sm">Bắt buộc</p>}
    </div>
  );
};

export default ContentInput;

// "use client";

// import { FC, useEffect, useState } from "react";
// import { UseFormSetValue, FieldErrors, UseFormWatch } from "react-hook-form";
// import { Label } from "@/components/ui/label";
// import { CKEditor } from "ckeditor4-react";
// import { Skeleton } from "@/components/ui/skeleton";

// type Props = {
//   setValue: UseFormSetValue<any>;
//   watch: UseFormWatch<any>;
//   errors: FieldErrors<any>;
// };

// const ContentInput: FC<Props> = ({ setValue, watch, errors }) => {
//   const content = watch("content");

//   const [mounted, setMounted] = useState(false);
//   const [editorKey, setEditorKey] = useState("editor-0");

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setMounted(true);
//       if (content) {
//         setEditorKey(`editor-${Date.now()}`);
//       }
//     }, 1000);
//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <div>
//       <Label className="mb-2" htmlFor="content">
//         Nội dung
//       </Label>

//       {mounted ? (
//         <CKEditor
//           key={editorKey}
//           initData={content || ""}
//           config={{
//             extraPlugins: "justify,font",
//             removePlugins: "updatehandler",
//             filebrowserUploadUrl: "/api/upload",
//             filebrowserUploadMethod: "xhr",
//             image2_alignClasses: ["image-align-left", "image-align-center", "image-align-right"],
//             image2_captionedClass: "image-captioned",
//             allowedContent: true,
//             extraAllowedContent: "span{*}(*); p{*}(*); div{*}(*)", // 👈 giữ lại style từ Google Docs
//             fontSize_sizes: "8/8px;10/10px;12/12px;14/14px;16/16px;18/18px;24/24px;36/36px;48/48px", // 👈 thêm size
//             toolbar: [
//               ["Bold", "Italic", "Underline"],
//               ["JustifyLeft", "JustifyCenter", "JustifyRight"],
//               ["FontSize"], // 👈 nút chọn size
//               ["Image", "Link", "Unlink"],
//               ["Undo", "Redo"],
//             ],
//             contentsCss: [
//               `
//                 body { background: none !important; }
//                 img { background: none !important; display: block; margin: 0 auto; }
//                 figure { background: none !important; margin: 1em auto; display: table; }
//                 figcaption {
//                   text-align: center;
//                   font-style: italic;
//                   font-size: 0.875rem;
//                   color: #666;
//                   margin-top: 0.5em;
//                 }
//               `,
//             ],
//           }}

//         />
//       ) : (
//         <Skeleton className="h-[300px] w-full rounded-md" />
//       )}

//       {errors.content && <p className="text-red-500 text-sm">Bắt buộc</p>}
//     </div>
//   );
// };

// export default ContentInput;
