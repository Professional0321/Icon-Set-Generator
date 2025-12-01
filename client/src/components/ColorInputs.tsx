import React from "react";

interface Props {
  colors: string[];
  onChange: (colors: string[]) => void;
}

export const ColorInputs: React.FC<Props> = ({ colors, onChange }) => {
  function updateColor(index: number, newValue: string) {
    const updated = [...colors];
    updated[index] = newValue;
    onChange(updated);
  }

  function addColor() {
    if (colors.length >= 4) return;
    onChange([...colors, "#"]);
  }

  function removeColor(index: number) {
    const updated = colors.filter((_, i) => i !== index);
    onChange(updated);
  }

  return (
    <div className="form-row">
      <label>Brand Colors (optional)</label>
      <div className="colors-row">
        {colors.map((c, idx) => (
          <div key={idx} className="color-input">
            <input
              type="color"
              value={c && c.startsWith("#") && c.length === 7 ? c : "#ffffff"}
              onChange={(e) => updateColor(idx, e.target.value)}
            />
            <input
              type="text"
              placeholder="#HEX"
              value={c}
              onChange={(e) => updateColor(idx, e.target.value)}
            />
            <button
              type="button"
              className="button secondary"
              style={{ padding: "4px 8px", fontSize: 11 }}
              onClick={() => removeColor(idx)}
            >
              ✕
            </button>
          </div>
        ))}
        {colors.length < 4 && (
          <button
            type="button"
            className="button secondary"
            style={{ padding: "6px 10px", fontSize: 12 }}
            onClick={addColor}
          >
            + Add color
          </button>
        )}
      </div>
    </div>
  );
};
