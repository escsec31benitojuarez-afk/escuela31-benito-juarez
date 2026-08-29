import { getAuthorizedTeacherContext, logoutAndRedirect } from "./auth.js";
import { select, signOut } from "./supabase-client.js";
import { buildTeacherSpaces } from "./teacher-spaces.js";

const loading = document.querySelector("#loading");
const content = document.querySelector("#teacher-content");
const errorPanel = document.querySelector("#error-panel");
const errorText = document.querySelector("#error-text");
const userName = document.querySelector("#user-name");
const spaces = document.querySelector("#teacher-spaces");
const logout = document.querySelector("#logout-button");

function showError(text) {
  loading.classList.add("is-hidden");
  content.classList.add("is-hidden");
  errorText.textContent = text;
  errorPanel.classList.remove("is-hidden");
}

function makeSubjectCard(row, index) {
  const card = document.createElement("article");
  card.className = "subject-card";
  const number = document.createElement("span");
  number.className = "subject-card__number";
  number.textContent = String(index + 1).padStart(2, "0");
  const copy = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = row.subject_name;
  const description = document.createElement("p");
  description.textContent = row.resource_url
    ? "Carpeta de materiales correspondiente a esta materia."
    : "La carpeta de esta materia no se encuentra disponible.";
  copy.append(title, description);

  const link = document.createElement("a");
  link.className = row.resource_url ? "button" : "button button--secondary";
  link.textContent = row.resource_url ? "Abrir materiales" : "No disponible";
  if (row.resource_url) {
    link.href = row.resource_url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `Abrir materiales de ${row.subject_name} de ${row.course_name} en una nueva pestaña`);
  } else {
    link.href = "#";
    link.setAttribute("aria-disabled", "true");
    link.addEventListener("click", (event) => event.preventDefault());
  }
  card.append(number, copy, link);
  return card;
}

function renderSpaces(rows) {
  spaces.replaceChildren();
  if (!rows.length) {
    const empty = document.createElement("section");
    empty.className = "status-card";
    const title = document.createElement("h2");
    title.textContent = "Todavía no tenés espacios asignados";
    const text = document.createElement("p");
    text.textContent = "Cuando la escuela complete tus asignaciones, aparecerán aquí tus cursos y materias.";
    empty.append(title, text);
    spaces.append(empty);
    return;
  }

  const groups = new Map();
  for (const row of rows) {
    if (!groups.has(row.course_id)) groups.set(row.course_id, []);
    groups.get(row.course_id).push(row);
  }

  for (const group of groups.values()) {
    const section = document.createElement("section");
    section.className = "teacher-course-section";
    const heading = document.createElement("h2");
    heading.textContent = group[0].course_name;
    const grid = document.createElement("div");
    grid.className = "subjects-grid";
    group.forEach((row, index) => grid.append(makeSubjectCard(row, index)));
    section.append(heading, grid);
    spaces.append(section);
  }
}

async function loadTeacherSpaces(context) {
  const assignments = await select(
    `teacher_assignments?select=id,course_subject_id&teacher_id=eq.${encodeURIComponent(context.profile.id)}&active=eq.true`,
    context.session.access_token
  );
  if (!assignments?.length) return [];

  const assignmentIds = [...new Set(assignments.map((row) => row.course_subject_id).filter(Boolean))];
  const encodedAssignmentIds = assignmentIds.map((id) => encodeURIComponent(id)).join(",");
  const courseSubjects = await select(
    `course_subjects?select=id,course_id,subject_id,resource_url,sort_order&id=in.(${encodedAssignmentIds})&active=eq.true`,
    context.session.access_token
  );
  const courseIds = [...new Set(courseSubjects.map((row) => row.course_id).filter(Boolean))];
  const subjectIds = [...new Set(courseSubjects.map((row) => row.subject_id).filter(Boolean))];
  const encodedCourseIds = courseIds.map((id) => encodeURIComponent(id)).join(",");
  const encodedSubjectIds = subjectIds.map((id) => encodeURIComponent(id)).join(",");
  const [courses, subjects] = await Promise.all([
    select(`courses?select=id,name,sort_order&id=in.(${encodedCourseIds})&active=eq.true`, context.session.access_token),
    select(`subjects?select=id,name&id=in.(${encodedSubjectIds})&active=eq.true`, context.session.access_token),
  ]);
  return buildTeacherSpaces(assignments, courseSubjects, courses, subjects);
}

async function initialize() {
  try {
    const context = await getAuthorizedTeacherContext();
    if (context.status === "no-session") {
      window.location.replace("./login.html?reason=expired");
      return;
    }
    if (context.status === "inactive") {
      await signOut();
      showError("Este acceso docente no se encuentra habilitado. Comunicate con la escuela.");
      return;
    }
    if (context.status === "wrong-role" && context.profile?.role === "student") {
      window.location.replace("./curso.html");
      return;
    }
    if (context.status !== "ok") {
      window.location.replace("./acceso-denegado.html");
      return;
    }
    const rows = await loadTeacherSpaces(context);
    userName.textContent = context.profile.display_name || "Docente";
    renderSpaces(rows);
    loading.classList.add("is-hidden");
    content.classList.remove("is-hidden");
  } catch {
    showError("No fue posible cargar tus espacios. Intentá nuevamente.");
  }
}

logout.addEventListener("click", async () => {
  logout.disabled = true;
  try { await logoutAndRedirect(); } catch { window.location.replace("./login.html"); }
});

initialize();
