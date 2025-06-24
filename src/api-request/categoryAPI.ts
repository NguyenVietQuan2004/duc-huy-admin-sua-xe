import httpRequest from "@/lib/http";

export const categoryApi = {
  getAllcategory({ limit, page, headers }: { limit?: number; page?: number; headers: HeadersInit }) {
    return httpRequest.get<any>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/category?limit=${limit}&page=${page}`,
      {
        headers,
      }
    );
  },
  getCategoryById({ categoryId, headers }: { categoryId: string; headers: HeadersInit }) {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/category/${categoryId}`, {
      headers,
    });
  },
  updateCategory({ formData, headers, _id }: { formData: any; headers: HeadersInit; _id: string }) {
    return httpRequest.put<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/category/${_id}`, {
      headers,
      body: formData,
    });
  },
  deleteCategory({ _id, headers }: { _id: any; headers: HeadersInit }) {
    return httpRequest.delete<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/category/${_id}`, {
      headers,
    });
  },
  createCategory({ formData, headers }: any) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/category`, {
      headers,
      body: formData,
    });
  },
};
