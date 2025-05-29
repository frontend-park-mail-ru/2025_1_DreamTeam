import { apiFetchPOST, FetchResponse } from "@/api/apiFetch";

export async function uploadProfilePhoto(
  file: File
): Promise<FetchResponse<null>> {
  const formData = new FormData();

  formData.append("avatar", file);

  const jsonData = JSON.stringify({ avatar: file.name });
  formData.append("data", jsonData);

  const res = await apiFetchPOST<null>("/uploadProfilePhoto", formData);
  return {
    ok: res.ok,
    status: res.status,
    data: res.data,
    error: res.error || "Ошибка загрузки фото профиля",
  };
}
