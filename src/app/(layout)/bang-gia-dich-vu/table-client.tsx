"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { priceServiceApi } from "@/api-request/tableAPI";
import { useAppSelector } from "@/store/hook";
import { toast } from "sonner";

interface PriceServiceType {
  _id?: string;
  name_service: string;
  vehicle_type: string[];
  unit: string[];
  price: string[];
}

export default function PriceServiceClient() {
  const token = useAppSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const originalIdsRef = useRef<string[]>([]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<{ services: PriceServiceType[] }>({
    defaultValues: {
      services: [{ name_service: "", vehicle_type: [""], unit: [""], price: [""] }],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "services",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await priceServiceApi.getAll();
        const response = data.data;
        if (response && Array.isArray(response) && response.length > 0) {
          const formattedData = response.map((item: any) => ({
            ...item,
            vehicle_type: Array.isArray(item.vehicle_type) ? item.vehicle_type : [item.vehicle_type || ""],
            unit: Array.isArray(item.unit) ? item.unit : [item.unit || ""],
            price: Array.isArray(item.price) ? item.price : [item.price || ""],
          }));
          reset({ services: formattedData });
          originalIdsRef.current = response.map((item: any) => item._id);
          setIsEditing(true);
        } else {
          setIsEditing(false);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API lấy dữ liệu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [reset, token]);

  const onSubmit = async (data: { services: PriceServiceType[] }) => {
    if (data.services.length === 0) {
      setSubmitError("Bạn cần nhập ít nhất 1 dịch vụ.");
      return;
    }

    setSubmitError(null);
    setIsLoading(true);

    try {
      const headers = { Authorization: `Bearer ${token}` };

      const currentIds = data.services.map((item) => item._id).filter((id) => id) as string[];
      const deletedIds = originalIdsRef.current.filter((id) => !currentIds.includes(id));
      const toCreate = data.services.filter((item) => !item._id);
      const toUpdate = data.services
        .filter((item) => item._id)
        .map((item) => ({
          id: item._id!,
          data: {
            name_service: item.name_service,
            vehicle_type: item.vehicle_type.filter((v) => v),
            unit: item.unit.filter((u) => u),
            price: item.price.filter((p) => p),
          },
        }));

      if (toCreate.length > 0) {
        await priceServiceApi.create({ data: toCreate, headers });
      }

      if (toUpdate.length > 0) {
        await priceServiceApi.update({ data: toUpdate, headers });
      }

      if (deletedIds.length > 0) {
        await Promise.all(deletedIds.map((id) => priceServiceApi.delete({ _id: id, headers })));
      }

      const updated = await priceServiceApi.getAll();
      const formattedUpdated = updated.data.map((item: any) => ({
        ...item,
        vehicle_type: Array.isArray(item.vehicle_type) ? item.vehicle_type : [item.vehicle_type || ""],
        unit: Array.isArray(item.unit) ? item.unit : [item.unit || ""],
        price: Array.isArray(item.price) ? item.price : [item.price || ""],
      }));
      reset({ services: formattedUpdated });
      originalIdsRef.current = updated.data.map((item: any) => item._id);
      setIsEditing(true);
      toast.success("Thao tác thành công");
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
      setSubmitError("Tải dữ liệu thất bại, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-6 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">{isEditing ? "Cập nhật bảng giá dịch vụ" : "Thêm bảng giá dịch vụ"}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4">
            <div>
              <Label>Tên dịch vụ</Label>
              <Input
                {...register(`services.${index}.name_service`, { required: "Tên dịch vụ là bắt buộc" })}
                placeholder="Tên dịch vụ"
                disabled={isLoading}
              />
              {errors.services?.[index]?.name_service && (
                <p className="text-red-500 text-sm">{errors.services[index].name_service.message}</p>
              )}
            </div>

            {/* Vehicle Type Array */}
            <div>
              <Label>Loại xe</Label>
              {field.vehicle_type.map((_, vehicleIndex) => (
                <div key={vehicleIndex} className="flex gap-2 mb-2">
                  <Input
                    {...register(`services.${index}.vehicle_type.${vehicleIndex}`, {
                      required: "Loại xe là bắt buộc",
                    })}
                    placeholder="Loại xe"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      const currentService = getValues("services")[index];
                      const updatedVehicleTypes = [...currentService.vehicle_type];
                      updatedVehicleTypes.splice(vehicleIndex, 1);
                      update(index, { ...currentService, vehicle_type: updatedVehicleTypes });
                    }}
                    disabled={isLoading || field.vehicle_type.length === 1}
                  >
                    Xóa
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  const currentService = getValues("services")[index];
                  update(index, { ...currentService, vehicle_type: [...currentService.vehicle_type, ""] });
                }}
                disabled={isLoading}
              >
                Thêm loại xe
              </Button>
            </div>

            {/* Unit Array */}
            <div>
              <Label>Đơn vị</Label>
              {field.unit.map((_, unitIndex) => (
                <div key={unitIndex} className="flex gap-2 mb-2">
                  <Input
                    {...register(`services.${index}.unit.${unitIndex}`, { required: "Đơn vị là bắt buộc" })}
                    placeholder="Đơn vị (ví dụ: bánh, xe,...)"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      const currentService = getValues("services")[index];
                      const updatedUnits = [...currentService.unit];
                      updatedUnits.splice(unitIndex, 1);
                      update(index, { ...currentService, unit: updatedUnits });
                    }}
                    disabled={isLoading || field.unit.length === 1}
                  >
                    Xóa
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  const currentService = getValues("services")[index];
                  update(index, { ...currentService, unit: [...currentService.unit, ""] });
                }}
                disabled={isLoading}
              >
                Thêm đơn vị
              </Button>
            </div>

            {/* Price Array */}
            <div>
              <Label>Giá</Label>
              {field.price.map((_, priceIndex) => (
                <div key={priceIndex} className="flex gap-2 mb-2">
                  <Input
                    {...register(`services.${index}.price.${priceIndex}`, { required: "Giá là bắt buộc" })}
                    placeholder="Giá"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      const currentService = getValues("services")[index];
                      const updatedPrices = [...currentService.price];
                      updatedPrices.splice(priceIndex, 1);
                      update(index, { ...currentService, price: updatedPrices });
                    }}
                    disabled={isLoading || field.price.length === 1}
                  >
                    Xóa
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  const currentService = getValues("services")[index];
                  update(index, { ...currentService, price: [...currentService.price, ""] });
                }}
                disabled={isLoading}
              >
                Thêm giá
              </Button>
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => remove(index)}
                variant="destructive"
                disabled={isLoading || fields.length === 1}
              >
                Xóa dịch vụ
              </Button>
            </div>
          </div>
        ))}

        <div className="flex justify-between">
          <Button
            type="button"
            onClick={() => append({ name_service: "", vehicle_type: [""], unit: [""], price: [""] })}
            disabled={isLoading}
          >
            Thêm dịch vụ
          </Button>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Đang lưu..." : isEditing ? "Cập nhật" : "Lưu danh sách"}
          </Button>
        </div>

        {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
      </form>
    </div>
  );
}
