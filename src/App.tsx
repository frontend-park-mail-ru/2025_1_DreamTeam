import { useState } from "./ourReact/jsx-runtime";

function A({ array }: { array: string[]}) {
  const [counter, setCounter] = useState(0);
  return (
    <div
      style="color: yellow"
      ON_click={() => {
        setCounter(counter + 1);
      }}
    >
      FRONTEND НЕ ГОВНО
      <div
        style="color: gray"
        ON_click={() => {
          console.log("click");
        }}
      >
        {array.join("\n")}
      </div>
    </div>
  );
}

export function Test() {
  const [array, setArray] = useState<string[]>([]);
  return (
    <h1
      ON_click={() => {
        array.push("TestElement");
        setArray(array);
      }}
      style="color: violet"
    >
      <div>ИЛЬЯ ЛОХ</div>
      <h2>САНЯ ЛОХ</h2>
      <A key="1234" array={array}></A>
    </h1>
  );
}
