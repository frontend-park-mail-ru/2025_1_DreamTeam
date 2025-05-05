import { useToast } from "@/stores";
import WindowALert from "@/components/WindowALert/WindowALert";
import removeToast from "@/components/WindowALert/logic/remove";
import styles from "./ToastContainer.module.scss";

const ToastContainer = () => {
  const { data } = useToast();

  return (
    <div class={styles.alertAdmit}>
      {data.map((notify, ind) => (
        <WindowALert
          key={`windowAlert-${ind}`}
          type={notify.type}
          message={notify.message}
          disappear={notify.disappear}
          onClose={() => removeToast(notify.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
