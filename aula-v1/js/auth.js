import { AULA_CONFIG } from "./config.js";
import { validSession, select, signOut } from "./supabase-client.js";

function pilotFallback(session) {
  const email = String(session.user?.email || "").trim().toLowerCase();
  if (email !== AULA_CONFIG.pilot1A.email) return null;
  return {
    status: "ok",
    session,
    profile: {
      id: session.user.id,
      role: "student",
      course_id: AULA_CONFIG.pilot1A.course.id,
      active: true,
      display_name: AULA_CONFIG.pilot1A.course.name,
    },
    course: AULA_CONFIG.pilot1A.course,
    pilotRecovery: true,
  };
}

export async function getAuthorizedStudentContext() {
  const context = await getAuthorizedUserContext();
  if (context.status !== "ok") return context;
  if (context.profile.role !== "student") return { ...context, status: "wrong-role" };
  return context;
}

export async function getAuthorizedTeacherContext() {
  const context = await getAuthorizedUserContext();
  if (context.status !== "ok") return context;
  if (context.profile.role !== "teacher") return { ...context, status: "wrong-role" };
  return context;
}

export function routeForRole(role) {
  if (role === "teacher") return "./docente.html";
  if (role === "student") return "./curso.html";
  return "./acceso-denegado.html";
}

export async function getAuthorizedUserContext(providedSession = null) {
  const session = providedSession || await validSession();
  if (!session) return { status: "no-session" };
  const userId = session.user?.id;
  if (!userId) return { status: "no-session" };
  try {
    const profileRows = await select(
      `profiles?select=id,role,course_id,active,display_name&id=eq.${encodeURIComponent(userId)}&limit=1`,
      session.access_token
    );
    const profile = profileRows?.[0];
    if (!profile) return { status: "missing-profile" };
    if (!profile.active) return { status: "inactive" };
    if (profile.role === "teacher") return { status: "ok", session, profile };
    if (profile.role !== "student" || !profile.course_id) return { status: "wrong-role" };
    const courseRows = await select(`courses?select=id,name,active&id=eq.${encodeURIComponent(profile.course_id)}&limit=1`, session.access_token);
    const course = courseRows?.[0];
    if (!course?.active) return { status: "inactive" };
    return { status: "ok", session, profile, course };
  } catch (error) {
    const fallback = pilotFallback(session);
    if (fallback) return fallback;
    throw error;
  }
}

export async function logoutAndRedirect() {
  await signOut();
  window.location.replace("./login.html?reason=logout");
}
