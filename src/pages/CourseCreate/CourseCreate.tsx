import { useState } from "@/ourReact/jsx-runtime";
import CourseCreateChapter from "@/modules/CourseCreate/Chapter/Chapter";
import addToast from "@/components/WindowALert/logic/add";
import styles from "./CourseCreate.module.scss";
import InputText from "@/ui/InputText";
import InputAreaText from "@/ui/InputAreaText";
import { createCourse } from "@/api/Course/create/create";

type Lesson = {
  lesson_type: string;
  lesson_title: string;
  lesson_value: string;
};
type Bucket = { bucket_title: string; lessons: Lesson[] };
type Part = { part_title: string; buckets: Bucket[] };

const CourseCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [time_to_pass, setTimeToPass] = useState(0);
  const [parts, setParts] = useState<Part[]>([
    {
      part_title: "",
      buckets: [
        {
          bucket_title: "",
          lessons: [
            { lesson_type: "text", lesson_title: "", lesson_value: "" },
          ],
        },
      ],
    },
  ]);

  // Функция для обновления части (главы)
  const updatePart = (idx: number, newPart: Part) => {
    setParts(parts.map((p, i) => (i === idx ? newPart : p)));
  };

  // Добавить новую главу
  const addChapter = () => {
    if (parts.length >= 20) {
      addToast("error", "Максимальное количество глав - 20");
      return;
    }
    setParts([
      ...parts,
      {
        part_title: "",
        buckets: [
          {
            bucket_title: "",
            lessons: [
              { lesson_type: "text", lesson_title: "", lesson_value: "" },
            ],
          },
        ],
      },
    ]);
  };

  // Удалить главу
  const removeChapter = (idx: number) => {
    if (parts.length <= 1) {
      addToast("error", "Нельзя удалить последнюю главу");
      return;
    }
    setParts(parts.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    const courseData = {
      price,
      time_to_pass,
      title,
      description,
      parts,
    };
    console.log(JSON.stringify(courseData, null, 2));
    const res = await createCourse(courseData);
    if (!res.ok) {
      addToast("error", `Ошибка при сохранении курса: ${res.error}`);
      return;
    }
    addToast("success", "Курс успешно сохранен");
  };

  return (
    <div class={styles.content}>
      <div class={styles.courseCreate}>
        <div class={styles.header}>
          <InputText
            key={"titleCourse"}
            placeholder="Название курса"
            value={title}
            onInput={(e: any) => setTitle(e.target.value)}
          />
          <InputAreaText
            key={"descriptionCourse"}
            placeholder="Описание курса"
            value={description}
            onInput={(e: any) => setDescription(e.target.value)}
          />
          <InputText
            key={"priceCourse"}
            type="number"
            placeholder="Цена курса"
            value={price.toString()}
            onInput={(e: any) => {
              if (Number(e.target.value) < 0) {
                addToast("error", "Цена не может быть отрицательной");
                setPrice(0);
                return;
              }
              setPrice(Number(e.target.value));
            }}
          />
          <InputText
            key={"timeToPassCourse"}
            type="number"
            placeholder="Время на прохождение курса (в минутах)"
            value={time_to_pass.toString()}
            onInput={(e: any) => {
              if (Number(e.target.value) < 0) {
                addToast("error", "Время не может быть отрицательным");
                setTimeToPass(0);
                return;
              }
              setTimeToPass(Number(e.target.value));
            }}
          />
          <div class={styles.counter}>
            <span>Количество глав</span>
            <button type="button" ON_click={addChapter}>
              Добавить главу
            </button>
            <span style="margin: 0 8px;">{parts.length.toString()}</span>
          </div>
        </div>
        {parts.map((part, idx) => (
          <CourseCreateChapter
            key={"Chapter" + idx}
            idxPart={idx}
            part={part}
            onChange={(newPart: any) => updatePart(idx, newPart)}
            onRemove={() => removeChapter(idx)}
          />
        ))}
        <button type="button" ON_click={handleSave}>
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default CourseCreate;
