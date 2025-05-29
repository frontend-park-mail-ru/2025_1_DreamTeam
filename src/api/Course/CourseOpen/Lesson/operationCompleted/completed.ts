import { apiFetchPOST, FetchResponse } from "@/api/apiFetch";

export async function Completed(
  lesson_id: number
): Promise<FetchResponse<null>> {
  const res = await apiFetchPOST<null>("/markLessonAsCompleted", {
    lesson_id,
  });
  return {
    ok: res.ok,
    status: res.status,
    data: res.data || null,
    error: res.error || "Ошибка отметки урока как пройденного",
  };
}
