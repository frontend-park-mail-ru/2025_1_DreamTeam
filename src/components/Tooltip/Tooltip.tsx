import "./Tooltip.css";
import error from "Public/static/icons/error.svg";

export const Tooltip = ({
  texts,
  isValid,
}: {
  texts: string[];
  isValid: boolean[];
}) => {
  return (
    <div class="tooltip-container">
      <img class="icon" src={error} />
      <div class="tooltip-content">
        {texts.map((text, i) => (
          <div style={`color: ${isValid[i] ? "#B7B5B7" : "#cc0202"}`}>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};
