export type Blocks = {
  body: string;
};

export type Footer = {
  next_lesson_id: number;
  current_lesson_id: number;
  previous_lesson_id: number;
};

export type LessonBody = {
  blocks: Blocks[];
  footer: Footer;
};

export type Points = {
  lesson_id: number;
  type: string;
  is_done: boolean;
};

export type Bucket = {
  order: number;
  title: string;
};

export type Part = {
  order: number;
  title: string;
};

export type Header = {
  course_title: string;
  part: Part;
  bucket: Bucket;
  Points: Points[];
};

export type Lessons = {
  header: Header;
  lesson_body: LessonBody;
};

export type LessonsStructure = {
  lesson: Lessons;
};
