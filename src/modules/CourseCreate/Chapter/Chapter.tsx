import CourseCreateLesson from "../Lesson";
import { Bucket, Part } from "../type";
import addToast from "@/components/WindowALert/logic/add";
import styles from "./Chapter.module.scss";
import InputText from "@/ui/InputText";

interface ChapterProps {
  part: Part;
  onChange: (newPart: Part) => void;
  onRemove: () => void;
  idxPart: number;
}

const CourseCreateChapter = ({
  part,
  onChange,
  onRemove,
  idxPart,
}: ChapterProps) => {
  const addBucket = () => {
    if (part.buckets.length >= 20) {
      addToast("error", "Максимальное количество уроков - 20");
      return;
    }
    onChange({
      ...part,
      buckets: [
        ...part.buckets,
        {
          bucket_title: "",
          lessons: [
            { lesson_type: "text", lesson_title: "", lesson_value: "" },
          ],
        },
      ],
    });
  };

  // Удалить букет
  const removeBucket = (bucketIdx: number) => {
    if (part.buckets.length <= 1) {
      addToast("error", "Нельзя удалить последний урок");
      return;
    }
    onChange({
      ...part,
      buckets: part.buckets.filter((_, i) => i !== bucketIdx),
    });
  };

  // Обновить букет
  const updateBucket = (bucketIdx: number, newBucket: Bucket) => {
    onChange({
      ...part,
      buckets: part.buckets.map((b, i) => (i === bucketIdx ? newBucket : b)),
    });
  };

  return (
    <div class={styles.chapter}>
      <button
        type="button"
        ON_click={onRemove}
        style="position: absolute; top: 8px; right: 8px; background: none; border: none; font-size: 20px; cursor: pointer;"
        title="Удалить главу"
      >
        ×
      </button>
      <InputText
        key={"chapterTitle" + idxPart}
        type="text"
        placeholder={"Название главы"}
        value={part.part_title}
        onInput={(e: any) => {
          onChange({ ...part, part_title: e.target.value });
        }}
        style="margin-bottom: 8px;"
      />
      <div class={styles.counter}>
        <span>Количество уроков</span>
        <button type="button" ON_click={addBucket}>
          Добавить урок
        </button>
        <span>{part.buckets.length.toString()}</span>
      </div>
      {part.buckets.map((bucket, idx) => (
        <CourseCreateLesson
          key={"chapterCreate" + idx}
          bucket={bucket}
          idxBucket={idx}
          onChange={(newBucket: any) => updateBucket(idx, newBucket)}
          onRemove={() => removeBucket(idx)}
        />
      ))}
    </div>
  );
};

export default CourseCreateChapter;
