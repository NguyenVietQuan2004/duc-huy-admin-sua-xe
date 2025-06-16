import { Suspense } from "react";
import BaiVietDetailClient from "./blog-client";
import Loading from "./loading";

type ParamsType = Promise<{ id: string }>;

async function BaiVietDetail({ params }: { params: ParamsType }) {
  const { id } = await params;
  return (
    <div>
      <BaiVietDetailClient blogId={id} />
    </div>
  );
}

export default BaiVietDetail;
