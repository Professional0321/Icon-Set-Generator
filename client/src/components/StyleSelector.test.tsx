import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { StyleSelector } from "./StyleSelector";

describe("StyleSelector", () => {
  it("renders all style chips and calls onChange when clicked", () => {
    const handleChange = vi.fn();

    render(<StyleSelector value="pastel" onChange={handleChange} />);

    const pastelChip = screen.getByText("Pastels");
    const bubblesChip = screen.getByText("Bubbles");

    expect(pastelChip).toBeInTheDocument();
    expect(bubblesChip).toBeInTheDocument();

    fireEvent.click(bubblesChip);
    expect(handleChange).toHaveBeenCalledWith("bubbles");
  });
});
