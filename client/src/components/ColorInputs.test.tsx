import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ColorInputs } from "./ColorInputs";

describe("ColorInputs", () => {
  it("calls onChange when color text changes", () => {
    const handleChange = vi.fn();
    render(<ColorInputs colors={["#ffffff"]} onChange={handleChange} />);

    const input = screen.getByPlaceholderText("#HEX");
    fireEvent.change(input, { target: { value: "#ff0000" } });

    expect(handleChange).toHaveBeenCalledWith(["#ff0000"]);
  });

  it("adds a new color input when clicking + Add color", () => {
    const handleChange = vi.fn();
    render(<ColorInputs colors={[]} onChange={handleChange} />);

    const addButton = screen.getByText("+ Add color");
    fireEvent.click(addButton);

    expect(handleChange).toHaveBeenCalled();
  });
});
