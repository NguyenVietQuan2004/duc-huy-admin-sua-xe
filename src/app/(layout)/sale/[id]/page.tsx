import { Sale } from "@/type/sale";
import BaiVietDetailClient from "./sale-client";

type ParamsType = Promise<{ id: string }>;

async function BaiVietDetail({ params }: { params: ParamsType }) {
  const { id } = await params;
  // goi api theo id trả về một sale hoặc null
  return (
    <div>
      <BaiVietDetailClient saleId={id} />
    </div>
  );
}

export default BaiVietDetail;
