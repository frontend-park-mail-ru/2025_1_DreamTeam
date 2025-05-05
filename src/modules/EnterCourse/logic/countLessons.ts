import { Part } from "@/types/courseMenu";

export default function countLessons(parts: Part[]): number {
  return parts.reduce((lessonCount, part) => {
    return (
      lessonCount +
      part.buckets.reduce((bucketCount, bucket) => {
        return bucketCount + bucket.lessons.length;
      }, 0)
    );
  }, 0);
}
