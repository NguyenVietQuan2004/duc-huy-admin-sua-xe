import httpRequest from "@/lib/http";

export const centerApi = {
  getCenters() {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/repair-centers`, {
      cache: "no-store",
    });
  },
  getCenter({ _id }: { _id: string }) {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/repair-centers/${_id}`, {
      cache: "no-store",
    });
  },
  updateCenter({ data, headers, _id }: { data: any; headers: HeadersInit; _id: string }) {
    return httpRequest.patch<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/repair-centers/${_id}`, {
      headers,
      body: data,
    });
  },
  deleteCenter({ headers, _id }: { headers: HeadersInit; _id: string }) {
    return httpRequest.delete<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/repair-centers/${_id}`, {
      headers,
    });
  },
  createCenter({ data, headers }: any) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/repair-centers`, {
      headers,
      body: data,
    });
  },
};
