import { AULA_CONFIG, isConfigured } from "./config.js";

const STORAGE_KEY = "bj_aula_session_v1";
const REQUEST_TIMEOUT_MS = 15_000;

const makeHeaders = (token) => ({
  apikey: AULA_CONFIG.supabaseAnonKey,
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  "Content-Type": "application/json",
});

async function request(path, options = {}) {
  if (!isConfigured()) {
    throw new Error("AULA_NOT_CONFIGURED");
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT_MS
  );

  let response;
  try {
    response = await fetch(
      `${AULA_CONFIG.supabaseUrl}${path}`,
      { ...options, signal: controller.signal }
    );
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error("AULA_REQUEST_TIMEOUT");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }

  const payload =
    response.status === 204
      ? null
      : await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      payload?.msg ||
      payload?.message ||
      payload?.error_description ||
      payload?.error ||
      "SUPABASE_REQUEST_FAILED"
    );

    error.status = response.status;
    error.payload = payload;

    throw error;
  }

  return payload;
}

export function getStoredSession() {
  try {
    return JSON.parse(
      sessionStorage.getItem(STORAGE_KEY) || "null"
    );
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function clearStoredSession() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export async function signIn(email, password) {
  const data = await request(
    "/auth/v1/token?grant_type=password",
    {
      method: "POST",
      headers: makeHeaders(),
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );

  return data;
}

export async function refreshSession(session) {
  if (!session?.refresh_token) {
    throw new Error("NO_SESSION");
  }

  const data = await request(
    "/auth/v1/token?grant_type=refresh_token",
    {
      method: "POST",
      headers: makeHeaders(),
      body: JSON.stringify({
        refresh_token: session.refresh_token,
      }),
    }
  );

  sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );

  return data;
}

export async function validSession() {
  let session = getStoredSession();

  if (!session?.access_token) {
    return null;
  }

  const expiresAt =
    Number(session.expires_at || 0) * 1000;

  if (
    expiresAt &&
    expiresAt < Date.now() + 60_000
  ) {
    try {
      session = await refreshSession(session);
    } catch {
      clearStoredSession();
      return null;
    }
  }

  return session;
}

export async function signOut() {
  const session = getStoredSession();

  try {
    if (session?.access_token) {
      await request(
        "/auth/v1/logout",
        {
          method: "POST",
          headers: makeHeaders(
            session.access_token
          ),
        }
      );
    }
  } finally {
    clearStoredSession();
  }
}

export async function select(
  path,
  accessToken
) {
  if (!accessToken) {
    throw new Error("NO_ACCESS_TOKEN");
  }

  return request(
    `/rest/v1/${path}`,
    {
      method: "GET",
      headers: {
        ...makeHeaders(accessToken),
        Accept: "application/json",
      },
    }
  );
}
