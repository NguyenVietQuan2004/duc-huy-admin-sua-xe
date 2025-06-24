import CategoryDetailClient from "./category-client";

type ParamsType = Promise<{ id: string }>;

async function CategoryDetail({ params }: { params: ParamsType }) {
  const { id } = await params;
  return (
    <div>
      <CategoryDetailClient categoryId={id} />
    </div>
  );
}

export default CategoryDetail;
