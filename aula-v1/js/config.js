/** Configuración pública. Nunca colocar aquí service_role ni secretos. */
export const AULA_CONFIG = Object.freeze({
  supabaseUrl: "https://gwtjklstyhunwbhkqvyo.supabase.co",
  supabaseAnonKey: "sb_publishable_skv1vflkCYdZeymhlufLYw_hsxpnrs4",
  pilot1A: Object.freeze({
    email: "1a@aula.benitojuarez.local",
    course: Object.freeze({ id: "1a", name: "1.º Año A", active: true }),
    subjects: Object.freeze([
      Object.freeze({ subject_name: "Biología", resource_url: "https://drive.google.com/drive/folders/1iBEcDuAgpS-EPK6clQxr_AKv0tUv0-ND?usp=drive_link", sort_order: 1 }),
      Object.freeze({ subject_name: "Lengua y Literatura", resource_url: "https://drive.google.com/drive/folders/1f4YQ9QYc09XqyRq_Gf_CFjkpe2ibjN2Z?usp=drive_link", sort_order: 2 }),
      Object.freeze({ subject_name: "Matemática", resource_url: "https://drive.google.com/drive/folders/1ZPBMSne7RxuIa_mETUNT_Ug3vDvnnpPT?usp=drive_link", sort_order: 3 }),
    ]),
  }),
});

export function isConfigured() {
  return /^https:\/\/.+\.supabase\.co$/.test(AULA_CONFIG.supabaseUrl)
    && !AULA_CONFIG.supabaseAnonKey.startsWith("REEMPLAZAR_");
}
