import { useState } from "@/ourReact/jsx-runtime";
import ProfileContent from "./ProfileContent"; // Ensure ProfileContent is a default export and a valid React component
import ProfileHeader, { Section } from "./ProfileHeader";

const Profile = () => {
  const [activeSection, setActiveSection] = useState<Section>("profile");

  console.log("render Profile");

  return (
    <div>
      <ProfileHeader
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        key="headerProfile"
      />
      <ProfileContent activeSection={activeSection} key="contentProfile" />
    </div>
  );
};

export default Profile;
