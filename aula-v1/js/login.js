import { isConfigured } from "./config.js";
import { clearStoredSession, signIn, validSession } from "./supabase-client.js";
import { getAuthorizedUserContext, routeForRole } from "./auth.js";

const form = document.querySelector("#login-form");
const userInput = document.querySelector("#user");
const button = document.querySelector("#login-button");
const message = document.querySelector("#login-message");
const COURSE_USER_ALIASES = Object.freeze({
  bj1a2026: "1a",
  bj1b2026: "1b",
  bj2a2026: "2a",
  bj2b2026: "2b",
  "bj3-2026": "3",
  "bj4-2026": "4",
  "bj5-2026": "5",
  "bj6-2026": "6",
});

function resolveLoginUser(value) {
  const normalized = String(value || "").trim().toLowerCase();
  const courseCode = COURSE_USER_ALIASES[normalized];
  return courseCode ? `${courseCode}@aula.benitojuarez.local` : normalized;
}

function showMessage(text, type = "error") { message.textContent = text; message.className = `message message--${type} is-visible`; }
function clearMessage() { message.textContent = ""; message.className = "message"; }

async function continueToAuthorizedSpace(session) {
  const context = await getAuthorizedUserContext(session);
  if (context.status === "ok") {
    window.location.replace(routeForRole(context.profile.role));
    return true;
  }
  clearStoredSession();
  if (context.status === "inactive") showMessage("Este acceso no se encuentra habilitado. Comunicate con la escuela.");
  else showMessage("La cuenta todavía no tiene un espacio habilitado en el Aula Digital.");
  return false;
}

async function initialize() {
  const parameters = new URLSearchParams(window.location.search);
  const reason = parameters.get("reason");
  if (parameters.get("reset") === "1") clearStoredSession();
  if (!userInput.value) userInput.value = userInput.dataset.defaultUser || "";
  if (reason === "expired") showMessage("Tu sesión finalizó. Volvé a ingresar.", "info");
  if (reason === "logout") showMessage("La sesión se cerró correctamente.", "info");
  if (!isConfigured()) {
    showMessage("El Aula todavía requiere completar la conexión institucional antes de habilitar el ingreso.", "info");
    button.disabled = true;
    return;
  }
  const session = await validSession();
  if (session) await continueToAuthorizedSpace(session);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault(); clearMessage(); button.disabled = true; button.textContent = "Ingresando…";
  const data = new FormData(form);
  const user = resolveLoginUser(data.get("user"));
  const password = String(data.get("password") || "");
  if (!user || !password) {
    showMessage("Completá el usuario y la contraseña.");
    button.disabled = false;
    button.textContent = "Ingresar";
    return;
  }
  try {
    const session = await signIn(user, password);
    const redirected = await continueToAuthorizedSpace(session);
    if (redirected) return;
  } catch (error) {
    if (error.status === 400 || error.status === 401) showMessage("Usuario o contraseña incorrectos.");
    else if (error.message === "AULA_NOT_CONFIGURED") showMessage("El Aula todavía no está configurada.", "info");
    else if (error.message === "AULA_REQUEST_TIMEOUT") showMessage("La conexión está demorando más de lo esperado. Intentá nuevamente.");
    else showMessage("No fue posible conectar con el Aula Digital. Intentá nuevamente.");
  }
  button.disabled = false; button.textContent = "Ingresar";
});

initialize().catch(() => showMessage("No fue posible validar el estado del Aula Digital."));
