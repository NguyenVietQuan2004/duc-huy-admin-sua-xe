import httpRequest from "@/lib/http";

export const contentAppointmentApi = {
  getContentAppointment() {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/content-appointment`, {
      cache: "no-store",
    });
  },
  updateContentAppointment({ formData, headers, _id }: { formData: any; headers: HeadersInit; _id: string }) {
    return httpRequest.patch<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/content-appointment/${_id}`, {
      headers,
      body: formData,
    });
  },
  createContentAppointment({ formData, headers }: any) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/content-appointment`, {
      headers,
      body: formData,
    });
  },
};
