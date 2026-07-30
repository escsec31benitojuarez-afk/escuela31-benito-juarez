# Microintervención SEO 2 — Preparación para Google Search Console

Portal Institucional de la Escuela Secundaria N.º 31 “Benito Juárez”  
Fecha de auditoría inicial: 26 de julio de 2026  
Última actualización de estado: 27 de julio de 2026  
Línea base anterior: commit `ace35ee9c9b62d66c7a62f335929e57188ac19b3` (`E15`)  
Commit SEO preparado: `257456d1c5c56555e84b052199094a991454e746`  
Rama: `main`

## 1. Resumen ejecutivo

La configuración necesaria para incorporar el Portal a Google Search Console
está preparada y consolidada en un commit local, pero la Microintervención SEO
2 no puede declararse finalizada ni ejecutarse en Search Console.

Motivos:

1. Los cambios de la Microintervención SEO 1 fueron incorporados al commit
   local `257456d1c5c56555e84b052199094a991454e746`, con el mensaje
   `Publicar infraestructura SEO inicial`.
2. El intento de push fue rechazado antes de transferir cambios porque no había
   una sesión autenticada de GitHub disponible. La rama local está un commit
   por delante de `origin/main`.
3. `sitemap.xml`, `robots.txt`, los canonical y las directivas `noindex`
   todavía no están publicados en GitHub Pages.
4. No se obtuvo autorización de acceso al Portal publicado mediante el
   navegador de auditoría de esta sesión. Por tanto, no se atribuyen respuestas
   HTTP públicas que no pudieron observarse.
5. No se inició sesión en Google, no se creó una propiedad, no se verificó la
   titularidad y no se envió el sitemap.
6. No existen datos reales de Search Console para interpretar.

El Portal está técnicamente preparado para una futura alta mediante una
propiedad de prefijo de URL. Antes de hacerlo, debe publicarse el commit SEO y
verificarse externamente que las URLs respondan.

## 2. Propiedad recomendada

### Tipo

**Propiedad de prefijo de URL**.

### URL exacta que se deberá registrar

```text
https://escsec31benitojuarez-afk.github.io/escuela31-benito-juarez/
```

Debe conservarse:

- el protocolo `https://`;
- la ruta completa `/escuela31-benito-juarez/`;
- la barra final;
- la portada representada por la raíz, no por `/index.html`.

### Justificación

El Portal es un sitio de proyecto alojado dentro del dominio compartido
`github.io`. La institución controla el repositorio y su subruta, pero no
administra el DNS de `github.io`. Una propiedad de dominio requeriría verificar
el DNS del dominio completo y tampoco admite una ruta. La propiedad de prefijo
de URL sí puede contener protocolo y subruta, por lo que incluye exactamente
todo el Portal y Benito IA.

Referencia oficial:
[Agregar una propiedad a Search Console](https://support.google.com/webmasters/answer/34592?hl=es).

## 3. Método de verificación recomendado

### Método principal: etiqueta HTML

Una vez creada la propiedad, Google entregará una etiqueta semejante a:

```html
<meta name="google-site-verification" content="VALOR_ENTREGADO_POR_GOOGLE">
```

Procedimiento técnico futuro:

1. Copiar la etiqueta exacta entregada por Google.
2. Abrir una intervención independiente y autorizada.
3. Incorporarla una sola vez dentro del `<head>` de `index.html`.
4. Publicar el cambio en GitHub Pages.
5. Confirmar que la etiqueta aparece en el código fuente de la portada pública.
6. Volver a Search Console y seleccionar **Verificar**.
7. Mantener la etiqueta permanentemente: quitarla puede provocar la pérdida de
   la verificación.

No debe inventarse ahora el valor de verificación ni agregarse una etiqueta de
ejemplo al Portal.

### Métodos no recomendados para este caso

- **Registro DNS:** la institución no controla el DNS de `github.io`.
- **Google Analytics o Google Tag Manager:** no se comprobó una implementación
  institucional con permisos suficientes.
- **Archivo HTML:** es posible en algunas propiedades, pero la etiqueta HTML es
  más simple de auditar en este proyecto y evita incorporar un archivo de
  verificación sin una intervención específica.

Referencia oficial:
[Verificar la propiedad del sitio](https://support.google.com/webmasters/answer/9008080?hl=es).

## 4. Auditoría técnica local

| Control | Resultado | Estado |
|---|---:|---|
| Archivos HTML revisados | 38 | Correcto |
| Páginas públicas con canonical | 16/16 | Correcto localmente |
| Módulos internos con `noindex, nofollow` | 22/22 | Correcto localmente |
| URLs incluidas en `sitemap.xml` | 16 | Correcto |
| URLs duplicadas en el sitemap | 0 | Correcto |
| URLs HTTP en el sitemap | 0 | Correcto |
| Destinos locales inexistentes del sitemap | 0 | Correcto |
| Referencias internas rotas | 0 | Correcto |
| Errores de formato detectados por `git diff --check` | 0 | Correcto |
| Archivos CSS o JavaScript alterados por SEO 1 | 0 | Sin regresión de código |
| Publicación pública comprobada en esta auditoría | No | Pendiente |

### Estado del repositorio

- Rama activa: `main`.
- Estado respecto del remoto: un commit por delante de `origin/main`.
- Commit preparado:
  `257456d1c5c56555e84b052199094a991454e746`.
- Mensaje: `Publicar infraestructura SEO inicial`.
- Fecha registrada por Git: 27 de julio de 2026, 11:00:39, zona `+0800`.
- Alcance del commit: 38 HTML, `sitemap.xml` y `robots.txt`.
- Informes técnicos: permanecen locales y fuera del commit público.
- Cambios ajenos a la intervención: no detectados.

El intento de push se detuvo por falta de autenticación de GitHub y no
transfirió el commit. En consecuencia, la validez local de la infraestructura
todavía no demuestra su disponibilidad en el Portal público.

## 5. Sitemap

### Archivo preparado

```text
sitemap.xml
```

### URL pública prevista

```text
https://escsec31benitojuarez-afk.github.io/escuela31-benito-juarez/sitemap.xml
```

### Resultado de validación local

- XML bien formado.
- Espacio de nombres correcto:
  `http://www.sitemaps.org/schemas/sitemap/0.9`.
- 16 URLs absolutas.
- 16 URLs únicas.
- Todas las URLs utilizan HTTPS.
- Todas pertenecen al prefijo oficial.
- Incluye la portada mediante la raíz.
- Incluye Benito IA público.
- No incluye los 22 módulos internos.
- No incluye fechas de modificación no verificadas.
- Todos los archivos HTML declarados existen localmente.

### Estado público

No comprobado en esta sesión. Antes de enviar el sitemap, el administrador debe
abrir su URL pública y confirmar que:

1. responde sin iniciar sesión;
2. muestra XML y no una página HTML de error;
3. no redirige a otra ubicación;
4. todas las URLs pertenecen a la propiedad.

Google recomienda probar que el sitemap sea accesible para Googlebot mediante
una inspección en vivo antes de enviarlo:
[Informe de Sitemaps](https://support.google.com/webmasters/answer/7451001?hl=es).

## 6. Robots

### Archivo preparado

```text
robots.txt
```

### URL dentro del proyecto

```text
https://escsec31benitojuarez-afk.github.io/escuela31-benito-juarez/robots.txt
```

### Limitación crítica

Para el host:

```text
https://escsec31benitojuarez-afk.github.io/
```

el archivo estándar debería encontrarse en:

```text
https://escsec31benitojuarez-afk.github.io/robots.txt
```

Un `robots.txt` alojado en `/escuela31-benito-juarez/robots.txt` puede ser
abierto como archivo público, pero los rastreadores no están obligados a
interpretarlo como el archivo de exclusión del host. Por ello:

- la declaración del sitemap dentro de ese archivo no sustituye su envío en
  Search Console;
- las reglas `Disallow` del archivo ubicado en la subruta no deben considerarse
  efectivas;
- la exclusión de los módulos internos depende actualmente de la etiqueta
  `noindex` incorporada en cada HTML;
- `noindex` no convierte una página pública en privada ni reemplaza una
  autenticación real.

### Opciones futuras

1. Crear y administrar el sitio de usuario
   `escsec31benitojuarez-afk.github.io` para poder servir un `robots.txt` en la
   raíz del host.
2. Migrar a un dominio propio, donde la institución controle la raíz, el DNS y
   el archivo `robots.txt`.
3. Mientras se mantenga la arquitectura actual, conservar `noindex` en cada
   módulo interno y no confiar en el `robots.txt` de la subruta.

Esta limitación no impide crear la propiedad ni enviar el sitemap.

## 7. Canonical

### Resultado local

- 16/16 páginas públicas poseen exactamente un canonical.
- Todos los canonical son absolutos y utilizan el prefijo oficial.
- La portada declara:

```text
https://escsec31benitojuarez-afk.github.io/escuela31-benito-juarez/
```

- Benito IA declara:

```text
https://escsec31benitojuarez-afk.github.io/escuela31-benito-juarez/benito/index.html
```

- No se detectaron canonical fuera del Portal ni canonical duplicados.

### Pendiente

Confirmar estos mismos valores en el HTML publicado después del push. La
presencia local no permite asegurar que Google pueda verlos.

## 8. Posibles impedimentos para la indexación

### Bloqueos actuales

1. **Infraestructura SEO sin publicar.** Es el impedimento principal.
2. **Sitemap público no comprobado.**
3. **Canonical públicos no comprobados.**
4. **Directivas `noindex` internas no comprobadas en producción.**
5. **Search Console no configurado.** No impide que Google descubra el Portal,
   pero impide observar y diagnosticar el proceso desde la cuenta institucional.

### Riesgos técnicos

1. `robots.txt` no se encuentra en la raíz del host.
2. Los módulos internos de Benito continúan siendo accesibles por URL mientras
   permanezcan publicados; `noindex` solo evita su aparición deseada en
   resultados.
3. `/` e `/index.html` pueden ser descubiertas como variantes. El canonical
   preparado consolida la raíz, pero no existe una redirección HTTP en GitHub
   Pages.
4. Google puede elegir temporalmente otro canonical si aún no rastreó la
   versión actualizada.
5. Un sitemap aceptado no garantiza que todas las páginas sean indexadas.
6. Páginas con contenido muy similar pueden aparecer como duplicadas.
7. Páginas recién publicadas pueden figurar como “Descubierta: actualmente sin
   indexar” o “Rastreada: actualmente sin indexar” durante un tiempo sin que
   eso demuestre por sí solo un error técnico.

### Controles que no presentan problemas localmente

- No hay `noindex` en las 16 páginas públicas.
- No hay URLs públicas bloqueadas por las reglas preparadas.
- No hay enlaces internos rotos.
- No se detectaron URLs ajenas o HTTP en el sitemap.
- No se modificaron CSS ni JavaScript de Benito IA.

## 9. Verificación de Benito IA

La intervención SEO local:

- no modificó archivos `.js`;
- no modificó archivos `.css`;
- no alteró el formulario público de Benito IA;
- conserva `#chatForm`, `#question`, el botón de envío y el área de mensajes;
- solo agregó el canonical a `benito/index.html`;
- agregó `noindex, nofollow` únicamente a los 22 módulos internos.

Resultado: no se detecta una regresión de código atribuible a la intervención
SEO. Falta una prueba funcional pública posterior a la publicación para cumplir
el criterio integral de aceptación.

## 10. Procedimiento para el administrador

Este procedimiento queda documentado, pero no ejecutado.

### Fase A — Publicar y comprobar previamente

1. Revisar y aprobar los cambios locales de SEO 1.
2. Crear el commit institucional correspondiente.
3. Realizar el push a `main`.
4. Esperar a que GitHub Pages finalice la publicación.
5. Abrir en una ventana privada:
   - la portada;
   - Institución;
   - Contacto;
   - Aula Digital;
   - Proyectos;
   - Benito IA;
   - `sitemap.xml`;
   - `robots.txt`.
6. Confirmar que las páginas y los dos archivos responden sin autenticación.
7. Confirmar mediante “Ver código fuente” que cada página prioritaria contiene
   su canonical.
8. Probar una consulta real en Benito IA y comprobar que responde como antes.
9. Si cualquiera de estos controles falla, detener el alta de Search Console y
   corregir primero la publicación.

### Fase B — Dar de alta la propiedad

1. Ingresar a
   [Google Search Console](https://search.google.com/search-console/) con la
   cuenta institucional autorizada.
2. Abrir el selector de propiedades.
3. Seleccionar **Añadir propiedad**.
4. Elegir **Prefijo de URL**.
5. Pegar exactamente:

```text
https://escsec31benitojuarez-afk.github.io/escuela31-benito-juarez/
```

6. No registrar `github.io` como propiedad de dominio.
7. No registrar `/index.html` como propiedad separada.

### Fase C — Verificar la propiedad

1. Elegir **Etiqueta HTML**.
2. Copiar la etiqueta completa suministrada por Google.
3. No cerrar ni reemplazar la propiedad creada.
4. Solicitar una intervención autorizada para agregar esa etiqueta al `<head>`
   de `index.html`.
5. Publicar el cambio en GitHub Pages.
6. Abrir la portada pública y comprobar la presencia de la etiqueta en el
   código fuente.
7. Regresar a Search Console.
8. Seleccionar **Verificar**.
9. Conservar la etiqueta después de la verificación.

### Fase D — Enviar el sitemap

Solo después de que la propiedad figure como verificada:

1. Abrir **Sitemaps**.
2. En **Añadir un sitemap**, escribir:

```text
sitemap.xml
```

3. Confirmar que Search Console muestra como URL completa:

```text
https://escsec31benitojuarez-afk.github.io/escuela31-benito-juarez/sitemap.xml
```

4. Seleccionar **Enviar**.
5. Esperar el resultado.
6. Si el estado es **Correcto/Success**, no volver a enviarlo repetidamente.
7. Si aparece **No se ha podido obtener**, comprobar la URL pública, el
   contenido XML, la ausencia de autenticación y el prefijo de la propiedad.
8. No interpretar “enviado” como “todas las páginas indexadas”.

### Fase E — Inspeccionar URLs prioritarias

Inspeccionar, en este orden:

1. `https://escsec31benitojuarez-afk.github.io/escuela31-benito-juarez/`
2. `https://escsec31benitojuarez-afk.github.io/escuela31-benito-juarez/contacto.html`
3. `https://escsec31benitojuarez-afk.github.io/escuela31-benito-juarez/institucion.html`
4. `https://escsec31benitojuarez-afk.github.io/escuela31-benito-juarez/aula-digital.html`
5. `https://escsec31benitojuarez-afk.github.io/escuela31-benito-juarez/programas.html`
6. `https://escsec31benitojuarez-afk.github.io/escuela31-benito-juarez/benito/index.html`

Para cada URL:

1. pegar la URL completa en **Inspección de URLs**;
2. ejecutar **Probar URL publicada**;
3. confirmar que Google puede obtener la página;
4. revisar que se permita la indexación;
5. comprobar el canonical declarado;
6. utilizar **Solicitar indexación** solo en las páginas prioritarias y solo
   después de una prueba en vivo satisfactoria.

La herramienta informa sobre la versión indexada y permite una prueba en vivo,
pero la prueba en vivo no predice cuál canonical elegirá finalmente Google:
[Inspección de URLs](https://support.google.com/webmasters/answer/9012289?hl=es).

### Fase F — Interpretar los primeros informes

No se esperan datos completos inmediatamente. Revisar aproximadamente a los 7,
15 y 30 días.

#### Estados esperados

- **Indexada:** resultado deseado para las 16 páginas públicas.
- **Página alternativa con etiqueta canonical adecuada:** puede ser correcto
  para `/index.html` si Google conserva la raíz como canonical.
- **Excluida por etiqueta `noindex`:** esperado únicamente para los 22 módulos
  internos si Google ya los conocía.

#### Estados que requieren revisión

- **Bloqueada por `robots.txt`:** no debe afectar a las 16 páginas públicas.
- **La URL enviada contiene `noindex`:** error si aparece en una URL pública.
- **Duplicada, Google eligió una canonical diferente:** comparar el canonical
  declarado, enlaces internos y URL del sitemap.
- **No encontrada (404):** verificar rutas y mayúsculas/minúsculas.
- **Error del servidor (5xx):** comprobar el estado de GitHub Pages.
- **Descubierta: actualmente sin indexar:** observar evolución y enlaces
  internos; no reenviar de forma compulsiva.
- **Rastreada: actualmente sin indexar:** revisar calidad, singularidad y
  utilidad del contenido antes de modificar técnicamente.

El informe separa páginas **Indexadas** y **No indexadas**, y no todo estado de
exclusión exige una corrección:
[Informe de indexación de páginas](https://support.google.com/webmasters/answer/7440203?hl=es).

### Registro mínimo de seguimiento

| Fecha | Página/Informe | Estado observado | Evidencia | Acción autorizada |
|---|---|---|---|---|
| Día 0 | Propiedad | Pendiente/verificada | Captura o registro | — |
| Día 0 | Sitemap | Pendiente/Success/Error | Estado de Search Console | — |
| Día 7 | Indexación | Datos reales | Exportación o captura | Solo diagnóstico |
| Día 15 | Indexación | Evolución | Comparación | Corregir problemas confirmados |
| Día 30 | Rendimiento | Impresiones y consultas | Informe real | Priorizar mejoras |

No completar esta tabla con estimaciones. Solo registrar datos observados en la
cuenta institucional.

## 11. Estado del criterio de aceptación

| Criterio | Estado | Evidencia |
|---|---|---|
| Commit SEO generado | Cumplido | `257456d1c5c56555e84b052199094a991454e746` |
| Push al repositorio | Pendiente | Intento rechazado por falta de sesión autenticada; no hubo transferencia |
| Portal publicado correctamente | No comprobado con la nueva versión | El Portal público conserva E15 |
| `sitemap.xml` accesible públicamente | Pendiente | Archivo válido localmente, sin verificación HTTP pública |
| `robots.txt` accesible públicamente | Pendiente | Archivo local; además está fuera de la raíz estándar del host |
| Páginas públicas responden correctamente | Pendiente | Archivos y enlaces locales correctos; falta prueba pública |
| Benito IA funciona sin regresiones | Parcial | Sin cambios CSS/JS ni estructura funcional; falta prueba pública |
| Procedimiento para Search Console documentado | Cumplido | Sección 10 |
| Informe técnico completo | Cumplido | Este documento |

### Dictamen

**Microintervención SEO 2: preparada, no finalizada.**

El proceso se detiene antes de la publicación y de Google Search Console,
conforme a las restricciones. Para finalizar técnicamente la intervención se
necesita:

1. publicar el commit SEO ya autorizado;
2. comprobar públicamente las URLs y Benito IA;
3. obtener de Google la etiqueta real de verificación mediante la cuenta
   institucional;
4. realizar una intervención separada y autorizada para incorporar esa
   etiqueta;
5. dejar el alta, la verificación y el envío del sitemap a cargo del
   administrador.

## 12. Protocolo de cumplimiento

- ¿Se inició sesión en Google? **No.**
- ¿Se asumieron credenciales? **No.**
- ¿Se registró automáticamente el Portal? **No.**
- ¿Se envió el sitemap? **No.**
- ¿Se inventaron datos de Search Console? **No.**
- ¿Se modificó Google Search Console? **No.**
- ¿Se modificó la lógica o el diseño de Benito IA? **No.**
- ¿Se documentó el procedimiento para el administrador? **Sí.**
