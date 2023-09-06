import { test, expect, describe, vi } from "vitest";
import { POST } from "./route";
import { NextRequest } from "next/server";
import { Routes } from "@/routes";

const createRequestObject = (body: Record<string, unknown>) => {
  const nodejsReq = new Request(Routes.api.moodLog, {
    method: "POST",
    body: JSON.stringify(body),
  });

  const nextjsReq = new NextRequest(nodejsReq);
  return nextjsReq;
};

const mockGetUser = vi.hoisted(vi.fn);
vi.mock("@supabase/auth-helpers-nextjs", () => ({
  createRouteHandlerClient: vi.fn().mockReturnValue({
    auth: { getUser: mockGetUser },
    from: vi.fn().mockReturnValue({ insert: vi.fn() }),
  }),
}));

describe("Add mood log", () => {
  test("empty value for mood is not allowed", async () => {
    const response = await POST(createRequestObject({}));
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body).toMatchObject({ issues: { mood: "Required" } });
  });

  test("valid mood is required", async () => {
    const response = await POST(createRequestObject({ mood: "invalid-value" }));
    const body = await response.json();
    expect(body.issues).toMatchObject({ mood: /invalid enum value/i });
  });

  test("note field is within limit", async () => {
    const response = await POST(
      createRequestObject({
        mood: "neutral",
        note: `very very very long note that has multiple lines and is over 200 characters.
               very very very long note that has multiple lines and is over 200 characters.
               very very very long note that has multiple lines and is over 200 characters.`,
      })
    );
    const body = await response.json();
    expect(body.issues).toMatchObject({
      note: /must be less than 200 characters/i,
    });
  });

  test("requires authentication", async () => {
    mockGetUser.mockReturnValueOnce({ data: {} });
    const response = await POST(
      createRequestObject({ mood: "neutral", note: "a short note" })
    );
    expect(response.status).toBe(401);
  });

  test("saves valid logs to dab", async () => {
    mockGetUser.mockReturnValueOnce({ data: { user: {} } });
    const response = await POST(
      createRequestObject({ mood: "neutral", note: "a short note" })
    );
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.ok).toBe(true);
  });
});
