import httpRequest from "@/lib/http";

export const priceServiceApi = {
  // GET /api/admin/price-services
  getAll() {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/price-services`);
  },

  // GET /api/admin/price-services/:id
  getById(_id: string) {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/price-services/${_id}`);
  },

  // POST /api/admin/price-services
  create({ data, headers }: { data: any; headers: HeadersInit }) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/price-services`, {
      headers,
      body: data,
    });
  },

  // PATCH /api/admin/price-services
  update({ data, headers }: { data: any; headers: HeadersInit }) {
    return httpRequest.put<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/price-services`, {
      headers,
      body: data,
    });
  },

  // DELETE /api/admin/price-services/:id
  delete({ _id, headers }: { _id: string; headers: HeadersInit }) {
    return httpRequest.delete<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/price-services/${_id}`, {
      headers,
    });
  },
};
