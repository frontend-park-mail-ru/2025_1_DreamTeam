import ProfilePass from "@/modules/Profile/ProfilePass";
import ProfileFavorites from "@/modules/Profile/ProfileFavorites";
import ProfileHistory from "@/modules/Profile/ProfileHistory";
import ProfileCertificates from "@/modules/Profile/ProfileCertificates";
import SettingContent from "@/pages/Settings/SettingsContent";

type Section = "profile" | "pass" | "favorite" | "history" | "certificates";

console.log("render ProfileContent");

const ProfileContent = ({ activeSection }: { activeSection: Section }) => {
  let content;
  switch (activeSection) {
    case "profile":
      content = <SettingContent key="ProfileDescription" />;
      break;
    case "pass":
      content = <ProfilePass key="ProfilePass" />;
      break;
    case "favorite":
      content = <ProfileFavorites key="ProfileFavorites" />;
      break;
    case "history":
      content = <ProfileHistory key="ProfileHistory" />;
      break;
    case "certificates":
      content = <ProfileCertificates key="ProfileCertificates" />;
      break;
    default:
      content = <div>Выберите раздел</div>;
  }
  return <div>{content}</div>;
};

export default ProfileContent;
