import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export interface GenerateRequest {
  prompt: string;
  style: string;
  colors: string[];
}

export interface GenerateResponse {
  images: string[];
}

export async function generateIcons(
  data: GenerateRequest
): Promise<GenerateResponse> {
  try {
    const res = await axios.post<GenerateResponse>(
      `${API_BASE_URL}/generate`,
      data,
      { timeout: 25000 } 
    );

    if (res.data && (res.data as any).error) {
      throw new Error((res.data as any).error);
    }

    return res.data;

  } catch (err: any) {
    console.error("❌ API ERROR:", err);

    if (err.response) {
      const message =
        err.response.data?.error ||
        `Server error (${err.response.status}). Please try again.`;

      throw new Error(message);
    }

    if (err.request) {
      throw new Error("No response from server. Please try again.");
    }

    throw new Error(err.message || "Unexpected error occurred.");
  }
}

