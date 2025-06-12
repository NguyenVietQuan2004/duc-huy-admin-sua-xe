import httpRequest from "@/lib/http";

export const appointmentApi = {
  getAllAppointments({ limit, page, headers }: { limit?: number; page?: number; headers: HeadersInit }) {
    return httpRequest.get<any>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/appointments?limit=${limit}&page=${page}`,
      {
        headers,
      }
    );
  },
  getAppointmentById({ appointmentId, headers }: { appointmentId: string; headers: HeadersInit }) {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/appointments/${appointmentId}`, {
      headers,
    });
  },
  // cho nay patch
  updateAppointment({ headers, _id }: { headers: HeadersInit; _id: string }) {
    return httpRequest.patch<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/appointments/${_id}/done`, {
      headers,
    });
  },
  deleteAppointment({ _id, headers }: { _id: any; headers: HeadersInit }) {
    return httpRequest.delete<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/appointments/${_id}`, {
      headers,
    });
  },
  createAppointment({ formData, headers }: any) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/appointments`, {
      headers,
      body: formData,
    });
  },
};
