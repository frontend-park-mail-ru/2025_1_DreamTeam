import { apiFetchPOST, FetchResponse } from "@/api/apiFetch";

export async function addCourseFavorites(
  courseId: number
): Promise<FetchResponse<null>> {
  const res = await apiFetchPOST<null>("/addCourseToFavourites", {
    id: courseId,
  });
  return {
    ok: res.ok,
    status: res.status,
    data: res.data || null,
    error: res.error || "Ошибка добавления в избранное",
  };
}
