import { apiFetchGET, FetchResponse } from "@/api/apiFetch";

export async function validEmail(token: string): Promise<FetchResponse<null>> {
  const res = await apiFetchGET<null>(`/validEmail?token=${token}`);
  return {
    ok: res.ok,
    status: res.status,
    data: res.data || null,
    error: res.error || "Ошибка валидации email",
  };
}
