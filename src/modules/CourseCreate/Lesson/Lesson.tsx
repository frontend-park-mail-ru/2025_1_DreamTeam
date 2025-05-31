import InputText from "@/ui/InputText";
import CourseCreateStep from "../Step";
import { Bucket, Lesson } from "../type";
import styles from "./Lesson.module.scss";

interface LessonProps {
  bucket: Bucket;
  onChange: (newBucket: Bucket) => void;
  onRemove: () => void;
  idxBucket: number;
}

const CourseCreateLesson = ({
  bucket,
  onChange,
  onRemove,
  idxBucket,
}: LessonProps) => {
  // Добавить урок
  const addLesson = () => {
    if (bucket.lessons.length >= 20) {
      onRemove();
      return;
    }
    onChange({
      ...bucket,
      lessons: [
        ...bucket.lessons,
        { lesson_type: "text", lesson_title: "", lesson_value: "" },
      ],
    });
  };

  // Удалить урок
  const removeLesson = (lessonIdx: number) => {
    if (bucket.lessons.length <= 1) {
      onRemove();
      return;
    }
    onChange({
      ...bucket,
      lessons: bucket.lessons.filter((_, i) => i !== lessonIdx),
    });
  };

  // Обновить урок
  const updateLesson = (lessonIdx: number, newLesson: Lesson) => {
    onChange({
      ...bucket,
      lessons: bucket.lessons.map((l, i) => (i === lessonIdx ? newLesson : l)),
    });
  };
  return (
    <div class={styles.lesson} style="position: relative;">
      <InputText
        key={"bucketTitle" + idxBucket}
        placeholder="Название урока"
        value={bucket.bucket_title}
        onInput={(e: any) =>
          onChange({ ...bucket, bucket_title: e.target.value })
        }
      />
      <button
        type="button"
        ON_click={onRemove}
        style="position: absolute; top: 8px; right: 8px; background: none; border: none; font-size: 20px; cursor: pointer;"
        title="Удалить букет"
      >
        ×
      </button>
      <div class={styles.counter}>
        <span>Количество шагов</span>
        <button type="button" ON_click={addLesson}>
          Добавить шаг
        </button>
        <span>{bucket.lessons.length.toString()}</span>
      </div>
      {bucket.lessons.map((lesson, idx) => (
        <CourseCreateStep
          key={"lessonsCreate" + idx}
          idxLesson={idx}
          lesson_title={lesson.lesson_title}
          lesson_value={lesson.lesson_value}
          onChangeTitle={(value) =>
            updateLesson(idx, { ...lesson, lesson_title: value })
          }
          onChangeValue={(value) =>
            updateLesson(idx, { ...lesson, lesson_value: value })
          }
          onRemoveStep={() => removeLesson(idx)}
        />
      ))}
    </div>
  );
};

export default CourseCreateLesson;
