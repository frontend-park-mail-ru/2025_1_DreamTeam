import { apiFetchGET, FetchResponse } from "@/api/apiFetch";
import GetCoursesResponse, { Course } from "./type";

export async function getCourses(): Promise<FetchResponse<Course[]>> {
  const res = await apiFetchGET<GetCoursesResponse>("/getCourses");
  return {
    ok: res.ok,
    status: res.status,
    data: res.data?.bucket_courses || [],
    error: res.error || undefined,
  };
}
