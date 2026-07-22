# Fase 9 — Integración controlada con IAG

## Incorporaciones

- Proveedor híbrido.
- Simulador local de IAG.
- Adaptador para proveedor externo.
- Contrato OpenAPI.
- Constructor y validador de solicitudes.
- Respuestas obligatoriamente fundamentadas.
- Auditoría local anonimizada.
- Panel de configuración.
- Banco de evaluación.
- Caída segura hacia RAG local ante errores.

## Seguridad

La conexión externa está desactivada por defecto.

Las claves de API no deben incorporarse al navegador, archivos JavaScript ni repositorios públicos. La arquitectura prevista es:

Navegador → servidor institucional → proveedor de IAG.

## Estado

La interfaz y el flujo completo están listos para pruebas. La conexión real requiere un servidor institucional seguro.
