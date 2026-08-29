import { getAuthorizedStudentContext, logoutAndRedirect } from "./auth.js";
import { AULA_CONFIG } from "./config.js";
import { select, signOut } from "./supabase-client.js";

const loading = document.querySelector("#loading");
const content = document.querySelector("#course-content");
const errorPanel = document.querySelector("#error-panel");
const errorText = document.querySelector("#error-text");
const courseName = document.querySelector("#course-name");
const userName = document.querySelector("#user-name");
const grid = document.querySelector("#subjects-grid");
const logout = document.querySelector("#logout-button");

function showError(text) {
  loading.classList.add("is-hidden"); content.classList.add("is-hidden");
  errorText.textContent = text; errorPanel.classList.remove("is-hidden");
}

function renderSubjects(rows) {
  grid.replaceChildren();
  if (!rows.length) {
    const empty = document.createElement("p");
    empty.className = "message message--info is-visible";
    empty.textContent = "Todavía no hay materias habilitadas para este curso.";
    grid.append(empty); return;
  }
  rows.forEach((row, index) => {
    const card = document.createElement("article"); card.className = "subject-card";
    const number = document.createElement("span"); number.className = "subject-card__number"; number.textContent = String(index + 1).padStart(2, "0");
    const copy = document.createElement("div");
    const title = document.createElement("h2"); title.textContent = row.subject_name || "Materia";
    const description = document.createElement("p");
    let resourceUrl = null;
    try {
      const candidate = new URL(row.resource_url);
      if (candidate.protocol === "https:" && candidate.hostname === "drive.google.com") resourceUrl = candidate.href;
    } catch { resourceUrl = null; }
    description.textContent = resourceUrl ? "Materiales y actividades compartidos por el equipo docente." : "La carpeta de esta materia se habilitará próximamente.";
    copy.append(title, description);
    const link = document.createElement("a");
    link.className = resourceUrl ? "button" : "button button--secondary";
    link.textContent = resourceUrl ? "Abrir materiales" : "Próximamente";
    if (resourceUrl) {
      link.href = resourceUrl; link.target = "_blank"; link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `Abrir materiales de ${title.textContent} en una nueva pestaña`);
    } else {
      link.href = "#"; link.setAttribute("aria-disabled", "true"); link.addEventListener("click", (event) => event.preventDefault());
    }
    card.append(number, copy, link); grid.append(card);
  });
}

async function loadSubjects(context) {
  let assignments;
  try {
    assignments = await select(
      `course_subjects?select=id,subject_id,resource_url,sort_order&course_id=eq.${encodeURIComponent(context.course.id)}&active=eq.true&order=sort_order.asc`,
      context.session.access_token
    );
  } catch (error) {
    if (String(context.session.user?.email || "").toLowerCase() === AULA_CONFIG.pilot1A.email) {
      return AULA_CONFIG.pilot1A.subjects;
    }
    throw error;
  }

  if (!assignments?.length) return [];

  const subjectIds = [...new Set(assignments.map((row) => row.subject_id).filter(Boolean))];
  if (!subjectIds.length) return assignments;

  const encodedIds = subjectIds.map((id) => encodeURIComponent(id)).join(",");
  let subjects;
  try {
    subjects = await select(
      `subjects?select=id,name&id=in.(${encodedIds})&active=eq.true`,
      context.session.access_token
    );
  } catch (error) {
    if (String(context.session.user?.email || "").toLowerCase() === AULA_CONFIG.pilot1A.email) {
      return AULA_CONFIG.pilot1A.subjects;
    }
    throw error;
  }
  const namesById = new Map((subjects || []).map((subject) => [subject.id, subject.name]));

  return assignments.map((assignment) => ({
    ...assignment,
    subject_name: namesById.get(assignment.subject_id) || "Materia",
  }));
}

async function initialize() {
  try {
    const context = await getAuthorizedStudentContext();
    if (context.status === "no-session") { window.location.replace("./login.html?reason=expired"); return; }
    if (context.status === "inactive") {
      await signOut();
      showError("Este acceso no se encuentra habilitado. Comunicate con la escuela.");
      return;
    }
    if (context.status === "wrong-role" && context.profile?.role === "teacher") {
      window.location.replace("./docente.html");
      return;
    }
    if (context.status !== "ok") {
      await signOut();
      window.location.replace("./acceso-denegado.html");
      return;
    }
    const rows = await loadSubjects(context);
    courseName.textContent = context.course.name;
    userName.textContent = context.profile.display_name || context.course.name;
    renderSubjects(rows || []);
    loading.classList.add("is-hidden"); content.classList.remove("is-hidden");
  } catch { showError("No fue posible validar tu acceso. Intentá nuevamente."); }
}

logout.addEventListener("click", async () => {
  logout.disabled = true;
  try { await logoutAndRedirect(); } catch { window.location.replace("./login.html"); }
});
initialize();
