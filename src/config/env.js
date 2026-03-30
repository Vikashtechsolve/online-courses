/** Vite exposes only `VITE_*`. HTTPS sites cannot call `http://` APIs (mixed content). */

const strip = (value) => (value ? String(value).replace(/\/$/, "") : "");

function upgradeHttpIfPageIsHttps(url) {
  if (!url || typeof window === "undefined") return url;
  if (window.location.protocol !== "https:") return url;
  return url.replace(/^http:\/\//i, "https://");
}

/**
 * API base including `/api` suffix (matches existing `VITE_API_URL` shape).
 * Default port matches `src/utils/api.js` history.
 */
export function resolveApiBaseUrl() {
  const fallback = "http://localhost:5001/api";
  const base = strip(import.meta.env.VITE_API_URL || fallback);
  return upgradeHttpIfPageIsHttps(base);
}
