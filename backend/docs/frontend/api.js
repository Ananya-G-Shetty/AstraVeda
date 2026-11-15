// API client for the "Abandoned But Not Forgotten" backend.
// Copy this file to src/services/api.js in the frontend.
//
// Every function returns { ok, status, data } and NEVER throws, so the app
// can keep working from localStorage when the server is down or asleep.
// The server decides XP, ranks and badges: show what it returns.

const BASE_URL =
  (import.meta.env && import.meta.env.VITE_API_URL) || 'http://127.0.0.1:5000/api/v1';
const TOKEN_KEY = 'abnf_token';
const TIMEOUT_MS = 15000; // free hosts can be slow to wake up

export function getToken() {
  try { return localStorage.getItem(TOKEN_KEY); } catch (e) { return null; }
}
function setToken(token) {
  try { localStorage.setItem(TOKEN_KEY, token); } catch (e) { /* ignore */ }
}
export function clearToken() {
  try { localStorage.removeItem(TOKEN_KEY); } catch (e) { /* ignore */ }
}

async function request(method, path, body, useToken = true) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const headers = {};
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    const token = getToken();
    if (useToken && token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });
    let data = null;
    if (res.status !== 204) {
      try { data = await res.json(); } catch (e) { data = null; }
    }
    return { ok: res.ok, status: res.status, data };
  } catch (e) {
    return { ok: false, status: 0, data: null }; // network error or timeout
  } finally {
    clearTimeout(timer);
  }
}

// Make sure we have a token (creates a guest session if not).
export async function ensureSession() {
  if (getToken()) return true;
  const res = await request('POST', '/sessions', undefined, false);
  if (res.ok && res.data && res.data.token) {
    setToken(res.data.token);
    return true;
  }
  return false;
}

// Authenticated call: starts a guest session if needed, retries once on 401.
async function authed(method, path, body) {
  if (!(await ensureSession())) return { ok: false, status: 0, data: null };
  let res = await request(method, path, body);
  if (res.status === 401) {
    clearToken();
    if (await ensureSession()) res = await request(method, path, body);
  }
  return res;
}

// ---- Progress and games ----
export const getProgress = () => authed('GET', '/progress');
export const recordDiscovery = (objectId) =>
  authed('POST', '/progress', { type: 'discovery', objectId });
export const recordStory = (objectId) =>
  authed('POST', '/progress', { type: 'story', objectId });
export const submitGame = (gameId, score = 0) =>
  authed('POST', `/games/${gameId}/submit`, { score });
export const getGames = () => request('GET', '/games', undefined, false);

// ---- Accounts ----
// Sends the current guest token too, so guest progress moves to the new account.
export async function register({ username, password, gradeBand, country, parentEmail }) {
  const res = await request('POST', '/auth/register', {
    username, password, gradeBand, country, parentEmail,
  });
  if (res.ok && res.data && res.data.token) setToken(res.data.token);
  return res;
}

export async function login(username, password) {
  const res = await request('POST', '/auth/login', { username, password }, false);
  if (res.ok && res.data && res.data.token) setToken(res.data.token);
  return res;
}

export const getMe = () => authed('GET', '/auth/me');

export async function logout() {
  await request('POST', '/auth/logout');
  clearToken();
}