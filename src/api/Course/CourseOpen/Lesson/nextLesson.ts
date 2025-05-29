import { apiFetchGET, FetchResponse } from "@/api/apiFetch";
import { LessonsStructure } from "@/types/lesson";

export async function getNextLesson(
  courseId: number,
  lessonId: number
): Promise<FetchResponse<LessonsStructure>> {
  const res = await apiFetchGET<LessonsStructure>(
    `/getNextLesson?courseId=${courseId}&lessonId=${lessonId}`
  );
  return {
    ok: res.ok,
    status: res.status,
    data: res.data || undefined,
    error: res.error || "Ошибка получения следующего урока",
  };
}
