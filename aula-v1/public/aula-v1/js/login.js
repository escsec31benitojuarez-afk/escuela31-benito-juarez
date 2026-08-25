import { isConfigured } from "./config.js";
import { resolveLoginIdentifier } from "./auth.js";
import { signIn, validSession } from "./supabase-client.js";

const form = document.querySelector("#login-form");
const button = document.querySelector("#login-button");
const message = document.querySelector("#login-message");
function showMessage(text, type = "error") { message.textContent = text; message.className = `message message--${type} is-visible`; }
function clearMessage() { message.textContent = ""; message.className = "message"; }

async function initialize() {
  const reason = new URLSearchParams(window.location.search).get("reason");
  if (reason === "expired") showMessage("Tu sesión finalizó. Volvé a ingresar.", "info");
  if (reason === "logout") showMessage("La sesión se cerró correctamente.", "info");
  if (!isConfigured()) {
    showMessage("El piloto todavía requiere completar la conexión institucional antes de habilitar el ingreso.", "info");
    button.disabled = true;
    return;
  }
  const session = await validSession();
  if (session) window.location.replace("./curso.html");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault(); clearMessage(); button.disabled = true; button.textContent = "Ingresando…";
  const data = new FormData(form);
  try {
    await signIn(resolveLoginIdentifier(String(data.get("user") || "")), String(data.get("password") || ""));
    window.location.replace("./curso.html");
  } catch (error) {
    if (error.status === 400) showMessage("Usuario o contraseña incorrectos.");
    else if (error.message === "AULA_NOT_CONFIGURED") showMessage("El Aula todavía no está configurada.", "info");
    else showMessage("No fue posible conectar con el Aula Digital. Intentá nuevamente.");
    button.disabled = false; button.textContent = "Ingresar";
  }
});

initialize().catch(() => showMessage("No fue posible validar el estado del Aula Digital."));
