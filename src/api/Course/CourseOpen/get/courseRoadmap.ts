import { apiFetchGET, FetchResponse } from "@/api/apiFetch";
import { CourseStructure } from "@/types/courseMenu";

export async function getCourseRoadmap(
  courseId: number
): Promise<FetchResponse<CourseStructure>> {
  const res = await apiFetchGET<{ course_roadmap: CourseStructure }>(
    `/getCourseRoadmap?courseId=${courseId}`
  );
  return {
    ok: res.ok,
    status: res.status,
    data: res.data?.course_roadmap || { parts: [] },
    error: res.error || "Ошибка получения дорожной карты курса",
  };
}
