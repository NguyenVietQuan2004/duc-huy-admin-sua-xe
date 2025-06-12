import ServiceDetailClient from "./service-client";

type ParamsType = Promise<{ id: string }>;

async function ServiceDetail({ params }: { params: ParamsType }) {
  const { id } = await params;
  return (
    <div>
      <ServiceDetailClient serviceId={id} />
    </div>
  );
}

export default ServiceDetail;
