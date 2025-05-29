import { apiFetchPOST, FetchResponse } from "@/api/apiFetch";

export async function loginUser(
  email: string,
  password: string
): Promise<FetchResponse<null>> {
  const res = await apiFetchPOST("/login", {
    email,
    password,
  });
  return {
    ok: res.ok,
    status: res.status,
    data: null,
    error: undefined,
  };
}
