import { useState } from "@/ourReact/jsx-runtime";
import ProfileContent from "./ProfileContent"; // Ensure ProfileContent is a default export and a valid React component
import ProfileHeader, { Section } from "./ProfileHeader";
import { activeTab, setActiveTab } from "@/stores";

const Profile = () => {
  const [activeSection, setActiveSection] = useState<Section>("profile");

  const tab = activeTab();

  console.log("render Profile");

  return (
    <div>
      <ProfileHeader
        activeSection={tab as Section}
        setActiveSection={setActiveTab as (section: Section) => void}
        key="headerProfile"
      />
      <ProfileContent activeSection={tab as Section} key="contentProfile" />
    </div>
  );
};

export default Profile;
