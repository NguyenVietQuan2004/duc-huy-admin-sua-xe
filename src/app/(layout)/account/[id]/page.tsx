import { Account } from "@/type/account";
import BaiVietDetailClient from "./account-client";

const initialAccounts: Account = {
  _id: "user1",
  name: "Nguyễn Văn A",
  email: "nguyenvana@example.com",
  created_at: new Date("2024-06-15T10:30:00Z"),
  updated_at: new Date("2025-05-01T12:00:00Z"),
};
type ParamsType = Promise<{ id: string }>;

async function BaiVietDetail({ params }: { params: ParamsType }) {
  const { id } = await params;
  // goi api theo id trả về một account hoặc null
  const account = initialAccounts;
  return (
    <div>
      <BaiVietDetailClient account={account || id} />
    </div>
  );
}

export default BaiVietDetail;
