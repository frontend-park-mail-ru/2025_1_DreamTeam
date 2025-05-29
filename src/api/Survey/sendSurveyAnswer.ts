import { FetchResponse, apiFetchPOST } from "@/api/apiFetch";

export async function sendSurveyAnswer(
  question_id: number,
  answer: number
): Promise<FetchResponse<null>> {
  const res = await apiFetchPOST<null>("/sendSurveyQuestionAnswer", {
    question_id,
    answer,
  });
  return {
    ok: res.ok,
    status: res.status,
    data: res.data || null,
    error: res.error || "Ошибка при отправке ответа на вопрос опроса",
  };
}
