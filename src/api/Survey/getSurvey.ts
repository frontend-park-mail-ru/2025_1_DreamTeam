import { QuestionsStructure } from "@/types/question";
import { apiFetchGET, FetchResponse } from "../apiFetch";

export async function getSurvey(): Promise<FetchResponse<QuestionsStructure>> {
  const res = await apiFetchGET<QuestionsStructure>("/getSurvey");
  return {
    ok: res.ok,
    status: res.status,
    data: res.data || undefined,
    error: res.error || "Ошибка при получении опроса",
  };
}
