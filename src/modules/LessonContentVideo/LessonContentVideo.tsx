import { getLessons, getNextLessons, notCompleted } from "@/api";
import { useCourseOpen } from "@/App";
import { LessonsStructure } from "@/types/lesson";
import VideoPlayer from "@/modules/VideoPlayer";
import PageButton from "@/ui/PageButton";

export default function LessonContentVideo({
  setVideo,
  video,
}: {
  setVideo: (argv0: LessonsStructure) => void;
  video: LessonsStructure;
}) {
  const body_lesson = video.lesson.lesson_body;
  const pagesPrev = body_lesson.footer.previous_lesson_id;
  const pagesNext = body_lesson.footer.next_lesson_id;
  return (
    <div class="lesson--content">
      <VideoPlayer
        video={video.lesson.lesson_body.blocks[0].body}
        key="VideoPlayer"
      />
      <div class="lesson--pages">
        <PageButton
          key={"previous_lesson" + pagesPrev.toString()}
          page_id={pagesPrev}
          type="Предыдущая"
          onClick={() => {
            const courseId = useCourseOpen().id;
            if (courseId === undefined) {
              console.error("Course не определён");
              return;
            }
            getNextLessons(courseId, pagesPrev).then((result) => {
              setVideo(result);
            });
          }}
        />
        <button
          class="page--check"
          ON_click={() => {
            const id = useCourseOpen().id;
            if (id === undefined) {
              console.error("Ошибка");
              return;
            }
            notCompleted(body_lesson.footer.current_lesson_id);
            getLessons(id).then((result) => {
              if (result === undefined) {
                console.error("Course не определён");
                return;
              }
              setVideo(result);
            });
          }}
        >
          Отметить непройденным
        </button>
        <PageButton
          key={"lesson_page" + pagesNext.toString()}
          page_id={pagesNext}
          type="Следующая"
          onClick={() => {
            const courseId = useCourseOpen().id;
            if (courseId === undefined) {
              console.error("Course не определён");
              return;
            }
            getNextLessons(courseId, pagesNext).then((result) => {
              setVideo(result);
            });
          }}
        />
      </div>
    </div>
  );
}
