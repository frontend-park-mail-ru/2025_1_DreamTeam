import Header from "./Header";
import { MainMenuContent, MainMenuHeader } from "./MainMenuContent";
import { useState } from "./ourReact/jsx-runtime";
import { SettingContent, SettingHeader } from "./Settings";

export default function Render() {
  const [page, setPage] = useState("MainMenu");
  let header;
  let content;
  switch (page) {
    case "MainMenu":
      header = <MainMenuHeader key="MainMenuHeader" />;
      content = <MainMenuContent key="MainMenuContent" />;
      break;
    case "Setting":
      header = <SettingHeader key="SettingHeader" />;
      content = <SettingContent key="SettingContent" />;
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
  return (
    <div>
      <Header key="MainHeader" page={page} setPage={setPage} />
      {header}
      {content}
    </div>
  );
}

export function Ren() {
  return (
    <div>
      <div></div>
      <div></div>
    </div>
  );
}
