import httpRequest from "@/lib/http";

export const contactApi = {
  getAllContacts({ limit, page, headers }: { limit?: number; page?: number; headers: HeadersInit }) {
    return httpRequest.get<any>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/contact?limit=${limit}&page=${page}`,
      {
        headers,
      }
    );
  },
  updateContact({ headers, _id }: { headers: HeadersInit; _id: string }) {
    return httpRequest.patch<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/contact/${_id}/handled`, {
      headers,
    });
  },
  deleteContact({ _id, headers }: { _id: any; headers: HeadersInit }) {
    return httpRequest.delete<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/contact/${_id}`, {
      headers,
    });
  },
};
