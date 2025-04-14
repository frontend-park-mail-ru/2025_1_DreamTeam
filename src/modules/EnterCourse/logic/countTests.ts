import { Part } from "@/types/courseMenu";

export default function countTests(parts: Part[]): number {
  return parts.reduce((testCount, part) => {
    return (
      testCount +
      part.buckets.reduce((bucketCount, bucket) => {
        return (
          bucketCount +
          bucket.lessons.filter((lesson) => lesson.lesson_type === "test")
            .length
        );
      }, 0)
    );
  }, 0);
}
