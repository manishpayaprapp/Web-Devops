import { BACKEND_URL } from "./config";

interface ApiError {
  message?: string;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  authenticated = true,
): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (authenticated) {
    const token = localStorage.getItem("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;
  try {
    response = await fetch(`${BACKEND_URL}${path}`, { ...options, headers });
  } catch {
    throw new Error("Unable to reach the server. Check that the backend is running.");
  }

  const payload: unknown = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = (payload as ApiError).message;
    throw new Error(message ?? `Request failed (${response.status}).`);
  }

  return payload as T;
}

export interface BrainContent {
  _id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter";
}

export interface ContentResponse {
  content: BrainContent[];
}

export interface SharedBrainResponse {
  username: string;
  content: BrainContent[];
}
