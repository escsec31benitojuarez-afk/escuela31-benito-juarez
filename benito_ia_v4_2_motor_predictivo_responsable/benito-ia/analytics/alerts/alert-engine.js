window.BenitoAlerts=(function(){
 function build(data,config){
  const alerts=[];
  const risks=BenitoIndicators.courseRisk(data,config.alertThresholds);
  risks.filter(x=>x.level!=='stable').forEach(x=>alerts.push({
   id:'course-'+x.course,
   severity:x.level,
   scope:'course',
   title:`${x.course}: ${x.level==='critical'?'prioridad crítica':'requiere seguimiento'}`,
   detail:x.reasons.join(', '),
   recommendedAction:x.level==='critical'
    ?'Convocar revisión interdisciplinaria y definir intervención prioritaria.'
    :'Revisar indicadores y acordar seguimiento preventivo.',
   containsNominalData:false
  }));
  BenitoIndicators.subjectIndicators(data).filter(x=>x.rate>=config.alertThresholds.warningFailureRate).forEach(x=>alerts.push({
   id:'subject-'+x.subject+'-'+x.cycle,
   severity:x.rate>=config.alertThresholds.criticalFailureRate?'critical':'warning',
   scope:'subject',
   title:`${x.subject} · Ciclo ${x.cycle}`,
   detail:`Tasa sintética de desaprobación: ${x.rate} %.`,
   recommendedAction:'Analizar propuestas de enseñanza, evaluación y acompañamiento sin individualizar docentes.',
   containsNominalData:false
  }));
  return alerts.sort((a,b)=>(a.severity==='critical'?0:1)-(b.severity==='critical'?0:1));
 }
 return{build};
})();