# Informe de la Microintervención SEO 1

Portal Institucional de la Escuela Secundaria N.º 31 “Benito Juárez”  
Fecha: 26 de julio de 2026

## 1. Estado inicial

- Rama: `main`.
- Línea base: commit `ace35ee9c9b62d66c7a62f335929e57188ac19b3` (`E15`).
- Estado inicial: limpio y coincidente con `origin/main`.
- Fuente autorizada: ZIP institucional con el repositorio Git completo.
- URL oficial: `https://escsec31benitojuarez-afk.github.io/escuela31-benito-juarez/`.

## 2. Archivos creados

- `sitemap.xml`: inventario técnico de las 16 páginas públicas aprobadas.
- `robots.txt`: permite rastrear el Portal público, declara el sitemap y excluye del rastreo los 22 módulos internos de Benito.
- `INFORME_MICROINTERVENCION_SEO_1.md`: documentación de la intervención.

## 3. Archivos modificados

- Quince páginas HTML públicas de la raíz: incorporación exclusiva de un canonical absoluto.
- `benito/index.html`: incorporación exclusiva de su canonical absoluto.
- Veintidós páginas HTML internas de `/benito/`: incorporación exclusiva de `noindex, nofollow`.

No se modificaron CSS, JavaScript, imágenes, textos institucionales, menús, navegación ni lógica funcional.

## 4. Páginas indexables

1. Inicio: `/`
2. Institución: `/institucion.html`
3. Historia: `/historia.html`
4. Recursos: `/recursos.html`
5. Aula Digital: `/aula-digital.html`
6. Actividades y producciones: `/actividades.html`
7. Vida Escolar: `/vida-escolar.html`
8. Promo 2026: `/promo-2026.html`
9. Proyectos: `/programas.html`
10. Comunidad: `/comunidad.html`
11. Multimedia: `/multimedia.html`
12. Contacto: `/contacto.html`
13. Biblioteca: `/biblioteca.html`
14. Servicios: `/servicios.html`
15. Nos cuidamos en comunidad: `/proyecto-nos-cuidamos.html`
16. Benito IA público: `/benito/index.html`

No quedaron páginas dudosas: las 16 poseen contenido real, URL estable y enlaces internos válidos.

## 5. Páginas no indexables

Los 22 HTML internos de Benito:

`access-matrix`, `admin`, `analytics-dashboard`, `analytics-data-lab`, `audit`, `dashboard`, `data-governance`, `evaluation`, `login`, `memory`, `multiagent-lab`, `pilot-dashboard`, `pilot-settings`, `platform-owner`, `predictive-dashboard`, `predictive-governance`, `private-dashboard`, `protected-placeholder`, `rag-lab`, `rti-app`, `security-audit` y `settings`.

Todos incorporan:

```html
<meta name="robots" content="noindex, nofollow">
```

Esta directiva evita destinarlos a resultados de búsqueda. No constituye autenticación ni reemplaza controles de acceso reales.

## 6. Sitemap y robots

El sitemap:

- contiene 16 URLs absolutas;
- utiliza la URL institucional aprobada;
- representa Inicio mediante la raíz, no mediante `/index.html`;
- no incluye parámetros, módulos internos ni páginas experimentales;
- omite fechas de modificación no verificables;
- es XML válido y no contiene duplicados.

`robots.txt` permite rastrear el contenido público, declara la ubicación absoluta del sitemap y enumera individualmente los 22 HTML internos. No bloquea CSS, JavaScript, imágenes ni los recursos que Google necesita para interpretar el Portal.

## 7. Canonical

Cada página pública posee exactamente un canonical absoluto. La portada declara la raíz como oficial, con lo que `/` y `/index.html` quedan consolidados conceptualmente. Benito IA declara como oficial `/benito/index.html`; los parámetros de consulta no generan una URL canónica diferente.

## 8. Validaciones y regresión

- 38 archivos HTML revisados.
- 16/16 páginas públicas con un único canonical.
- 22/22 páginas internas con un único `noindex, nofollow`.
- 16 URLs únicas en el sitemap.
- XML analizado correctamente.
- Cero referencias locales rotas.
- `git diff --check` sin errores.
- Inicio, Institución, Aula Digital, Actividades, Vida Escolar, Contacto, Recursos, Benito IA, sitemap y robots respondieron localmente con HTTP 200.
- CSS y JavaScript protegidos permanecen idénticos a E15.
- No existen pruebas automatizadas ejecutables de Benito IA en el repositorio; los archivos `README_PRUEBA*` describen verificaciones manuales y `test-cases.json` contiene casos de evaluación sin ejecutor.
- La carga de la página pública, sus dependencias, el formulario y los accesos permanecen íntegros por revisión estática y comparación con E15.

No se realizó publicación, push, commit ni generación de ZIP.

## 9. Riesgos y pendientes

- `robots.txt` y `noindex` controlan rastreo e indexación, pero no convierten archivos públicos de GitHub Pages en recursos privados.
- Al tratarse de un sitio de proyecto (`/escuela31-benito-juarez/`), GitHub Pages publica este archivo en ese subdirectorio. El estándar de robots solo garantiza el descubrimiento automático en la raíz del host (`https://escsec31benitojuarez-afk.github.io/robots.txt`). Por eso las exclusiones efectivas de esta fase dependen principalmente del `noindex` incorporado en cada página interna. Resolver un `robots.txt` en la raíz del host exigiría intervenir el sitio de usuario de GitHub Pages o migrar a un dominio propio, acciones no autorizadas en esta fase.
- Los módulos internos continúan técnicamente accesibles por URL mientras permanezcan en la rama publicada.
- La desindexación de una URL ya conocida puede requerir que Google vuelva a rastrearla; por eso cada HTML interno conserva su propia directiva `noindex`.
- Google Search Console todavía no fue configurado.
- Google Maps continúa pendiente para una futura intervención de SEO local.

## 10. Procedimiento recomendado para Google Search Console

1. Ingresar a Google Search Console con la cuenta institucional autorizada.
2. Crear una propiedad de tipo **Prefijo de URL** con:
   `https://escsec31benitojuarez-afk.github.io/escuela31-benito-juarez/`
3. Elegir el método de verificación por **etiqueta HTML**, ya que no se administra el dominio `github.io`.
4. Copiar la metaetiqueta entregada por Google.
5. Abrir una intervención independiente y autorizada para incorporarla únicamente en el `<head>` de `index.html`.
6. Publicar ese cambio mediante el procedimiento institucional y pulsar **Verificar**.
7. Presentar `sitemap.xml` desde la sección Sitemaps.
8. Inspeccionar primero la portada, Contacto, Institución, Aula Digital, Proyectos y Benito IA.
9. Solicitar indexación solo de esas páginas prioritarias.
10. Revisar páginas indexadas y excluidas a los 7, 15 y 30 días.

No se ejecutó ninguno de estos pasos en cuentas externas.

## 11. Recomendación para la Microintervención SEO 2

La siguiente intervención debería concentrarse en metadatos únicos por página: títulos, descripciones y señales de identidad institucional. Debe comenzar únicamente después de publicar y validar la infraestructura de esta fase, y requiere aprobación expresa independiente.

## 12. Cierre

La Microintervención SEO 1 queda implementada localmente y detenida antes de cualquier publicación, conforme al alcance autorizado.
