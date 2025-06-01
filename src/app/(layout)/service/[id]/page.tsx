import { Service } from "@/type/service";
import ServiceDetailClient from "./service-client";

type ParamsType = Promise<{ id: string }>;

async function ServiceDetail({ params }: { params: ParamsType }) {
  const { id } = await params;
  // goi api theo id trả về một service hoặc null
  return (
    <div>
      <ServiceDetailClient serviceId={id} />
    </div>
  );
}

export default ServiceDetail;
