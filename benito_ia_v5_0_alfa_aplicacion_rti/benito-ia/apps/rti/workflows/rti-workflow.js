window.BenitoRTIWorkflow=(function(){
 function dailyBrief(state){
  const pending=state.tasks.filter(t=>t.status!=='done').sort((a,b)=>a.due.localeCompare(b.due));
  const critical=state.courses.filter(c=>c.status==='critical');
  return{
   headline:`${pending.length} tareas pendientes y ${critical.length} cursos críticos.`,
   nextTasks:pending.slice(0,3),
   priorityCourses:critical.slice(0,3),
   recommendation:'Priorizar tareas de alta urgencia, revisar evidencias y registrar los acuerdos adoptados.'
  };
 }
 return{dailyBrief};
})();