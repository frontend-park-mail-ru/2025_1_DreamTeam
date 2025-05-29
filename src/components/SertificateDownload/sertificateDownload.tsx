import download from "Public/static/icons/download.svg";
import styles from "./sertificateDownload.module.scss";
import { useCourseOpen } from "@/stores";
import { getSertificate } from "@/api/Course/certificate";

const SertificateDownload = () => {
  return (
    <div
      ON_click={() => {
        const courseId = useCourseOpen().id;
        if (courseId === undefined) {
          console.error("Course не определён");
          return;
        }
        getSertificate(courseId).then((result) => {
          if (result === undefined) {
            console.error("Course не определён");
            return;
          }
          console.log(courseId);
          window.location.href = result;
          console.log(result);
          return;
        });
      }}
      class={styles.downloadButton}
    >
      <img src={download}></img>
      Сертификат
    </div>
  );
};

export default SertificateDownload;
