const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Replicate = require("replicate");
const { STYLES } = require("./styles");
const AppError = require("./errors/AppError");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

const PORT = process.env.PORT || 5000;

function buildPrompt(userPrompt, stylePreset, variant, colors) {
  const colorInstruction =
    Array.isArray(colors) && colors.length > 0
      ? `Use this color palette prominently: ${colors.join(", ")}.`
      : "";

  return `
${variant} icon related to "${userPrompt}".
Visual style: ${stylePreset.prompt}.
${colorInstruction}
Center the icon, use a clean background, clearly defined silhouette, 512x512, high quality.
No text, no watermark.
`.trim();
}

app.post("/generate", async (req, res) => {
  try {
    const { prompt, style, colors } = req.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const stylePreset = STYLES[style];
    if (!stylePreset) {
      return res.status(400).json({ error: "Invalid style preset" });
    }

    if (colors && !Array.isArray(colors)) {
      return res.status(400).json({ error: "Colors must be an array of hex strings" });
    }

    const variants = [
      "primary hero object",
      "secondary related object",
      "symbolic related object",
      "playful alternate object"
    ];

    const images = [];

    for (const variant of variants) {
      const fullPrompt = buildPrompt(prompt, stylePreset, variant, colors);

      let output;

      try {
        output = await replicate.run("black-forest-labs/flux-schnell", {
          input: {
            prompt: fullPrompt,
            output_format: "png",
            width: 512,
            height: 512
          }
        });
      } catch (err) {
        console.error("Replicate error:", err);
        throw new Error("IMAGE_GENERATION_FAILED");
      }

      if (Array.isArray(output) && output.length > 0) {
        images.push(output[0]);
      } else if (typeof output === "string") {
        images.push(output);
      } else {
        images.push(null);
      }
    }

    return res.json({ images });

  } catch (err) {
    console.error("Error generating icons:", err);

    if (err instanceof Error && err.message === "IMAGE_GENERATION_FAILED") {
      return res
        .status(502)
        .json({ error: "Image generation service failed. Please try again." });
    }

    return res
      .status(500)
      .json({ error: "Failed to generate icons. Please try again." });
  }
});


app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use((err, req, res, next) => {
  console.error("❌ SERVER ERROR:", err);

  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message });
  }

  return res
    .status(500)
    .json({ error: "Internal server error. Please try again later." });
});


module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

