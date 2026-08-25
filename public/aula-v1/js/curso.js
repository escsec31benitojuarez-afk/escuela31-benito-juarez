import { getAuthorizedStudentContext, logoutAndRedirect } from "./auth.js";
import { select } from "./supabase-client.js";

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
    const title = document.createElement("h2"); title.textContent = row.subjects?.name || "Materia";
    const description = document.createElement("p");
    description.textContent = row.resource_url ? "Materiales y actividades compartidos por el equipo docente." : "La carpeta de esta materia se habilitará próximamente.";
    copy.append(title, description);
    const link = document.createElement("a");
    link.className = row.resource_url ? "button" : "button button--secondary";
    link.textContent = row.resource_url ? "Abrir materiales" : "Próximamente";
    if (row.resource_url) {
      link.href = row.resource_url; link.target = "_blank"; link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `Abrir materiales de ${title.textContent} en una nueva pestaña`);
    } else {
      link.href = "#"; link.setAttribute("aria-disabled", "true"); link.addEventListener("click", (event) => event.preventDefault());
    }
    card.append(number, copy, link); grid.append(card);
  });
}

async function initialize() {
  try {
    const context = await getAuthorizedStudentContext();
    if (context.status === "no-session") { window.location.replace("./login.html?reason=expired"); return; }
    if (context.status === "inactive") { showError("Este acceso no se encuentra habilitado. Comunicate con la escuela."); return; }
    if (context.status !== "ok") { window.location.replace("./acceso-denegado.html"); return; }
    const rows = await select(`course_subjects?select=id,resource_url,sort_order,subjects(name)&course_id=eq.${encodeURIComponent(context.course.id)}&active=eq.true&order=sort_order.asc`, context.session.access_token);
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
