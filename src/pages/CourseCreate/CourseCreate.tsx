import { useState } from "@/ourReact/jsx-runtime";
import CourseCreateChapter from "@/modules/CourseCreate/Chapter/Chapter";

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
  const [countChapters, setCountChapters] = useState(1);
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
    setParts(parts.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    const courseData = {
      price: 0,
      time_to_pass: 30,
      title,
      description,
      parts,
    };
    console.log(JSON.stringify(courseData, null, 2));
  };

  addChapter();
  removeChapter(0);
  updatePart(0, {
    part_title: "Updated Part Title",
    buckets: [
      {
        bucket_title: "Updated Bucket Title",
        lessons: [
          {
            lesson_type: "text",
            lesson_title: "Updated Lesson Title",
            lesson_value: "Updated Value",
          },
        ],
      },
    ],
  });

  const incrementChapter = () => {
    setCountChapters(countChapters < 20 ? countChapters + 1 : countChapters);
  };

  const decrementChapter = () => {
    setCountChapters(countChapters > 1 ? countChapters - 1 : countChapters);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Название курса"
          value={title}
          ON_input={(e: any) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Описание курса"
          value={description}
          ON_input={(e: any) => setDescription(e.target.value)}
        />
        <button type="button" ON_click={decrementChapter}>
          -
        </button>
        <span style="margin: 0 8px;">{countChapters.toString()}</span>
        <button type="button" ON_click={incrementChapter}>
          +
        </button>
      </div>
      {parts.map((part, idx) => (
        <CourseCreateChapter
          key={idx}
          part={part}
          onChange={(newPart: any) => updatePart(idx, newPart)}
          onRemove={() => removeChapter(idx)}
        />
      ))}
      <button type="button" ON_click={handleSave}>
        Сохранить
      </button>
    </div>
  );
};

export default CourseCreate;
