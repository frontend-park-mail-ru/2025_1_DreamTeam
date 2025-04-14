import { getLessons, getNextLessons } from "@/api";
import { useCourseOpen, useLessonID } from "@/App";
import { useState } from "@/ourReact/jsx-runtime";
import { LessonsStructure } from "@/types/lesson";
import { LessonHeader } from "./LessonHeader";
import LessonContentText from "@/modules/LessonContentText/LessonContentText";
import LessonContentVideo from "@/modules/LessonContentVideo/LessonContentVideo";

let exam = {
  lesson: {
    header: {
      course_title: "Информационная безопасность",
      part: {
        order: 1,
        title: "Введение",
      },
      bucket: {
        order: 1,
        title: "Первый урок",
      },
      Points: [
        {
          lesson_id: 1,
          type: "video",
          is_done: true,
        },
        {
          lesson_id: 2,
          type: "video",
          is_done: false,
        },
        {
          lesson_id: 3,
          type: "text",
          is_done: true,
        },
      ],
    },
    lesson_body: {
      blocks: [
        {
          body: "<p><strong>Разведка в сети</strong> – это процесс сбора информации об объекте или цели в интернете. Это может быть любая информация, которая может помочь в осуществлении дальнейших действий по отношению к объекту. Например, определение уязвимостей или сбор данных для атаки.</p>\n\n        <p><strong>Сетевой сканер</strong> – это программа, предназначенная для сканирования компьютерных сетей и обнаружения устройств, портов и служб, работающих на этих устройствах. Они используются для проверки безопасности сетей, выявления уязвимостей и проверки соответствия настроек безопасности определенным стандартам.</p>\n\n        <p><strong>Доменное имя</strong> – это уникальное текстовое имя, которое используется для идентификации адреса ресурса в Интернете.</p>\n\n        <p><strong>SSL (Secure Sockets Layer) сертификат</strong> – это цифровой сертификат, который подтверждает подлинность веб-сайта и обеспечивает защищенное соединение между веб-браузером и сервером, на котором расположен веб-сайт. Сертификаты выпускаются специальными доверенными удостоверяющими центрами по всему миру, представляют из себя файлы определенного формата, которые располагаются на серверах, для предоставления их пользователям и проверки легитимности сервисов.</p>",
        },
        {
          body: "<p><strong>Сетевой порт</strong> – это номер, который идентифицирует определенный сетевой протокол и процесс, который использует этот протокол для передачи данных в компьютерных сетях. Когда компьютер или устройство отправляет или получает данные через сеть, он использует определенный порт для связи с другим устройством или сервером по определенному сетевому протоколу. Номер порта представляет собой целое число от 0 до 65535.</p>\n\n        <p>Хост / узел – это устройство или программа, которая может быть связана с другими устройствами или программами в компьютерной сети. Узлы сети могут выполнять различные функции, такие, как передача данных, маршрутизация, хранение информации, обработка запросов и т.д. Каждый узел сети имеет свой уникальный адрес, который позволяет другим узлам обращаться к нему и передавать данные. Примерами узлов сети могут быть компьютеры, маршрутизаторы, сетевые принтеры, серверы, мобильные устройства и т.д.</p>",
        },
      ],
      footer: {
        next_lesson_id: 2,
        current_lesson_id: 1,
        previous_lesson_id: -1,
      },
    },
  },
};

const LessonPage = () =>  {
  const [text, setText] = useState<LessonsStructure>(exam);
  const [isLoading, setLoading] = useState(true);
  if (isLoading) {
    const courseId = useCourseOpen().id;
    if (courseId === undefined) {
      console.error("Ошибка");
      return <div>Ошибка</div>;
    }
    const id = useLessonID();
    if (id === false) {
      getLessons(courseId).then((result) => {
        if (result === undefined) {
          console.error(result);
          return <div>Ошибка</div>;
        }
        setText(result);
        setLoading(false);
      });
    } else {
      getNextLessons(courseId, id).then((result) => {
        if (typeof result === "string") {
          console.error(result);
          return <div>Ошибка</div>;
        }
        setText(result);
        setLoading(false);
      });
    }
  }
  if (isLoading) {
    console.log("loading");
    return <div>Загрузка</div>;
  }
  const currentPoint = text.lesson.header.Points.find(
    (p) => p.lesson_id === text.lesson.lesson_body.footer.current_lesson_id
  );
  if (!currentPoint) {
    return <div>Ошибка: урок не найден</div>;
  }
  const isText = currentPoint.type === "text";
  return (
    <div>
      <LessonHeader
        key="ClassHeader"
        setText={setText}
        text={text}
        header={text.lesson.header}
      />
      {isText ? (
        <LessonContentText key="ClassContent" setText={setText} text={text} />
      ) : (
        <LessonContentVideo
          key="LessonContentVideo"
          setVideo={setText}
          video={text}
        />
      )}
    </div>
  );
}

export default LessonPage;