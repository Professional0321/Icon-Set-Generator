import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "./App";
import * as api from "./api";

vi.mock("./api");

describe("App", () => {
  it("shows validation error when generating with empty prompt", async () => {
    render(<App />);

    const button = screen.getByRole("button", { name: /Generate Icons/i });
    fireEvent.click(button);

    const error = await screen.findByText(/Please enter a prompt first/i);
    expect(error).toBeInTheDocument();
  });

  it("calls generateIcons and displays images", async () => {
    const mockGenerate = api as any;
    mockGenerate.generateIcons = vi
      .fn()
      .mockResolvedValue({ images: ["url1", "url2", "url3", "url4"] });

    render(<App />);

    const textarea = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /Generate Icons/i });

    fireEvent.change(textarea, { target: { value: "Toys" } });
    fireEvent.click(button);

    const img = await screen.findByAltText("Generated icon 1");
    expect(img).toBeInTheDocument();
  });
});
