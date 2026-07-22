# Fase 12 — Seguridad, Gobernanza y Acceso por Roles

La seguridad se implementa antes de los motores analítico y predictivo. Alfredo Esquivel dispone de dos perfiles: Propietario de la Plataforma/Superadministrador y RTI.

Incluye autenticación local de demostración, RBAC, clasificación de datos, sesiones, cambio de perfil, auditoría y áreas pública/privada.

## Limitación crítica
La autenticación incluida no es apta para producción ni para datos reales. Se requiere backend, HTTPS, hash de contraseñas, sesiones de servidor, autorización del lado servidor y auditoría centralizada.