import { apiFetchPOST, FetchResponse } from "@/api/apiFetch";

export async function deletePhoto(): Promise<FetchResponse<null>> {
  const res = await apiFetchPOST<null>("/deleteProfilePhoto", {});
  return {
    ok: res.ok,
    status: res.status,
    data: res.data || null,
    error: res.error || "Ошибка удаления фото профиля",
  };
}
