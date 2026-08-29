export function isInstitutionalDriveUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "drive.google.com" ? url.href : null;
  } catch {
    return null;
  }
}

export function buildTeacherSpaces(assignments, courseSubjects, courses, subjects) {
  const assignedIds = new Set((assignments || []).map((row) => row.course_subject_id).filter(Boolean));
  const coursesById = new Map((courses || []).map((row) => [row.id, row]));
  const subjectsById = new Map((subjects || []).map((row) => [row.id, row]));

  return (courseSubjects || [])
    .filter((row) => assignedIds.has(row.id))
    .map((row) => ({
      id: row.id,
      course_id: row.course_id,
      course_name: coursesById.get(row.course_id)?.name || "Curso",
      course_order: Number(coursesById.get(row.course_id)?.sort_order || 0),
      subject_name: subjectsById.get(row.subject_id)?.name || "Materia",
      subject_order: Number(row.sort_order || 0),
      resource_url: isInstitutionalDriveUrl(row.resource_url),
    }))
    .sort((a, b) => a.course_order - b.course_order || a.subject_order - b.subject_order || a.subject_name.localeCompare(b.subject_name, "es"));
}
