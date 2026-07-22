window.BenitoScenarioEngine=(function(){
 const interventions={
  tutoring:{
   label:'Tutoría semanal',
   effects:{attendance:3,failure_rate:-6,engagement:8,digital_use:0},
   assumptions:['Frecuencia semanal sostenida','Participación docente y tutorial','Seguimiento durante al menos ocho semanas'],
   mechanism:'El acompañamiento frecuente puede mejorar la continuidad, la comprensión y la recuperación de aprendizajes.'
  },
  flexible_grouping:{
   label:'Agrupamientos flexibles',
   effects:{attendance:2,failure_rate:-5,engagement:10,digital_use:1},
   assumptions:['Criterios pedagógicos claros','Grupos revisables','Evaluación formativa frecuente'],
   mechanism:'La reorganización temporal de grupos permite ajustar apoyos y desafíos a necesidades heterogéneas.'
  },
  digital_multiformat:{
   label:'Recursos digitales multiformato',
   effects:{attendance:1,failure_rate:-3,engagement:9,digital_use:15},
   assumptions:['Acceso suficiente','Consignas claras','Recursos accesibles y relevantes'],
   mechanism:'La diversidad de formatos puede ampliar oportunidades de acceso, comprensión y participación.'
  },
  formative_assessment:{
   label:'Evaluación formativa',
   effects:{attendance:1,failure_rate:-7,engagement:7,digital_use:2},
   assumptions:['Retroalimentación frecuente','Criterios explícitos','Oportunidades de revisión'],
   mechanism:'La retroalimentación y la revisión permiten ajustar la enseñanza y el aprendizaje antes del cierre.'
  },
  gamification:{
   label:'Gamificación pedagógica',
   effects:{attendance:2,failure_rate:-2,engagement:12,digital_use:6},
   assumptions:['Propósito pedagógico explícito','Dinámicas no competitivas excluyentes','Seguimiento de participación'],
   mechanism:'Las dinámicas de reto, progreso y colaboración pueden fortalecer la participación y la persistencia.'
  }
 };
 function clamp(x){return Math.max(0,Math.min(100,x))}
 function simulate(base,type,intensity=1){
  const i=interventions[type];if(!i)throw new Error('Intervención no reconocida');
  intensity=Math.max(.25,Math.min(1.5,Number(intensity)||1));
  const result={};
  Object.entries(i.effects).forEach(([k,v])=>result[k]=clamp(Number(base[k]||0)+v*intensity));
  return{
   intervention:type,label:i.label,base,result,intensity,
   delta:Object.fromEntries(Object.keys(result).map(k=>[k,result[k]-Number(base[k]||0)])),
   assumptions:i.assumptions,mechanism:i.mechanism,
   confidence:Math.max(.55,.78-Math.abs(intensity-1)*.12),
   simulation:true
  };
 }
 return{interventions,simulate};
})();