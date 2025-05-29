import { apiFetchGET, FetchResponse } from "@/api/apiFetch";
import { AuthResponse } from "./type";

export async function checkAuth(): Promise<FetchResponse<AuthResponse>> {
  const res = await apiFetchGET<AuthResponse>("/isAuthorized");
  if (res.ok && res.data) {
    console.log("✅ Пользователь авторизован");
    return {
      ok: true,
      status: res.status,
      data: res.data,
      error: undefined,
    };
  }
  console.log("❌ Пользователь НЕ авторизован");
  return {
    ok: false,
    status: res.status,
    data: undefined,
    error: res.error || "Пользователь не авторизован",
  };
}
