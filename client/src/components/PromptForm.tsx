import React from "react";

interface Props {
  prompt: string;
  onChange: (value: string) => void;
}

export const PromptForm: React.FC<Props> = ({ prompt, onChange }) => {
  return (
    <div className="form-row">
      <label>Icon</label>
      <textarea
        rows={2}
        placeholder='ex: Toys or Tank '
        value={prompt}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
