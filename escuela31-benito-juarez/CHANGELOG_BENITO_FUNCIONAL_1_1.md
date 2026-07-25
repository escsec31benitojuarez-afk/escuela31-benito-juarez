# Benito IA funcional 1.1

## Objetivo
Dejar operativo el asistente virtual público sin modificar las restantes secciones del sitio.

## Cambios realizados
- Reemplazo de la portada técnica de `benito/index.html` por una interfaz conversacional pública.
- Nuevo motor local en `benito/benito-publico.js`.
- Nuevo estilo independiente en `benito/benito-publico.css`.
- El acceso principal “Benito IA” del sitio abre ahora el asistente público sin solicitar inicio de sesión.
- Se mantiene el acceso privado en `benito/login.html` como “Plataforma institucional”.
- Respuestas disponibles para contacto, ubicación, Aula Digital, equipo institucional, trámites, horarios, actividades, recursos, becas, historia, comunidad y redes.
- Derivación segura a Contacto o Secretaría cuando no existe una respuesta suficiente.

## Archivos modificados
- `index.html`
- `benito/index.html`

## Archivos nuevos
- `benito/benito-publico.css`
- `benito/benito-publico.js`
- `CHANGELOG_BENITO_FUNCIONAL_1_1.md`
