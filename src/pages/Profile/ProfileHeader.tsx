import { router } from "@/router";
import styles from "./Profile.module.scss";
import reviewIcon from "Public/static/icons/addCourse.svg";
import favoriteIcon from "Public/static/icons/favoriteTab.svg";
import compTab from "Public/static/icons/compTab.svg";
import profileTab from "Public/static/icons/profileTab.svg";
import pushTab from "Public/static/icons/pushTab.svg";

export type Section =
  | "profile"
  | "pass"
  | "favorite"
  | "history"
  | "certificates";

const ProfileHeader = ({
  activeSection,
  setActiveSection,
}: {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}) => {
  const sections = [
    { type: "profile", name: "Профиль", image: profileTab },
    { type: "history", name: "Обучение", image: compTab },
    { type: "favorite", name: "Избранные", image: favoriteIcon },
    { type: "pass", name: "Пройденные", image: pushTab },
  ];

  console.log("render ProfileHeader");

  return (
    <div class={styles.header}>
      <div class={styles.headlines}>Профиль</div>
      <div class={styles.changes}>
        {sections.map((section) => (
          <div
            key={section.type}
            class={`${styles.change} ${
              activeSection === section.type ? styles.changeActive : ""
            }`}
            ON_click={() => router.goToPath(`/profile/${section.type}`)}
          >
            <img src={section.image} alt={section.name} />
            <span>{section.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileHeader;
