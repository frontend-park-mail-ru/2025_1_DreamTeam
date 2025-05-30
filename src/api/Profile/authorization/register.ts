import { apiFetchPOST, FetchResponse } from "@/api/apiFetch";

export async function registerUser(
  email: string,
  name: string,
  password: string
): Promise<FetchResponse<null>> {
  const res = await apiFetchPOST<null>("/register", {
    email,
    name,
    password,
  });
  return {
    ok: res.ok,
    status: res.status,
    data: null,
    error: res.error || "Ошибка регистрации",
  };
}
