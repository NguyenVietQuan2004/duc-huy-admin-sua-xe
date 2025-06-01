import httpRequest from "@/lib/http";

export const serviceApi = {
  getAllservices({ limit, page, headers }: { limit?: number; page?: number; headers: HeadersInit }) {
    return httpRequest.get<any>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/services?limit=${limit}&page=${page}`,
      {
        headers,
      }
    );
  },
  getServiceById({ serviceId, headers }: { serviceId: string; headers: HeadersInit }) {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/services/${serviceId}`, {
      headers,
    });
  },
  updateService({ formData, headers, _id }: { formData: any; headers: HeadersInit; _id: string }) {
    return httpRequest.put<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/services/${_id}`, {
      headers,
      body: formData,
    });
  },
  deleteService({ _id, headers }: { _id: any; headers: HeadersInit }) {
    return httpRequest.delete<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/services/${_id}`, {
      headers,
    });
  },
  createService({ formData, headers }: any) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/services`, {
      headers,
      body: formData,
    });
  },
};
