window.BenitoRTIDocuments=(function(){
 function header(title,audience){
  return `ESCUELA SECUNDARIA Nº 31 “BENITO JUÁREZ”\n${title.toUpperCase()}\nDestinatario: ${audience}\nFecha: ${new Date().toLocaleDateString('es-AR')}\n\n`;
 }
 function executive(state){
  const critical=state.courses.filter(c=>c.status==='critical');
  return header('Informe ejecutivo RTI','Rectoría y equipo directivo')+
`1. SITUACIÓN GENERAL\n
Se registran ${critical.length} cursos en situación crítica dentro del conjunto sintético analizado. Las principales señales se vinculan con asistencia inferior al umbral preventivo, concentración de desaprobaciones y necesidad de acompañamiento pedagógico y digital.\n
2. CURSOS PRIORIZADOS\n
${critical.map(c=>`- ${c.course}: asistencia ${c.attendance}%, desaprobación ${c.failure_rate}%. Acciones: ${c.actions.join(', ')}.`).join('\n')}\n
3. ACCIONES EN CURSO\n
${state.projects.map(p=>`- ${p.name}: ${p.progress}% de avance. Próximo hito: ${p.nextMilestone}.`).join('\n')}\n
4. RECOMENDACIONES\n
Se recomienda sostener el seguimiento quincenal, documentar las intervenciones, triangular indicadores cuantitativos con evidencias cualitativas y evitar decisiones automáticas basadas únicamente en datos agregados.\n
5. ACLARACIÓN\n
Este documento fue generado con datos sintéticos para validar el funcionamiento de Benito IA.`;
 }
 function courseReport(state,courseName){
  const c=state.courses.find(x=>x.course===courseName);if(!c)return 'Curso no encontrado.';
  return header(`Informe de seguimiento — ${c.course}`,'Asesoría Pedagógica, Tutoría y equipo docente')+
`1. DATOS AGREGADOS\n
Ciclo: ${c.cycle}\nEstado: ${c.status}\nAsistencia: ${c.attendance}%\nTasa de desaprobación: ${c.failure_rate}%\n
2. ACCIONES DEFINIDAS\n
${c.actions.map(a=>`- ${a}`).join('\n')}\n
3. RESPONSABILIDAD DE ACOMPAÑAMIENTO\n
${c.owner}\n
4. ORIENTACIONES\n
Se propone revisar las evidencias de participación, sostener intervenciones breves y evaluables, incorporar retroalimentación frecuente y registrar acuerdos para la siguiente reunión.\n
5. LIMITACIÓN\n
El informe utiliza datos sintéticos y agregados. No contiene ni infiere información nominal.`;
 }
 function teacherSupport(state,id){
  const d=state.teachers.find(x=>x.id===id);if(!d)return 'Registro no encontrado.';
  return header(`Registro de acompañamiento — ${d.alias}`,'RTI y Asesoría Pedagógica')+
`Área: ${d.area}\n
1. NECESIDADES IDENTIFICADAS\n${d.needs.map(x=>`- ${x}`).join('\n')}\n
2. ACUERDOS DE ACOMPAÑAMIENTO\n${d.agreements.map(x=>`- ${x}`).join('\n')}\n
3. PRÓXIMA REVISIÓN\n${d.nextReview}\n
4. ENFOQUE\nEste registro tiene finalidad de acompañamiento pedagógico y digital. No constituye evaluación de desempeño.`;
 }
 function download(name,text){
  const blob=new Blob([text],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);
 }
 return{executive,courseReport,teacherSupport,download};
})();