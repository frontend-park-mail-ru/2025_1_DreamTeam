import MainMenuContent from "./MainMenuContent";
import MainMenuHeader from "./MainMenuHeader";

export default function MainMenu() {
  return (
    <div>
      <MainMenuHeader key="MainMenuHeader" />
      <MainMenuContent key="MainMenuContent" />
    </div>
  );
}
