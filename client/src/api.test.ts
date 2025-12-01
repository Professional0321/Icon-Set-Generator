import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import { generateIcons } from "./api";

vi.mock("axios");
const mockedAxios = axios as unknown as {
  post: ReturnType<typeof vi.fn>;
};

describe("generateIcons", () => {
  it("returns data on success", async () => {
    mockedAxios.post = vi.fn().mockResolvedValue({
      data: { images: ["url1", "url2", "url3", "url4"] }
    });

    const result = await generateIcons({
      prompt: "Toys",
      style: "pastel",
      colors: []
    });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.images).toHaveLength(4);
  });

  it("throws a friendly error when server responds with error payload", async () => {
    mockedAxios.post = vi.fn().mockResolvedValue({
      data: { error: "Something went wrong" }
    });

    await expect(
      generateIcons({
        prompt: "Toys",
        style: "pastel",
        colors: []
      })
    ).rejects.toThrow("Something went wrong");
  });

  it("throws a friendly error when server returns non-2xx status", async () => {
    mockedAxios.post = vi.fn().mockRejectedValue({
      response: {
        status: 500,
        data: { error: "Internal error" }
      }
    });

    await expect(
      generateIcons({
        prompt: "Toys",
        style: "pastel",
        colors: []
      })
    ).rejects.toThrow("Internal error");
  });

  it("throws network error when no response is received", async () => {
    mockedAxios.post = vi.fn().mockRejectedValue({
      request: {}
    });

    await expect(
      generateIcons({
        prompt: "Toys",
        style: "pastel",
        colors: []
      })
    ).rejects.toThrow("No response from server");
  });

  it("throws generic error for unexpected issues", async () => {
    mockedAxios.post = vi.fn().mockRejectedValue(new Error("Oops"));

    await expect(
      generateIcons({
        prompt: "Toys",
        style: "pastel",
        colors: []
      })
    ).rejects.toThrow("Oops");
  });
});
