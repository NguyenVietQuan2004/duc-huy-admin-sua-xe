import httpRequest from "@/lib/http";

export const addressApi = {
  getAddresses() {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/addresses`, {});
  },
  getAddress({ _id }: { _id: string }) {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/addresses/${_id}`, {});
  },
  updateAddress({ data, headers, _id }: { data: any; headers: HeadersInit; _id: string }) {
    return httpRequest.patch<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/addresses/${_id}`, {
      headers,
      body: data,
    });
  },
  deleteAddress({ headers, _id }: { headers: HeadersInit; _id: string }) {
    return httpRequest.delete<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/addresses/${_id}`, {
      headers,
    });
  },
  createAddress({ data, headers }: any) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/addresses`, {
      headers,
      body: data,
    });
  },
};
