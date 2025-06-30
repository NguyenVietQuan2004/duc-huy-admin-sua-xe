// // ContentInput.tsx
// "use client";

// import { FC, useEffect, useRef, useState } from "react";
// import { UseFormSetValue, FieldErrors, UseFormWatch } from "react-hook-form";
// import { Label } from "@/components/ui/label";
// import { CKEditor } from "ckeditor4-react";

// type Props = {
//   setValue: UseFormSetValue<any>;
//   watch: UseFormWatch<any>;
//   errors: FieldErrors<any>;
//   ahihi?: string;
// };

// const ContentInput: FC<Props> = ({ setValue, watch, errors, ahihi }) => {
//   const editorRef = useRef<any>(null);
//   const content = watch("content");
//   // useEffect(() => {
//   //   if (!content) {
//   //     console.log("1");
//   //   } else {
//   //     console.log("2");
//   //   }
//   //   if (editorRef.current?.editor && content !== editorRef.current.editor.getData()) {
//   //     console.log("da gan gia tri", content);
//   //     editorRef.current.editor.setData(content);
//   //   }
//   // }, [content]);
//   // console.log(editorRef, content);
//   const [editorKey, setEditorKey] = useState("editor-0");

//   const [hasMounted, setHasMounted] = useState(false);

//   useEffect(() => {
//     if (!hasMounted && content) {
//       // chỉ remount 1 lần duy nhất khi content có giá trị
//       setEditorKey(`editor-${Date.now()}`);
//       setHasMounted(true);
//     }
//   }, [content, hasMounted]);

//   return (
//     <div>
//       <Label className="mb-2" htmlFor="content">
//         Nội dung
//       </Label>
//       {/* <CKEditor
//           ref={editorRef}
//           initData={content || ""}
//           config={{
//             removePlugins: "updatehandler",
//           }}
//           onChange={(event: any) => {
//             const data = event.editor.getData();
//             setValue("content", data, { shouldValidate: true });
//           }}
//         /> */}
//       <CKEditor
//         // ref={editorRef}
//         key={editorKey}
//         initData={content || ""}
//         // config={{
//         //   removePlugins: "updatehandler",
//         //   filebrowserUploadUrl: "/api/upload", // route backend để nhận file upload
//         //   filebrowserUploadMethod: "xhr", // hoặc "xhr"

//         //   removeDialogTabs: "image:advanced;link:advanced;image:Link",
//         // }}

//         config={{
//           extraPlugins: "justify",
//           removePlugins: "updatehandler", // ⚠️ Loại bỏ plugin image mặc định nếu bị xung đột
//           filebrowserUploadUrl: "/api/upload",
//           filebrowserUploadMethod: "xhr",
//           // removeDialogTabs: "image:advanced;link:advanced;image:Link",
//           image2_alignClasses: ["image-align-left", "image-align-center", "image-align-right"],
//           image2_captionedClass: "image-captioned", // ✔ Cho phép caption
//           allowedContent: true, // ⚠️ Cho phép tất cả HTML để giữ lại <figure>/<figcaption>
//           contentsCss: [
//             `
//       body { background: none !important; }
//       img { background: none !important; display: block; margin: 0 auto; }
//       figure { background: none !important; margin: 1em auto; display: table; }
//      figcaption {
//         text-align: center;
//         font-style: italic;
//         font-size: 0.875rem;
//         color: #666;
//         margin-top: 0.5em;
//       }
//     `,
//           ],
//         }}
//         onChange={(event: any) => {
//           const data = event.editor.getData();
//           setValue("content", data, { shouldValidate: true });
//         }}
//       />

//       {errors.content && <p className="text-red-500 text-sm">Bắt buộc</p>}
//     </div>
//   );
// };

// export default ContentInput;

// ContentInput.tsx
// "use client";

// import { FC, useEffect, useRef, useState } from "react";
// import { UseFormSetValue, FieldErrors, UseFormWatch } from "react-hook-form";
// import { Label } from "@/components/ui/label";
// import { CKEditor } from "ckeditor4-react";

// type Props = {
//   setValue: UseFormSetValue<any>;
//   watch: UseFormWatch<any>;
//   errors: FieldErrors<any>;
//   ahihi?: string;
// };

// const ContentInput: FC<Props> = ({ setValue, watch, errors, ahihi }) => {
//   const content = watch("content");

//   const [editorKey, setEditorKey] = useState("editor-0");

//   const [hasMounted, setHasMounted] = useState(false);

//   useEffect(() => {
//     if (!hasMounted && content) {
//       // chỉ remount 1 lần duy nhất khi content có giá trị
//       setEditorKey(`editor-${Date.now()}`);
//       setHasMounted(true);
//     }
//   }, [content, hasMounted]);

//   return (
//     <div>
//       <Label className="mb-2" htmlFor="content">
//         Nội dung
//       </Label>
//       <CKEditor
//         key={editorKey}
//         // initData={content || ""}
//         config={{
//           extraPlugins: "justify",
//           removePlugins: "updatehandler", // ⚠️ Loại bỏ plugin image mặc định nếu bị xung đột
//           filebrowserUploadUrl: "/api/upload",
//           filebrowserUploadMethod: "xhr",
//           // removeDialogTabs: "image:advanced;link:advanced;image:Link",
//           image2_alignClasses: ["image-align-left", "image-align-center", "image-align-right"],
//           image2_captionedClass: "image-captioned", // ✔ Cho phép caption
//           allowedContent: true, // ⚠️ Cho phép tất cả HTML để giữ lại <figure>/<figcaption>
//           contentsCss: [
//             `
//       body { background: none !important; }
//       img { background: none !important; display: block; margin: 0 auto; }
//       figure { background: none !important; margin: 1em auto; display: table; }
//      figcaption {
//         text-align: center;
//         font-style: italic;
//         font-size: 0.875rem;
//         color: #666;
//         margin-top: 0.5em;
//       }
//     `,
//           ],
//         }}
//         onInstanceReady={(event: any) => {
//           event.editor.setData(content || "");
//         }}
//         onChange={(event: any) => {
//           const data = event.editor.getData();
//           setValue("content", data, { shouldValidate: true });
//         }}
//       />

//       {errors.content && <p className="text-red-500 text-sm">Bắt buộc</p>}
//     </div>
//   );
// };

// export default ContentInput;
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
    }, 1000);

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
            extraPlugins: "justify",
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
