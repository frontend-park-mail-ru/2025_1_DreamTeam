import { useState } from "@/ourReact/jsx-runtime";

interface StepProps {
  lesson_title: string;
  lesson_value: string;
  onChangeTitle: (value: string) => void;
  onChangeValue: (value: string) => void;
}

const CourseCreateStep = ({
  lesson_title,
  lesson_value,
  onChangeTitle,
  onChangeValue,
}: StepProps) => {
  return (
    <div style="margin-left: 32px; margin-bottom: 8px;">
      <input
        type="text"
        placeholder="Название урока"
        value={lesson_title}
        ON_input={(e: any) => onChangeTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Текст урока"
        value={lesson_value}
        ON_input={(e: any) => onChangeValue(e.target.value)}
      />
    </div>
  );
};

export default CourseCreateStep;
