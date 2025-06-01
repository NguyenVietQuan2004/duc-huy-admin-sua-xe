import httpRequest from "@/lib/http";

export const saleApi = {
  getAllSales({ limit, page, headers }: { limit?: number; page?: number; headers: HeadersInit }) {
    return httpRequest.get<any>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/promotion?limit=${limit}&page=${page}`,
      {
        headers,
      }
    );
  },
  getSaleById({ saleId, headers }: { saleId: string; headers: HeadersInit }) {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/promotion/${saleId}`, {
      headers,
    });
  },
  updateSale({ formData, headers, _id }: { formData: any; headers: HeadersInit; _id: string }) {
    return httpRequest.put<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/promotion/${_id}`, {
      headers,
      body: formData,
    });
  },
  deleteSale({ _id, headers }: { _id: any; headers: HeadersInit }) {
    return httpRequest.delete<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/promotion/${_id}`, {
      headers,
    });
  },
  createSale({ formData, headers }: any) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/promotion`, {
      headers,
      body: formData,
    });
  },
};
