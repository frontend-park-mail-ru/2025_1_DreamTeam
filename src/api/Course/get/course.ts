import { apiFetchGET, FetchResponse } from "@/api/apiFetch";
import { CourseOpen } from "@/types/courseMenu";
import { CourseOpenResponse } from "./type";

export async function getCourse(
  id: number
): Promise<FetchResponse<CourseOpen>> {
  const res = await apiFetchGET<CourseOpenResponse>(
    `/getCourse?courseId=${id}`
  );
  return {
    ok: res.ok,
    status: res.status,
    data: res.data?.course || undefined,
    error: res.error || undefined,
  };
}
