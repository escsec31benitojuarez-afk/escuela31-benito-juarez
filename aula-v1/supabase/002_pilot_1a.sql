-- Datos exclusivos del piloto 1.º Año A. No carga los demás cursos.
insert into public.courses (id, name, sort_order, active) values
  ('10000000-0000-4000-8000-000000000001', '1.º Año A', 1, true)
on conflict (id) do update set name = excluded.name, sort_order = excluded.sort_order, active = excluded.active;

insert into public.subjects (id, name, sort_order, active) values
  ('20000000-0000-4000-8000-000000000001', 'Biología', 1, true),
  ('20000000-0000-4000-8000-000000000002', 'Lengua y Literatura', 2, true),
  ('20000000-0000-4000-8000-000000000003', 'Matemática', 3, true)
on conflict (id) do update set name = excluded.name, sort_order = excluded.sort_order, active = excluded.active;

insert into public.course_subjects (id, course_id, subject_id, resource_url, active, sort_order) values
  ('30000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001',null,true,1),
  ('30000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000002',null,true,2),
  ('30000000-0000-4000-8000-000000000003','10000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000003',null,true,3)
on conflict (id) do update set active = excluded.active, sort_order = excluded.sort_order;

-- DESPUÉS de crear el usuario Auth 1a@auth.aula-digital.local, reemplazar el UUID:
-- insert into public.profiles (id, role, course_id, active, display_name)
-- values ('UUID_DEL_USUARIO_AUTH','student','10000000-0000-4000-8000-000000000001',true,'1.º Año A');

-- DESPUÉS de recibir los enlaces reales de Drive, completar únicamente cada URL:
-- update public.course_subjects set resource_url='https://drive.google.com/...' where id='30000000-0000-4000-8000-000000000001';
