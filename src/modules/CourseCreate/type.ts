export type Lesson = {
  lesson_type: string;
  lesson_title: string;
  lesson_value: string;
};

export type Bucket = {
  bucket_title: string;
  lessons: Lesson[];
};

export type Part = {
  part_title: string;
  buckets: Bucket[];
};

export type Course = {
  price: number;
  time_to_pass: number;
  title: string;
  description: string;
  parts: Part[];
};
