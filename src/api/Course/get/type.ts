import { CourseOpen } from "@/types/courseMenu";

type GetCoursesResponse = {
  bucket_courses: Course[];
};

export type CourseOpenResponse = {
  course: CourseOpen;
};

export interface Course {
  id: number;
  price: number;
  purchases_amount: number;
  creator_id: number;
  time_to_pass: number;
  title: string;
  description: string;
  rating: number;
  src_image: string;
  tags: string[];
  is_favorite: boolean;
}

export default GetCoursesResponse;
