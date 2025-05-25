import { useState } from "@/ourReact/jsx-runtime";
import styles from "./ImageCropper.module.scss";

interface ImageCropperProps {
  file: File;
  onClose: () => void;
  onSave: (blob: Blob) => void;
}

export default function ImageCropper({
  file,
  onClose,
  onSave,
}: ImageCropperProps) {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [prevFile, setPrevFile] = useState<File | null>(null);

  // Новое состояние для dragging и start
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  // Реакция на смену файла
  if (file !== prevFile) {
    if (imageURL) URL.revokeObjectURL(imageURL);
    const url = URL.createObjectURL(file);
    setImageURL(url);
    setOffset({ x: 0, y: 0 });
    setPrevFile(file);
  }

  const startDragging = (e: MouseEvent) => {
    setDragging(true);
    setStart({ x: e.clientX, y: e.clientY });
    document.onmousemove = onDrag;
    document.onmouseup = stopDragging;
  };

  const onDrag = (e: MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    setOffset({ x: offset.x + dx, y: offset.y + dy });
    setStart({ x: e.clientX, y: e.clientY });
  };

  const stopDragging = () => {
    setDragging(false);
    document.onmousemove = null;
    document.onmouseup = null;
  };

  const confirmCrop = async () => {
    const img = new Image();
    img.src = imageURL!;
    await img.decode();

    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Обратный сдвиг — мы хотим, чтобы эта часть оказалась в центре канваса
    ctx.drawImage(img, offset.x, offset.y);

    canvas.toBlob((blob) => {
      if (blob) onSave(blob);
    }, "image/png");
  };

  return (
    <div class={styles.modal}>
      <div class={styles.frame}>
        {imageURL ? (
          <div
            class={styles.image}
            style={`
              background-image: url(${imageURL});
              background-size: cover;
              background-position: top left;
              width: 500px;
              height: 500px;
              transform: translate(${offset.x}px, ${offset.y}px);
              position: absolute;
              top: 0;
              left: 0;
              cursor: grab;
              user-select: none;
            `}
            ON_mousedown={startDragging}
            ON_dragstart={(e: DragEvent) => e.preventDefault()}
          />
        ) : (
          ""
        )}
      </div>
      <div class={styles.controls}>
        <button ON_click={confirmCrop}>Сохранить</button>
        <button ON_click={onClose}>Отмена</button>
      </div>
    </div>
  );
}
