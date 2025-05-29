import { apiFetchGET, FetchResponse } from "@/api/apiFetch";
import { RatingList } from "@/types/rating";

type CourseRatingResponse = {
  course_raiting: {
    rating: RatingList;
  };
};

export async function getRating(
  courseId: number
): Promise<FetchResponse<RatingList>> {
  const res = await apiFetchGET<CourseRatingResponse>(
    `/getRating?courseId=${courseId}`
  );
  return {
    ok: res.ok,
    status: res.status,
    data: res.data?.course_raiting.rating || [],
    error: res.error || "Ошибка получения рейтинга курса",
  };
}
