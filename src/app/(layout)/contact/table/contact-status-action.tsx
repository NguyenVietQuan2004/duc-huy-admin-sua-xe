"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import AlertModal from "@/components/alert-modal";
import { Contact } from "@/type/contact";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppSelector } from "@/store/hook";
import { contactApi } from "@/api-request/contactAPI";

interface CellStatusContactProps {
  row: Contact;
}

function CellStatusContact({ row }: CellStatusContactProps) {
  const [handled, setHandled] = useState(row.handled);
  const [selected, setSelected] = useState(row.handled ? "true" : "false");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleStatusChange = async () => {
    try {
      setLoading(true);
      await contactApi.updateContact({ _id: row._id, headers });
      setHandled(true);
      setSelected("true");
    } catch (error) {
      console.error("Failed to update contact status:", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        action="Xác nhận"
        variant="default"
        onConfirm={handleStatusChange}
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <Select
            value={selected}
            onValueChange={(value: string) => {
              if (value === "true" && !handled) {
                setOpen(true); // Mở modal xác nhận
              }
            }}
            disabled={handled}
          >
            <SelectTrigger
              className="w-[180px]"
              title={handled ? "Trạng thái đã được xác nhận, không thể thay đổi" : ""}
            >
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Đã xác nhận</SelectItem>
              <SelectItem value="false">Chưa xác nhận</SelectItem>
            </SelectContent>
          </Select>

          {loading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
        </div>
      </div>
    </>
  );
}

export default CellStatusContact;
