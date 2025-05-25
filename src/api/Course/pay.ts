import { apiFetch } from "@/api";

export const payCourse = async (courseId: number) => {
  const data = await apiFetch("/createPaymentHandler", {
    method: "POST",
    body: JSON.stringify({
      return_url: `${window.location.origin}/course/${courseId}`,
      course_id: courseId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data ? data.continue_url : "Ошибка при оплате курса";
};
