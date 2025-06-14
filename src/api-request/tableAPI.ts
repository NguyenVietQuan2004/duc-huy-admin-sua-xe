import httpRequest from "@/lib/http";

export const priceServiceApi = {
  // GET /api/admin/table
  getAll() {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/table`);
  },

  // GET /api/admin/table/:id
  getById(_id: string) {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/table/${_id}`);
  },

  // POST /api/admin/table
  create({ data, headers }: { data: any; headers: HeadersInit }) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/table`, {
      headers,
      body: data,
    });
  },

  // PATCH /api/admin/table
  update({ data, headers }: { data: any; headers: HeadersInit }) {
    return httpRequest.patch<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/table`, {
      headers,
      body: data,
    });
  },

  // DELETE /api/admin/table/:id
  delete({ _id, headers }: { _id: string; headers: HeadersInit }) {
    return httpRequest.delete<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/table/${_id}`, {
      headers,
    });
  },
};
