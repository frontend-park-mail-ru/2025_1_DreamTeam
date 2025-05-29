import { apiFetchGET, FetchResponse } from "@/api/apiFetch";
import { QuestionsStructure } from "@/types/question";

export async function getQuizLesson(
  lesson_id: number
): Promise<FetchResponse<QuestionsStructure>> {
  const res = await apiFetchGET<QuestionsStructure>(
    `/GetQuizLesson?lessonId=${lesson_id}`
  );
  return {
    ok: res.ok,
    status: res.status,
    data: res.data || undefined,
    error: res.error || "Ошибка получения теста или викторины",
  };
}
