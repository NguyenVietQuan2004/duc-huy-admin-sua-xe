import httpRequest from "@/lib/http";

export const posterApi = {
  // GET /api/admin/poster
  getPoster() {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/poster`, {});
  },

  // POST /api/admin/poster
  createPoster({ formData, headers }: { formData: FormData; headers: HeadersInit }) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/poster`, {
      headers,
      body: formData,
    });
  },

  // PATCH /api/admin/poster/:id
  updatePoster({ _id, formData, headers }: { _id: string; formData: FormData; headers: HeadersInit }) {
    return httpRequest.patch<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/poster/${_id}`, {
      headers,
      body: formData,
    });
  },

  // DELETE /api/admin/poster/:id
  deletePoster({ _id, headers }: { _id: string; headers: HeadersInit }) {
    return httpRequest.delete<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/poster/${_id}`, {
      headers,
    });
  },
};
