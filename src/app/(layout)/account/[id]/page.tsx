import { Account } from "@/type/account";
import AccountDetailClient from "./account-client";

type ParamsType = Promise<{ id: string }>;

async function BaiVietDetail({ params }: { params: ParamsType }) {
  const { id } = await params;
  // goi api theo id trả về một account hoặc null
  return (
    <div>
      <AccountDetailClient accountId={id} />
    </div>
  );
}

export default BaiVietDetail;
