import { apiFetchPOST, FetchResponse } from "@/api/apiFetch";

export async function postTestLesson(
  question_id: number,
  answer: string
): Promise<FetchResponse<null>> {
  const res = await apiFetchPOST("/AnswerQuestion", {
    question_id,
    answer,
  });
  return {
    ok: res.ok,
    status: res.status,
    data: res.data || null,
    error: res.error || "Ошибка отправки ответа на вопрос теста",
  };
}
