import { apiFetchPOST, FetchResponse } from "@/api/apiFetch";

export async function markCourseAsCompleted(
  course_id: number
): Promise<FetchResponse<null>> {
  const res = await apiFetchPOST<null>("/markCourseAsCompleted", {
    course_id,
  });
  return {
    ok: res.ok,
    status: res.status,
    data: res.data || null,
    error: res.error || "Ошибка отметки курса как завершенного",
  };
}
