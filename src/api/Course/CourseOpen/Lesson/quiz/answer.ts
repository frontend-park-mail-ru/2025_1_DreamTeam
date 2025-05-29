import { apiFetchPOST, FetchResponse } from "@/api/apiFetch";

export async function postQuizLesson(
  question_id: number,
  answer_id: number,
  course_id: number
): Promise<FetchResponse<null>> {
  const res = await apiFetchPOST<null>("/AnswerQuiz", {
    question_id,
    answer_id,
    course_id,
  });
  return {
    ok: res.ok,
    status: res.status,
    data: res.data || null,
    error: res.error || "Ошибка отправки ответа на вопрос викторины",
  };
}
