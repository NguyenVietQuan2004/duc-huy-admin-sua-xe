import httpRequest from "@/lib/http";

export const authApi = {
  login(body: any) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/login`, {
      body,
    });
  },
  createAdmin({ body, headers }: any) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/create-admin`, {
      body,
      headers,
    });
  },
  getListAdmins({ limit, page, headers }: { limit?: number; page?: number; headers: HeadersInit }) {
    return httpRequest.get<any>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/list-admin?limit=${limit}&page=${page}`,
      {
        headers,
      }
    );
  },
  getAdminById({ headers, _id }: { headers: HeadersInit; _id: string }) {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/admin/${_id}`, {
      headers,
    });
  },

  updateAdmin({ body, headers, _id }: { body: any; headers: HeadersInit; _id: string }) {
    return httpRequest.put<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/update-admin/${_id}`, {
      body,
      headers,
    });
  },
  deleteAdmin({ _id, headers }: { _id: any; headers: HeadersInit }) {
    return httpRequest.delete<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/delete-admin/${_id}`, {
      headers,
    });
  },
  sendCookieToServer(body: any) {
    return httpRequest.post<any>(`/api/auth/login`, {
      body,
    });
  },
  signOutNextServer() {
    return httpRequest.post<any>(`/api/auth/logout`, {});
  },
};
