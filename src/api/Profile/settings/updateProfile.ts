import { apiFetchPOST, FetchResponse } from "@/api/apiFetch";

export async function updateProfile(
  image: string,
  bio: string,
  email: string,
  hide_email: boolean,
  name: string
): Promise<FetchResponse<null>> {
  const res = await apiFetchPOST<null>("/updateProfile", {
    image,
    bio,
    email,
    hide_email,
    name,
  });
  return {
    ok: res.ok,
    status: res.status,
    data: null,
    error: res.error || "Ошибка обновления профиля",
  };
}
