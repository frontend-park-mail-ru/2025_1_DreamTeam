import { apiFetchGET, FetchResponse } from "@/api/apiFetch";
import { Course } from "./type";

export async function getCompletedCourses(): Promise<FetchResponse<Course[]>> {
  const res = await apiFetchGET<{ bucket_courses: Course[] }>(
    "/getCompletedCourses"
  );
  return {
    ok: res.ok,
    status: res.status,
    data: res.data?.bucket_courses || [],
    error: res.error || "Ошибка получения завершенных курсов",
  };
}
