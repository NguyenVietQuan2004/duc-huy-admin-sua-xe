import httpRequest from "@/lib/http";

export const dashboardApi = {
  getDashboard() {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/home/dashboard`, {});
  },
};
