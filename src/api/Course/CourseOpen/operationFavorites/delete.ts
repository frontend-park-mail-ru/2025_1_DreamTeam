import { apiFetchPOST } from "@/api/apiFetch";

export async function deleteCourseFavorites(courseId: number) {
  const res = await apiFetchPOST<null>("/deleteCourseFromFavourites", {
    id: courseId,
  });
  return {
    ok: res.ok,
    status: res.status,
    data: res.data || null,
    error: res.error || "Ошибка удаления из избранного",
  };
}
