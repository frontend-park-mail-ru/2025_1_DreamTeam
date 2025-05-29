import { apiFetchGET, FetchResponse } from "@/api/apiFetch";
import { StatisticType } from "@/types/staticsCourse";

export async function getStatics(
  courseId: number
): Promise<FetchResponse<StatisticType>> {
  const res = await apiFetchGET<{ statistic: StatisticType }>(
    `/getStatistic?courseId=${courseId}`
  );
  return {
    ok: res.ok,
    status: res.status,
    data: res.data?.statistic || undefined,
    error: res.error || "Ошибка получения статистики курса",
  };
}
