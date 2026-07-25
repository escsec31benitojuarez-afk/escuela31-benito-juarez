window.BenitoPedagogicalRecommender=(function(){
 function recommend(forecast){
  const rec=[];
  const f=forecast.forecast;
  if(f.failure_rate>=40)rec.push({action:'Evaluación formativa',reason:'La desaprobación proyectada permanece elevada.',priority:'high'});
  if(f.attendance<80)rec.push({action:'Tutoría y seguimiento de asistencia',reason:'La asistencia proyectada se mantiene por debajo del umbral preventivo.',priority:'high'});
  if(f.engagement<55)rec.push({action:'Agrupamientos flexibles y aprendizaje cooperativo',reason:'La participación proyectada es baja.',priority:'high'});
  if(f.digital_use<50)rec.push({action:'Recursos digitales multiformato',reason:'El uso de mediaciones digitales es limitado.',priority:'medium'});
  if(f.engagement>=55&&f.engagement<70)rec.push({action:'Gamificación pedagógica',reason:'Puede fortalecer participación y persistencia.',priority:'medium'});
  if(!rec.length)rec.push({action:'Sostener y documentar prácticas efectivas',reason:'Los indicadores proyectados no muestran deterioro significativo.',priority:'low'});
  return rec;
 }
 return{recommend};
})();