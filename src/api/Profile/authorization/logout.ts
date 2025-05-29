import { apiFetchGET, FetchResponse } from "@/api/apiFetch";

export async function fetchLogout(): Promise<FetchResponse<null>> {
  const res = await apiFetchGET<null>("/logout");
  return {
    ok: res.ok,
    status: res.status,
    error: res.error || undefined,
    data: null,
  };
}
