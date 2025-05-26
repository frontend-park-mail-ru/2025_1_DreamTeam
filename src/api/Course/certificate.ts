import { apiFetch } from "@/api";

export const generateSertificate = async (courseId: number) => {
        const data = await apiFetch(
          `/generateSertificate?courseId=${courseId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        return data ? data : "Ошибка запроса";
      }
