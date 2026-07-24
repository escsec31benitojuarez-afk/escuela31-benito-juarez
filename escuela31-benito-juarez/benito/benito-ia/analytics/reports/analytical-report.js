window.BenitoAnalyticalReport=(function(){
 function generate(data,config){
  const inst=BenitoIndicators.institutional(data);
  const cycles=BenitoIndicators.byCycle(data);
  const risks=BenitoIndicators.courseRisk(data,config.alertThresholds);
  const subjects=BenitoIndicators.subjectIndicators(data);
  const trend=BenitoIndicators.trend(data);
  return{
   title:'Informe analítico institucional — Datos sintéticos',
   generatedAt:new Date().toISOString(),
   disclaimer:'Este informe utiliza exclusivamente datos ficticios para validar el funcionamiento del motor.',
   executiveSummary:{
    totalStudents:inst.totalStudents,
    totalCourses:inst.totalCourses,
    attendance:inst.attendance,
    failureRate:inst.failureRate,
    priorityCourses:risks.filter(x=>x.level==='critical').map(x=>x.course),
    warningCourses:risks.filter(x=>x.level==='warning').map(x=>x.course),
    criticalSubjects:subjects.filter(x=>x.rate>=config.alertThresholds.criticalFailureRate).map(x=>`${x.subject} (${x.cycle})`)
   },
   cycles,trend,
   principles:[
    'No identifica estudiantes.',
    'No evalúa individualmente a docentes.',
    'No produce decisiones automáticas.',
    'Las alertas requieren interpretación profesional.',
    'Los datos reales solo podrán incorporarse en infraestructura segura.'
   ]
  };
 }
 return{generate};
})();