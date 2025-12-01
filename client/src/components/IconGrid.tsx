import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface Props {
  images: string[];
}

export const IconGrid: React.FC<Props> = ({ images }) => {
  if (!images || images.length === 0) return null;

  async function downloadAll() {
    const zip = new JSZip();
    const folder = zip.folder("icons");

    if (!folder) return;

    await Promise.all(
      images.map(async (url, index) => {
        if (!url) return;
        const response = await fetch(url);
        const blob = await response.blob();
        folder.file(`icon_${index + 1}.png`, blob);
      })
    );

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "icons.zip");
  }

  return (
    <>
      <div className="button-row">
        <button type="button" className="button secondary" onClick={downloadAll}>
          Download all as ZIP
        </button>
      </div>
      <div className="grid">
        {images.map((url, index) => (
          <div key={index} className="icon-card">
            <img src={url} alt={`Generated icon ${index + 1}`} />
            <div className="icon-card-footer">
              <span className="icon-index">Icon {index + 1}</span>
              {url && (
                <a
                  className="download-link"
                  href={url}
                  download={`icon_${index + 1}.png`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
