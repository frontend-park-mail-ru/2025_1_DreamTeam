import { apiFetchGET, FetchResponse } from "@/api/apiFetch";

export async function notCompleted(
  lesson_id: number
): Promise<FetchResponse<null>> {
  const res = await apiFetchGET<null>(
    `/markLessonAsNotCompleted?lessonId=${lesson_id}`
  );
  return {
    ok: res.ok,
    status: res.status,
    data: res.data || undefined,
    error: res.error || "Ошибка отметки урока как непройденного",
  };
}
