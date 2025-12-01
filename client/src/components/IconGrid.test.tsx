import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { IconGrid } from "./IconGrid";

describe("IconGrid", () => {
  it("renders nothing when no images", () => {
    const { container } = render(<IconGrid images={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders images and download links when images are provided", () => {
    const images = ["https://example.com/1.png", "https://example.com/2.png"];

    render(<IconGrid images={images} />);

    const img1 = screen.getByAltText("Generated icon 1");
    const img2 = screen.getByAltText("Generated icon 2");
    const zipButton = screen.getByText(/Download all as ZIP/i);

    expect(img1).toBeInTheDocument();
    expect(img2).toBeInTheDocument();
    expect(zipButton).toBeInTheDocument();
  });
});
