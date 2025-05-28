import { setCourseOpen, setLessonID, useCourseOpen, useUser } from "@/stores";
import starIcon from "Public/static/icons/star.svg";
import timeIcon from "Public/static/icons/time.svg";
import userIcon from "Public/static/icons/user.svg";
import addCourseIcon from "Public/static/icons/addCourse.svg";
import descIcon from "Public/static/icons/descriptionCourse.svg";
import contentIcon from "Public/static/icons/contentCourse.svg";
import closeIcon from "Public/static/icons/closeCourse.svg";
import loadingIcon from "Public/static/icons/loading.gif";
import ratingIcon from "Public/static/icons/ratingTab.svg";
import sertificateIcon from "Public/static/icons/sertificateTab.svg";
import { router } from "@/router";
import styles from "./CourseMenu.module.scss";
import { useDevice } from "@/devise";
import { payCourse } from "@/api/Course/pay";
import addToast from "@/components/WindowALert/logic/add";
import { getCourse } from "@/api";
import { useState } from "@/ourReact/jsx-runtime";
import { UserProfile } from "@/types/users";

const CourseMenuHeader = ({ useFunc }: { useFunc: string }) => {
  const user = useUser();
  const [prevUser, setPrevUser] = useState<UserProfile>(user);

  if (prevUser !== user) {
    const courseId = useCourseOpen().id;
    if (courseId === undefined) {
      console.error("Ошибка: ID курса не определен");
      return <div class="dont-content">Ошибка: ID курса не определен</div>;
    }
    getCourse(courseId).then((data) => {
      console.log("Данные курса обновлены", data);
      setCourseOpen(data);
      setPrevUser(user);
    });
  }
  const isMobile = useDevice().isMobile;
  const data = useCourseOpen();
  const sections = [
    {
      type: "description",
      name: "Описание",
      image: descIcon,
      click: () => {
        const id = useCourseOpen().id;
        if (id !== undefined) {
          router.goToPath(`/course/${id}/${sections[0].type}`);
        }
      },
    },
    {
      type: "content",
      name: "Содержание",
      image: contentIcon,
      click: () => {
        const id = useCourseOpen().id;
        if (id !== undefined) {
          router.goToPath(`/course/${id}/${sections[1].type}`);
        }
      },
    },
    // {
    //   type: "review",
    //   name: "Отзывы",
    //   image: reviewIcon,
    //   click: () => {
    //     const id = useCourseOpen().id;
    //     if (id !== undefined) {
    //       router.goToPath(`/course/${id}/${sections[2].type}`);
    //     }
    //   },
    // },
    {
      type: "rating",
      name: "Рейтинг",
      image: ratingIcon,
      click: () => {
        const id = useCourseOpen().id;
        if (id !== undefined) {
          router.goToPath(`/course/${id}/${sections[2].type}`);
        }
      },
    },
    {
      type: "end",
      name: "Завершение",
      image: sertificateIcon,
      click: () => {
        const id = useCourseOpen().id;
        if (id !== undefined) {
          router.goToPath(`/course/${id}/${sections[3].type}`);
        }
      },
    },
  ];
  if (Object.keys(data).length === 0) {
    return (
      <div class="dont-content">
        <img src={loadingIcon} />
      </div>
    );
  }

  const courseAndPrice = (
    <div class={styles.coursePriceAndButton}>
      <div
        class={`${styles.coursePriceAndButton__price} ${
          data.price === 0 ? styles.colorFree : ""
        }`}
      >
        {data.price === 0 ? "Бесплатно" : `${data.price?.toString()} ₽`}
      </div>
      {!data.is_purchased && data.price === 0 ? (
        <div
          class={styles.coursePriceAndButton__button}
          ON_click={() => {
            console.log("Записаться");
            const id = data.id;
            if (id === undefined) {
              console.error("Ошибка");
              return;
            }
            if (!user) {
              addToast("error", "Пользователь не авторизован");
              console.error("Пользователь не авторизован");
              return;
            }
            setLessonID(false);
            router.goToPath(`/course/${useCourseOpen().id}/lessons`);
          }}
        >
          <img class={styles.button__icon} src={addCourseIcon} />
          {user ? "Записаться на курс" : "Войти для записи"}
        </div>
      ) : !(data.is_purchased || data.is_completed) && data.price !== 0 ? (
        <div
          class={styles.coursePriceAndButton__buttonPay}
          ON_click={() => {
            console.log("Купить");
            const id = data.id;
            if (id === undefined) {
              console.error("Ошибка");
              return;
            }
            if (!user) {
              addToast("error", "Пользователь не авторизован");
              console.error("Пользователь не авторизован");
              return;
            }
            setLessonID(false);
            payCourse(id).then((data) => {
              console.log("Покупка успешно завершена");
              window.location.href = data;
            });
          }}
        >
          <img class={styles.button__icon} src={addCourseIcon} />
          {user ? "Купить курс" : "Войти для покупки"}
        </div>
      ) : (
        <div
          class={styles.coursePriceAndButton__button}
          ON_click={() => {
            console.log("Записаться");
            const id = data.id;
            if (id === undefined) {
              console.error("Ошибка");
              return;
            }
            setLessonID(false);
            router.goToPath(`/course/${useCourseOpen().id}/lessons`);
          }}
        >
          Продолжить
        </div>
      )}
    </div>
  );

  return (
    <header class={styles.courseHeader}>
      <div class={styles.closePage}></div>
      <div class={styles.headerContent}>
        <div class={styles.headerInfo}>
          <div>
            <img class={styles.courseImage} src={`${data.src_image}`} alt="" />
          </div>
          <div class={styles.courseText}>
            <div class={styles.courseName}>{data.title}</div>
            <div class={styles.courseDescriptions}>
              <div class={styles.courseDescription}>
                <img class={styles.courseDescription_img} src={starIcon} />
                <div class={styles.courseDescriptionText}>
                  <div class={styles.courseDescriptionText__number}>
                    {(data.rating ?? 0).toFixed(1)}
                  </div>{" "}
                  <div class={styles.courseDescriptionText__text}>рейтинг</div>
                </div>
              </div>
              <div class={styles.courseDescription}>
                <img class={styles.courseDescription_img} src={timeIcon} />
                <div class={styles.courseDescriptionText}>
                  <div class={styles.courseDescriptionText__number}>
                    {data.time_to_pass?.toString()}
                  </div>{" "}
                  <div class={styles.courseDescriptionText__text}>часов</div>
                </div>
              </div>
              <div class={styles.courseDescription}>
                <img class={styles.courseDescription__Img} src={userIcon} />
                <div class={styles.courseDescriptionText}>
                  <div class={styles.courseDescriptionText__number}>
                    {data.purchases_amount?.toString()}
                  </div>{" "}
                  <div class={styles.courseDescriptionText__text}>
                    записались
                  </div>
                </div>
              </div>
            </div>
            <div class={styles.courseTags}>
              {data.tags?.map((tag, index) => (
                <div key={index} class={styles.courseTag}>
                  {tag}
                </div>
              ))}
            </div>
            {isMobile ? "" : courseAndPrice}
          </div>
        </div>
        {isMobile ? courseAndPrice : ""}
        <div class={styles.changes}>
          {sections.map((section) => (
            <div
              ON_click={section.click}
              class={
                `${styles.change}` +
                (useFunc === section.type ? ` ${styles.changeActive}` : "")
              }
            >
              <img class={styles.changesImg} src={section.image} />
              {section.name}
            </div>
          ))}
        </div>
      </div>
      <div
        class={styles.closePage}
        ON_click={() => {
          setCourseOpen({});
          router.goByState("MainMenu");
        }}
      >
        <img style={"cursor: pointer;"} src={closeIcon} />
      </div>
    </header>
  );
};

export default CourseMenuHeader;
