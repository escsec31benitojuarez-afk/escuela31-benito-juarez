# Benito IA funcional · Release 1.0

## Objetivo
Dejar operativo el asistente institucional dentro del Dashboard privado, sin modificar el resto del sitio.

## Cambios
- Se incorporó un asistente conversacional local y funcional.
- Responde consultas sobre contacto, Aula Digital, recursos, técnicas de estudio, becas, SAGE, institución, historia, Vida Escolar, actividades, programas, multimedia y trámites.
- Incluye accesos directos a las páginas correspondientes.
- Incluye respuesta responsable cuando no encuentra información suficiente.
- Se agregó un botón “Consultar a Benito IA” en Acciones rápidas.
- Se incorporó un lanzador flotante visible en todo el Dashboard.
- Funciona sin API externa y sin depender de servicios pagos.

## Archivos modificados
- benito/dashboard.html

## Archivos agregados
- benito/benito-ia/ui/functional-assistant.js
- benito/benito-ia/ui/functional-assistant.css

## Prueba sugerida
1. Ingresar con el usuario demo.
2. En el Dashboard, pulsar “Benito IA”.
3. Probar:
   - ¿Dónde está el Aula Digital?
   - Necesito el teléfono de la escuela.
   - ¿Cómo solicito un certificado?
   - Tengo una prueba y no sé estudiar.
   - ¿Dónde consulto las becas?
