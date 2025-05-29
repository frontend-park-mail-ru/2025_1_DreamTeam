import { apiFetchGET, FetchResponse } from "@/api/apiFetch";
import { LessonsStructure } from "@/types/lesson";

export async function getLessons(
  courseId: number
): Promise<FetchResponse<LessonsStructure>> {
  const res = await apiFetchGET<LessonsStructure>(
    `/getCourseLesson?courseId=${courseId}`
  );
  return {
    ok: res.ok,
    status: res.status,
    data: res.data || undefined,
    error: res.error || "Ошибка получения уроков курса",
  };
}