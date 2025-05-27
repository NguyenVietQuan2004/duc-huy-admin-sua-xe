"use client";

import { FC } from "react";
import { UseFormSetValue, UseFormGetValues, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { CKEditor } from "ckeditor4-react";

type Props = {
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  errors: FieldErrors<any>;
};

const ContentInput: FC<Props> = ({ setValue, getValues, errors }) => {
  return (
    <div>
      <Label className="mb-2" htmlFor="content">
        Nội dung
      </Label>
      <CKEditor
        initData={getValues("content") || ""}
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
