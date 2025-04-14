import SettingContent from "./SettingsContent";
import SettingsHeader from "./SettingsHeader";

export default function Settings() {
  return (
    <div>
      <SettingsHeader key="SettingsHeader" />
      <SettingContent key="SettingsContent" />
    </div>
  );
}
