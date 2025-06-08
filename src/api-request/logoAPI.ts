import httpRequest from "@/lib/http";

export const logoApi = {
  getLogo() {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/logo`, {
      cache: "no-store",
    });
  },
  updateLogo({ formData, headers }: { formData: any; headers: HeadersInit }) {
    return httpRequest.patch<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/logo/`, {
      headers,
      body: formData,
    });
  },
  createLogo({ formData, headers }: any) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/logo`, {
      headers,
      body: formData,
    });
  },
};
