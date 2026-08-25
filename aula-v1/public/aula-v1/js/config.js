/** Configuración pública. Nunca colocar aquí service_role ni secretos. */
export const AULA_CONFIG = Object.freeze({
  supabaseUrl: "https://gwtjklstyhunwbhkqvyo.supabase.co",
  supabaseAnonKey: "sb_publishable_skv1vflkCYdZeymhlufLYw_hsxpnrs4",
  technicalLoginDomain: "aula.benitojuarez.local",
  loginAliases: Object.freeze({ "1a": "1a@aula.benitojuarez.local" }),
});

export function isConfigured() {
  return /^https:\/\/.+\.supabase\.co$/.test(AULA_CONFIG.supabaseUrl)
    && !AULA_CONFIG.supabaseAnonKey.startsWith("REEMPLAZAR_");
}
