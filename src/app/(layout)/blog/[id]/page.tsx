import { Suspense } from "react";
import BaiVietDetailClient from "./blog-client";
import Loading from "./loading";

type ParamsType = Promise<{ id: string }>;

async function BaiVietDetail({ params }: { params: ParamsType }) {
  const { id } = await params;
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <BaiVietDetailClient blogId={id} />
      </Suspense>
    </div>
  );
}

export default BaiVietDetail;
