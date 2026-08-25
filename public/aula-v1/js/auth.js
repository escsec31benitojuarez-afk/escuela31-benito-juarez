import { AULA_CONFIG } from "./config.js";
import { validSession, select, signOut } from "./supabase-client.js";

export function resolveLoginIdentifier(value) {
  const normalized = value.trim().toLowerCase().replace(/\s+/g, "");
  if (AULA_CONFIG.loginAliases[normalized]) return AULA_CONFIG.loginAliases[normalized];
  if (normalized.includes("@")) return normalized;
  return `${normalized}@${AULA_CONFIG.technicalLoginDomain}`;
}

export async function getAuthorizedStudentContext() {
  const session = await validSession();
  if (!session) return { status: "no-session" };
  const profileRows = await select("profiles?select=id,role,course_id,active,display_name&limit=1", session.access_token);
  const profile = profileRows?.[0];
  if (!profile) return { status: "missing-profile" };
  if (!profile.active) return { status: "inactive" };
  if (profile.role !== "student" || !profile.course_id) return { status: "wrong-role" };
  const courseRows = await select(`courses?select=id,name,active&id=eq.${encodeURIComponent(profile.course_id)}&limit=1`, session.access_token);
  const course = courseRows?.[0];
  if (!course?.active) return { status: "inactive" };
  return { status: "ok", session, profile, course };
}

export async function logoutAndRedirect() {
  await signOut();
  window.location.replace("./login.html?reason=logout");
}
