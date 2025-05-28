import { Part } from "@/types/courseMenu";

/**
 * Возвращает максимальный балл за курс и балл для сертификата с отличием (85% от максимального)
 * Баллы: question = 5, quiz = 5, text = 1, video = 1
 */
export function maxPoint(parts: Part[]): {
  maxPoints: number;
  distinctionPoints: number;
} {
  let maxPoints = 0;

  for (const part of parts) {
    for (const bucket of part.buckets) {
      for (const lesson of bucket.lessons) {
        if (
          lesson.lesson_type === "question" ||
          lesson.lesson_type === "quiz"
        ) {
          maxPoints += 5;
        } else if (
          lesson.lesson_type === "text" ||
          lesson.lesson_type === "video"
        ) {
          maxPoints += 1;
        }
      }
    }
  }

  const distinctionPoints = Math.ceil(maxPoints * 0.85);

  return { maxPoints, distinctionPoints };
}
