# Integración Aula Digital V1.5.0 — Estado previo a publicación

Base del Portal: Portal Institucional Benito Juárez v1.9.5 — Refinamiento Visual Integral (24/08/2026).

Destino integrado: Aula Digital Benito Juárez V1.5.0.

## Alcance aplicado

- Se modificó únicamente `aula-digital.html`.
- Los ocho botones públicos que dirigían a carpetas generales de Google Drive fueron reemplazados por un único acceso institucional autenticado.
- El botón “Ingresar al Aula Digital” dirige al login oficial del Aula.
- Se ajustaron mínimamente dos textos para reflejar que el Aula ya está operativa y organizada por curso y materia.
- La sección pública “Actividades y producciones” se preservó sin cambios.

## Elementos preservados

- Resto de las páginas del Portal.
- Identidad visual y estilos globales.
- Navegación principal y pie institucional.
- Benito IA.
- Comunicaciones, novedades, actividades, contenidos institucionales, SEO, sitemap e indexación.
- Aula Digital V1.5.0, autenticación, usuarios, perfiles, roles, RLS, asignaciones y enlaces Drive.

## Seguridad

- No se incorporaron contraseñas ni archivos privados.
- No se incorporó ninguna `service_role`.
- No se incorporaron secretos administrativos.
- El Portal solo contiene el enlace público oficial al login del Aula.

## Archivos y rutas

- Archivo funcional modificado: `aula-digital.html`.
- Ruta pública intervenida: `/aula-digital.html`.
- Destino del nuevo acceso: `https://aula-digital-benito-juarez.esqalf.chatgpt.site/aula-v1/login.html`.
- Archivos informativos agregados al paquete: este informe y `NO_PUBLICAR_SIN_AUTORIZACION.txt`.
- No se modificó `styles.css`, la navegación compartida, ninguna otra página, `robots.txt` ni los sitemaps.

## Validación previa

- Renderizado de escritorio correcto, sin desbordamiento horizontal.
- Estructura responsive preservada: metadato de viewport, navegación móvil y reglas existentes para 900, 760 y 480 px sin modificaciones.
- Título “Aula Digital”, acceso a “Actividades y producciones” y navegación institucional presentes.
- Un único botón “Ingresar al Aula Digital” visible y vinculado al login oficial.
- Cero enlaces públicos a Google Drive en la sección Aula Digital.
- Los 26 destinos internos referenciados por la página existen en el paquete.
- HTML válido para el navegador y sin errores de carga detectados en la ruta intervenida.
- Comparación integral contra v1.9.5: solo difiere `aula-digital.html`; los otros archivos funcionales son idénticos.

## Regresión del Aula Digital

El Aula Digital V1.5.0 no fue modificada en esta intervención. Se conserva la validación vigente de estudiantes, docentes, aislamiento, cierre de sesión, 100 materias y 100 carpetas Drive. La integración solo enlaza su pantalla oficial de acceso.

## Reversión

La versión estable completa v1.9.5 se conserva como respaldo previo. La reversión consiste en restaurar su `aula-digital.html` o el paquete completo original.

## Publicación

Esta versión está preparada y validada para revisión previa. No debe publicarse sin autorización expresa del usuario.
