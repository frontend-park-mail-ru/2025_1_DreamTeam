import { Part } from "@/types/courseMenu";

export default function countVideo(parts: Part[]): number {
  return parts.reduce((testCount, part) => {
    return (
      testCount +
      part.buckets.reduce((bucketCount, bucket) => {
        return (
          bucketCount +
          bucket.lessons.filter((lesson) => lesson.lesson_type === "video")
            .length
        );
      }, 0)
    );
  }, 0);
}
