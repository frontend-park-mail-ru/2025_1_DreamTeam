import styles from "./Step.module.scss";
import InputAreaText from "@/ui/InputAreaText";
import InputText from "@/ui/InputText";

interface StepProps {
  lesson_title: string;
  lesson_value: string;
  onChangeTitle: (value: string) => void;
  onChangeValue: (value: string) => void;
  onRemoveStep?: () => void;
  idxLesson: number;
}

const CourseCreateStep = ({
  lesson_title,
  lesson_value,
  onChangeTitle,
  onChangeValue,
  onRemoveStep,
  idxLesson,
}: StepProps) => {
  return (
    <div class={styles.step} style="position: relative;">
      {onRemoveStep && (
        <button
          type="button"
          ON_click={onRemoveStep}
          style="position: absolute; top: 0; right: 0; background: none; border: none; font-size: 18px; cursor: pointer;"
          title="Удалить шаг"
        >
          ×
        </button>
      )}
      <InputText
        key={"lessonTitle" + idxLesson}
        placeholder="Название шага"
        value={lesson_title}
        onInput={(e: any) => onChangeTitle(e.target.value)}
      />
      <InputAreaText
        key={"lessonValue" + idxLesson}
        placeholder="Текст шага"
        value={lesson_value}
        onInput={(e: any) => onChangeValue(e.target.value)}
      />
    </div>
  );
};

export default CourseCreateStep;
