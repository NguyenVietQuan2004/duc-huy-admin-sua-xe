"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import AlertModal from "@/components/alert-modal";
import { Appointment } from "@/type/appointment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CellStatusAppointmentProps {
  row: Appointment;
}

function CellStatusAppointment({ row }: CellStatusAppointmentProps) {
  const [status, setStatus] = useState(row.status); // true / false
  const [selected, setSelected] = useState(row.status ? "true" : "false");
  const [open, setOpen] = useState(false);

  const handleStatusChange = async () => {
    setStatus(true);
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
            onValueChange={(value: any) => {
              if (value !== String(status)) {
                setSelected(value);
                setOpen(true); // Mở Alert để xác nhận
              }
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Đã xác nhận</SelectItem>
              <SelectItem value="false">Chưa xác nhận</SelectItem>
            </SelectContent>
          </Select>

          {/* {loading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />} */}
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        </div>

        {/* {error && <div className="text-red-500 text-sm">{error}</div>} */}
      </div>
    </>
  );
}

export default CellStatusAppointment;
