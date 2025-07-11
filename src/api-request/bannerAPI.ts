import httpRequest from "@/lib/http";

export const bannerApi = {
  getBanner() {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/banners`, {});
  },

  createBanner({ formData, headers }: { formData: any; headers: HeadersInit }) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/banners`, {
      headers,
      body: formData,
    });
  },

  updateBanner({ _id, formData, headers }: { _id: string; formData: any; headers: HeadersInit }) {
    return httpRequest.patch<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/banners/${_id}`, {
      headers,
      body: formData,
    });
  },

  deleteBanner({ _id, headers }: { _id: string; headers: HeadersInit }) {
    return httpRequest.delete<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/banners/${_id}`, {
      headers,
    });
  },
};
