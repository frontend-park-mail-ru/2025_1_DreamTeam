export type Lesson = {
  lesson_id: number;
  lesson_title: string;
  lesson_type: string;
  is_done: boolean;
};

export type Bucket = {
  bucket_id: number;
  bucket_title: string;
  lessons: Lesson[];
};

export type Part = {
  part_id: number;
  part_title: string;
  buckets: Bucket[];
};

export type CourseStructure = {
  parts: Part[];
};

export interface CourseOpen {
  title?: string;
  description?: string;
  id?: number;
  price?: number;
  rating?: number;
  src_image?: string;
  tags?: string[];
  purchases_amount?: number;
  time_to_pass?: number;
  is_purchased?: boolean;
}
