# Arquitectura segura para la conexión real

## Componentes

1. Navegador del usuario.
2. Endpoint institucional protegido.
3. Recuperador de conocimiento validado.
4. Proveedor de IAG.
5. Registro técnico y control de calidad.

## Flujo

1. El navegador envía la consulta al servidor institucional.
2. El servidor elimina o bloquea datos sensibles.
3. El servidor recupera fragmentos validados.
4. El proveedor genera una respuesta usando únicamente esos fragmentos.
5. El servidor valida citas y estructura.
6. La respuesta vuelve al usuario.
7. Se registra únicamente información técnica anonimizada.

## Requisitos antes de publicar

- Hosting seguro.
- Variables de entorno.
- Control de acceso.
- Límites de uso.
- Política de privacidad.
- Consentimiento institucional.
- Evaluación de calidad.
- Procedimiento de incidentes.
