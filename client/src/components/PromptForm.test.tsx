import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { PromptForm } from "./PromptForm";

describe("PromptForm", () => {
  it("renders and calls onChange when typing", () => {
    const handleChange = vi.fn();

    render(<PromptForm prompt="" onChange={handleChange} />);

    const textarea = screen.getByPlaceholderText(/Toys/i);
    fireEvent.change(textarea, { target: { value: "Toys" } });

    expect(handleChange).toHaveBeenCalledWith("Toys");
  });
});
