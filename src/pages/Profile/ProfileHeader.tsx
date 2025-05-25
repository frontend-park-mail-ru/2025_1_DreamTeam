import styles from "./Profile.module.scss";
import reviewIcon from "Public/static/icons/addCourse.svg";

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
    { type: "profile", name: "Профиль", image: reviewIcon },
    { type: "history", name: "Обучение", image: reviewIcon },
    { type: "favorite", name: "Избранные", image: reviewIcon },
    { type: "pass", name: "Пройденные", image: reviewIcon },
    { type: "certificates", name: "Сертификаты", image: reviewIcon },
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
            ON_click={() => setActiveSection(section.type as Section)}
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
