import SaleDetailClient from "./sale-client";

type ParamsType = Promise<{ id: string }>;

async function SaleDetail({ params }: { params: ParamsType }) {
  const { id } = await params;
  return (
    <div>
      <SaleDetailClient saleId={id} />
    </div>
  );
}

export default SaleDetail;
