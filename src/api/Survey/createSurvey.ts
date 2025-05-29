import { QuestionsStructure } from "@/types/question";
import { apiFetchPOST, FetchResponse } from "../apiFetch";

export async function sendQuestions(
  payload: QuestionsStructure
): Promise<FetchResponse<null>> {
  const res = await apiFetchPOST<null>("/createSurvey", payload);
  return {
    ok: res.ok,
    status: res.status,
    data: res.data || null,
    error: res.error || "Ошибка при отправке вопросов опроса",
  };
}
