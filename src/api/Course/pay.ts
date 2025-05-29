import { apiFetch, fetchCSRFToken } from "@/api";

export const payCourse = async (courseId: number) => {
  const csrfToken = await fetchCSRFToken();
  const data = await apiFetch("/createPaymentHandler", {
    method: "POST",
    body: JSON.stringify({
      return_url: `${window.location.origin}/course/${courseId}`,
      course_id: courseId,
    }),
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
  });
  return data ? data.continue_url : "Ошибка при оплате курса";
};
