"use client";

import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import AlertModal from "@/components/alert-modal";
import { Appointment } from "@/type/appointment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { appointmentApi } from "@/api-request/appointmentAPI";
import { useAppSelector } from "@/store/hook";

interface CellStatusAppointmentProps {
  row: Appointment;
}

function CellStatusAppointment({ row }: CellStatusAppointmentProps) {
  const [status, setStatus] = useState<Appointment["status"]>(row.status); // "pending" | "done" | "cancelled"
  const [selected, setSelected] = useState<Appointment["status"]>(row.status);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleStatusChange = async () => {
    setLoading(true);
    try {
      // Chỉ gọi API khi selected là done
      if (selected === "done") {
        await appointmentApi.updateAppointment({
          _id: row._id,
          headers,
        });
        setStatus(selected);
      } else {
        // Nếu không phải done, chỉ set trạng thái local thôi
        setStatus(selected);
      }
    } catch (error) {
      console.error("Failed to update appointment status:", error);
      setSelected(status); // rollback khi lỗi
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
              const castedValue = value as Appointment["status"];
              if (castedValue !== status) {
                setSelected(castedValue);
                setOpen(true);
              }
            }}
            disabled={status === "done"} // khóa select nếu đã done
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Chưa xác nhận</SelectItem>
              <SelectItem value="done">Đã xác nhận</SelectItem>
              {/* <SelectItem disabled value="cancelled">
                Đã hủy
              </SelectItem> */}
            </SelectContent>
          </Select>

          {loading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}

          {/* Hiển thị icon tích nếu status done */}
          {status === "done" && !loading && <Check className="w-5 h-5 text-green-600" />}
        </div>
      </div>
    </>
  );
}

export default CellStatusAppointment;
