-- Ejecutar conectado como cada usuario desde un cliente autenticado, no con service_role.
select id, role, course_id, active, display_name from public.profiles;
select id, name, active from public.courses order by sort_order;
select cs.id, cs.course_id, s.name, cs.resource_url
from public.course_subjects cs join public.subjects s on s.id = cs.subject_id
order by cs.sort_order;
-- Resultado esperado para 1A: un perfil propio, un curso y exactamente tres materias.
