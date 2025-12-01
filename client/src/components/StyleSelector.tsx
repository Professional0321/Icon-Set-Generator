import React from "react";

const STYLES: { key: string; label: string }[] = [
  { key: "pastel", label: "Pastels" },
  { key: "bubbles", label: "Bubbles" },
  { key: "outline", label: "Outlined" },
  { key: "gradient", label: "Gradient Futuristic" },
  { key: "clay", label: "Clay 3D" }
];

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const StyleSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="form-row">
      <label>Style</label>
      <div className="chip-row">
        {STYLES.map((style) => (
          <button
            key={style.key}
            type="button"
            className={`chip ${value === style.key ? "active" : ""}`}
            onClick={() => onChange(style.key)}
          >
            {style.label}
          </button>
        ))}
      </div>
    </div>
  );
};
    