// ContentInput.tsx
"use client";

import { FC, useEffect, useRef } from "react";
import { UseFormSetValue, FieldErrors, UseFormWatch } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { CKEditor } from "ckeditor4-react";

type Props = {
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  errors: FieldErrors<any>;
};

const ContentInput: FC<Props> = ({ setValue, watch, errors }) => {
  const editorRef = useRef<any>(null);
  const content = watch("content");

  useEffect(() => {
    if (editorRef.current?.editor && content !== editorRef.current.editor.getData()) {
      editorRef.current.editor.setData(content);
    }
  }, [content]);

  return (
    <div>
      <Label className="mb-2" htmlFor="content">
        Nội dung
      </Label>
      <CKEditor
        ref={editorRef}
        initData={content || ""}
        config={{}}
        onChange={(event: any) => {
          const data = event.editor.getData();
          setValue("content", data, { shouldValidate: true });
        }}
      />
      {errors.content && <p className="text-red-500 text-sm">Bắt buộc</p>}
    </div>
  );
};

export default ContentInput;
