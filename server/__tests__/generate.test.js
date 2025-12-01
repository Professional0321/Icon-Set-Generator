const request = require("supertest");
const app = require("../index");

jest.mock("replicate", () => {
  return function MockReplicate() {
    return {
      run: jest.fn().mockResolvedValue(["https://example.com/icon.png"])
    };
  };
});

describe("GET /health", () => {
  it("returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});