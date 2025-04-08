import GoogleIcon from "./components/GoogleIcon";
import { CourseMenuContent, CourseMenuHeader } from "./CourseMenu";
import Navbar from "./Header";
import { MainMenuContent, MainMenuHeader } from "./MainMenuContent";
import { defineStore, useState } from "./ourReact/jsx-runtime";
import { SettingContent, SettingHeader } from "./Settings";
import WindowLogin from "./WindowLogin";
export const [useCourseOpen, setCourseOpen] = defineStore(
  "CourseOpen",
  {} as CourseOpen
);

setCourseOpen({
  description:
    "<h2>На курсе узнаете</h2>\n\n        <p><strong>Разведка в сети</strong> – это процесс сбора информации об объекте или цели в интернете. Это может быть любая информация, которая может помочь в осуществлении дальнейших действий по отношению к объекту. Например, определение уязвимостей или сбор данных для атаки.</p>\n\n        <p><strong>Сетевой сканер</strong> – это программа, предназначенная для сканирования компьютерных сетей и обнаружения устройств, портов и служб, работающих на этих устройствах. Они используются для проверки безопасности сетей, выявления уязвимостей и проверки соответствия настроек безопасности определенным стандартам.</p>\n\n        <p><strong>Доменное имя</strong> – это уникальное текстовое имя, которое используется для идентификации адреса ресурса в Интернете.</p>\n\n        <p><strong>SSL (Secure Sockets Layer) сертификат</strong> – это цифровой сертификат, который подтверждает подлинность веб-сайта и обеспечивает защищенное соединение между веб-браузером и сервером, на котором расположен веб-сайт. Сертификаты выпускаются специальными доверенными удостоверяющими центрами по всему миру, представляют из себя файлы определенного формата, которые располагаются на серверах, для предоставления их пользователям и проверки легитимности сервисов.</p>",
  id: 1,
  price: 0,
  purchases_amount: "0",
  rating: "3.1666667",
  src_image: "path_to_default",
  tags: [
    "Программирование",
    "Безопасность",
    "Cети",
    "Для продвинутых",
    "Лига безопасного интернета",
    "Яндекс",
  ],
  time_to_pass: "144",
  title: "Информационная безопасность",
});

interface CourseOpen {
  title?: string;
  description?: string;
  id?: number;
  price?: number;
  rating?: number;
  src_image?: string;
  tags?: string[];
  purchases_amount?: number;
  time_to_pass?: number;
}

export default function App() {
  let header;
  let content;
  switch (usePage()) {
    case "MainMenu":
      header = <MainMenuHeader key="MainMenuHeader" />;
      content = <MainMenuContent key="MainMenuContent" />;
      break;
    case "Setting":
      header = <SettingHeader key="SettingHeader" />;
      content = <SettingContent key="SettingContent" />;
      break;
    case "CourseMenu":
      header = <CourseMenuHeader key="CourseMenuHeader" />;
      content = <CourseMenuContent key="CourseMenuContent" />;
      break;
    // case "Profile":
    // header = <ProfileHeader key="ProfileHeader" />;
    // content = <ProfileContent key="ProfileContent" />;
    //    break;
    default:
      header = <MainMenuHeader key="MainMenuHeader" />;
      content = <MainMenuContent key="MainMenuContent" />;
      break;
  }
  // return (
  //   <div>
  //     <GoogleIcon key="234" i="search" />
  //     <GoogleIcon key="2324" i="home" />
  //     <GoogleIcon key="232e4" i="menu" />
  //   </div>
  // );
  return (
    <div>
      <Navbar key="MainHeader" />
      {header}
      {content}
    </div>
  );
}
