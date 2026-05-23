export const AUTH_COOKIE_NAME = "lifeos_auth";

export function setAuthCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_COOKIE_NAME}=1; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function clearAuthCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function hasAuthCookieClient() {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith(`${AUTH_COOKIE_NAME}=`));
}
