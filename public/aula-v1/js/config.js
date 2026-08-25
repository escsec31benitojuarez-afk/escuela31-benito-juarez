/** Configuración pública. Nunca colocar aquí service_role ni secretos. */
export const AULA_CONFIG = Object.freeze({
  supabaseUrl: "REEMPLAZAR_CON_URL_SUPABASE",
  supabaseAnonKey: "REEMPLAZAR_CON_ANON_KEY",
  technicalLoginDomain: "auth.aula-digital.local",
  loginAliases: Object.freeze({ "1a": "1a@auth.aula-digital.local" }),
});

export function isConfigured() {
  return /^https:\/\/.+\.supabase\.co$/.test(AULA_CONFIG.supabaseUrl)
    && !AULA_CONFIG.supabaseAnonKey.startsWith("REEMPLAZAR_");
}
