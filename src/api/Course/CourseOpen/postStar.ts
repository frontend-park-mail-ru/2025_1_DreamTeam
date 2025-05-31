import { apiFetchPOST, FetchResponse } from "@/api/apiFetch";

export function postStar(
  course_id: number,
  rating: number
): Promise<FetchResponse<null>> {
  return apiFetchPOST<null>("/addRating", {
    course_id,
    rating,
  }).then((res) => {
    return {
      ok: res.ok,
      status: res.status,
      data: res.data || null,
      error: res.error,
    };
  });
}
