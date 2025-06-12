// src/api-request/introAPI.ts
import httpRequest from "@/lib/http";

export const introApi = {
  getIntro() {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/intro/intros`, {});
  },
  getIntroById({ _id }: { _id: string }) {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/intro/intros/${_id}`, {});
  },
  createIntro({ formData, headers }: { formData: any; headers: HeadersInit }) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/intro/intros`, {
      headers,
      body: formData,
    });
  },

  updateIntro({ _id, formData, headers }: { _id: string; formData: any; headers: HeadersInit }) {
    return httpRequest.patch<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/intro/intros/${_id}`, {
      headers,
      body: formData,
    });
  },

  deleteIntro({ _id, headers }: { _id: string; headers: HeadersInit }) {
    return httpRequest.delete<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/intro/intros/${_id}`, {
      headers,
    });
  },
};
