import AccountDetailClient from "./account-client";

type ParamsType = Promise<{ id: string }>;

async function BaiVietDetail({ params }: { params: ParamsType }) {
  const { id } = await params;
  return (
    <div>
      <AccountDetailClient accountId={id} />
    </div>
  );
}

export default BaiVietDetail;
