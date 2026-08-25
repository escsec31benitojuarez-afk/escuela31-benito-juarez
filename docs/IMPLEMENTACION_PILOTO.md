# Aula Digital Benito Juárez — Implementación del piloto 1.º A

## Estado de esta entrega

La V1.0.0 incluye la interfaz, el cliente de autenticación, protección de sesión, carga dinámica de materias, logout, estados de error, diseño responsive y el esquema Supabase con RLS. No se modificó el Portal público.

La conexión real queda deliberadamente pendiente porque todavía no se proporcionaron la URL pública de Supabase, la `anon key`, el UUID del usuario piloto ni los tres enlaces institucionales de Google Drive. No se inventaron esos datos.

## Activación paso a paso

1. Crear un proyecto Supabase desde la cuenta institucional de la escuela.
2. Abrir **SQL Editor** y ejecutar, en orden, `001_schema_and_rls.sql` y `002_pilot_1a.sql`.
3. En **Authentication → Users**, crear el usuario técnico `1a@auth.aula-digital.local`, asignar una contraseña fuerte y marcar el correo como confirmado. Ese correo no se presenta como correo institucional ni se muestra al estudiante; la pantalla utiliza el usuario simple `1A`.
4. Copiar el UUID generado para ese usuario.
5. Ejecutar la sentencia comentada al final de `002_pilot_1a.sql`, reemplazando `UUID_DEL_USUARIO_AUTH` por el UUID real.
6. En **Project Settings → API**, copiar únicamente la URL pública del proyecto y la clave pública `anon`. Nunca copiar `service_role`.
7. Reemplazar los dos valores pendientes en `public/aula-v1/js/config.js`.
8. Crear o confirmar tres carpetas Drive: Biología, Lengua y Literatura y Matemática dentro de 1.º Año A.
9. Configurarlas con acceso de solo lectura para estudiantes. Si se usa “Cualquier persona con el enlace”, no alojar datos personales ni sensibles.
10. Ejecutar los tres `update` de ejemplo de `002_pilot_1a.sql` con los enlaces reales.
11. Publicar temporalmente la carpeta `aula-v1` en una ruta independiente del Portal, sin sustituir todavía los accesos públicos actuales.

## Pruebas antes de escalar

- Ingreso correcto con `1A`.
- Contraseña incorrecta rechazada.
- Acceso directo a `curso.html` sin sesión redirigido.
- Perfil inactivo bloqueado con mensaje.
- La consulta devuelve solo 1.º Año A y tres materias.
- Los tres enlaces Drive abren en pestaña nueva.
- Cerrar sesión invalida y elimina la sesión del navegador.
- Error de conexión muestra mensaje y nunca una pantalla blanca.
- Recarga de `curso.html` mantiene la sesión válida.
- Navegación mediante teclado y foco visibles.
- Revisión en celular, Chrome y Edge.
- Confirmación de que no existe `service_role` en ningún archivo público.
- Verificación de RLS con un segundo usuario de otro curso antes de escalar.

## Criterio de continuidad

No cargar los otros siete cursos hasta completar todas las pruebas. El panel administrativo propio y el flujo docente permanecen fuera del piloto.
