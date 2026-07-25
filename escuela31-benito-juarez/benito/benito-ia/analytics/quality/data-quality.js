window.BenitoDataQuality=(function(){
 function validate(data){
  const issues=[],warnings=[];
  if(!data?.meta)issues.push('Falta metadata del conjunto.');
  if(data?.meta?.containsRealPersonalData)issues.push('El conjunto declara contener datos personales reales.');
  if(data?.meta?.nominalData)issues.push('El conjunto contiene datos nominales.');
  const seen=new Set();
  (data?.courses||[]).forEach((r,i)=>{
   ['course','cycle','students','attendance','failure_rate','three_plus','five_plus'].forEach(k=>{
    if(r[k]===undefined||r[k]===null)issues.push(`Cursos: fila ${i+1}, falta ${k}.`);
   });
   if(seen.has(r.course))issues.push(`Curso duplicado: ${r.course}.`);seen.add(r.course);
   if(r.students<0)issues.push(`Cantidad de estudiantes inválida en ${r.course}.`);
   if(r.attendance<0||r.attendance>100)issues.push(`Asistencia fuera de rango en ${r.course}.`);
   if(r.failure_rate<0||r.failure_rate>100)issues.push(`Desaprobación fuera de rango en ${r.course}.`);
   if(r.three_plus>r.students)issues.push(`3+ pendientes supera matrícula en ${r.course}.`);
   if(r.five_plus>r.three_plus)issues.push(`5+ pendientes supera 3+ pendientes en ${r.course}.`);
   if(r.students<5)warnings.push(`Grupo pequeño en ${r.course}: evitar porcentajes identificables.`);
  });
  return{valid:issues.length===0,issues,warnings,checkedAt:new Date().toISOString()};
 }
 return{validate};
})();