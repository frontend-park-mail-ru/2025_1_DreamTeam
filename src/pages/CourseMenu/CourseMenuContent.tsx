import { useCourseOpen } from "@/App";
import { useState } from "@/ourReact/jsx-runtime";
import { getCourseRoadmap } from "@/api";
import Chapter from "@/components/Chapter";
import EnterCourse from "@/modules/EnterCourse";
import countTests from "@/modules/EnterCourse/logic/countTests";
import countLessons from "@/modules/EnterCourse/logic/countLessons";

export const CourseMenuDescription = () => {
  const data = useCourseOpen();
  return (
    <div class="content">
      <div class="text-content" innerHTML={data.description}></div>
    </div>
  );
};

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

export function CourseMenuContent() {
  const [parts, setParts] = useState<CourseStructure>({ parts: [] });
  const [isLoading, setLoading] = useState(true);
  const courseOpen = useCourseOpen();

  if (courseOpen.id === undefined) {
    console.error("ID is undefined");
    return <div class="content">Ошибка: ID не найден</div>;
  }

  if (isLoading) {
    getCourseRoadmap(courseOpen.id).then((data) => {
      console.log("data", data);
      setParts(data);
      console.log("data2", parts);
      setLoading(false);
    });
  }

  console.log("render CourseMenu");
  if (isLoading) {
    // TODO: Потом добавлю вывод более подробный
    return <div class="content">Загрузка</div>;
  }

  return (
    <div class="content">
      <div class="section-content">
        <div></div>
        <div class="content-table">
          {!parts.parts?.length ? (
            <div class="dont-content">Содержание отсутствует</div>
          ) : (
            parts.parts.map((part, index) => {
              const chapterIsDone = part.buckets.every((bucket) =>
                bucket.lessons.every((lesson) => lesson.is_done)
              )
                ? "color_is_done"
                : "color_is_not_done";

              return (
                <div>
                  <Chapter
                    key={`chapter-${part.part_id}`}
                    title={part.part_title}
                    subchapters={part.buckets}
                  />
                  {index !== parts.parts.length - 1 ? (
                    <div class="progress__progress-line_type_medium">
                      <div class={`line ${chapterIsDone}`}></div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })
          )}
        </div>
        {parts.parts?.length ? (
          <EnterCourse
            key="EnterCourse"
            mark={0}
            bestMark={0}
            countTest={countTests(parts.parts)}
            countTimeToPassVideo={0}
            countLesson={countLessons(parts.parts)}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
