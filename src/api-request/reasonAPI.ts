import httpRequest from "@/lib/http";

export const reasonApi = {
  getReason() {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/reason`, {});
  },
  updateReason({ formData, headers, _id }: { formData: any; headers: HeadersInit; _id: string }) {
    return httpRequest.patch<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/reason/${_id}`, {
      headers,
      body: formData,
    });
  },
  createReason({ formData, headers }: any) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/reason`, {
      headers,
      body: formData,
    });
  },
};
