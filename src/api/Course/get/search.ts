import { apiFetchGET, FetchResponse } from "@/api/apiFetch";
import GetCoursesResponse, { Course } from "./type";

export async function searchForm(
  keyword: string
): Promise<FetchResponse<Course[]>> {
  const res = await apiFetchGET<GetCoursesResponse>(
    `/searchCourses?keywords=${keyword}`
  );
  return {
    ok: res.ok,
    status: res.status,
    data: res.data?.bucket_courses || [],
    error: res.error || "Ошибка поиска курсов",
  };
}
