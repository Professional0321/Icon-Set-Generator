import React, { useState } from "react";
import "./styles.css";
import { PromptForm } from "./components/PromptForm";
import { StyleSelector } from "./components/StyleSelector";
import { ColorInputs } from "./components/ColorInputs";
import { IconGrid } from "./components/IconGrid";
import { generateIcons } from "./api";

function App() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("pastel");
  const [colors, setColors] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!prompt.trim()) {
      setError("Please enter a prompt first.");
      return;
    }
    setError(null);
    setLoading(true);
    setImages([]);

    try {
      const cleanColors = colors
        .map((c) => c.trim())
        .filter((c) => c.length > 0 && c.startsWith("#"));

      const data = await generateIcons({
        prompt: prompt.trim(),
        style,
        colors: cleanColors,
      });

      setImages(data.images || []);
    } catch (e: any) {
      console.error(e);
      setError("Failed to generate icons. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setPrompt("");
    setStyle("pastel");
    setColors([]);
    setImages([]);
    setError(null);
  }

  return (
    <div className="app">
      <div className="card">
        <h1 className="app-title">Icon Set Generator</h1>
        <div className="section">
          <PromptForm prompt={prompt} onChange={setPrompt} />
        </div>
        <div className="section">
          <StyleSelector value={style} onChange={setStyle} />
        </div>
        <div className="section">
          <ColorInputs colors={colors} onChange={setColors} />
        </div>

        <div className="button-row button-end">
          <button
            type="button"
            className="button"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating…" : "Generate Icons"}
          </button>
          <button
            type="button"
            className="button secondary"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="section">
          <IconGrid images={images} />
        </div>
      </div>
    </div>
  );
}

export default App;
