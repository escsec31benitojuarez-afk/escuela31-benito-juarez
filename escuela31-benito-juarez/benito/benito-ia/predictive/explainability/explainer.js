window.BenitoExplainer=(function(){
 function trendExplanation(item){
  const factors=[];
  if(item.slopes.failure_rate>1)factors.push({factor:'Desaprobación',effect:'aumenta',weight:Math.abs(item.slopes.failure_rate)});
  if(item.slopes.attendance<-1)factors.push({factor:'Asistencia',effect:'desciende',weight:Math.abs(item.slopes.attendance)});
  if(item.slopes.engagement<-1)factors.push({factor:'Participación',effect:'desciende',weight:Math.abs(item.slopes.engagement)});
  if(item.slopes.digital_use>1)factors.push({factor:'Uso digital',effect:'aumenta',weight:Math.abs(item.slopes.digital_use)});
  if(!factors.length)factors.push({factor:'Indicadores',effect:'sin variaciones relevantes',weight:0});
  return{
   summary:item.direction==='worsening'
    ?`${item.course} muestra una tendencia institucional desfavorable.`
    :item.direction==='improving'
      ?`${item.course} muestra una tendencia institucional favorable.`
      :`${item.course} mantiene una tendencia relativamente estable.`,
   factors:factors.sort((a,b)=>b.weight-a.weight),
   confidence:item.confidence,
   limitations:[
    'La proyección usa una serie sintética corta.',
    'No identifica estudiantes.',
    'No considera factores cualitativos ni contextuales no cargados.',
    'No debe utilizarse para decisiones automáticas.'
   ]
  };
 }
 function scenarioExplanation(scenario){
  return{
   assumptions:scenario.assumptions,
   mechanism:scenario.mechanism,
   confidence:scenario.confidence,
   warning:'La simulación representa un escenario hipotético, no una predicción causal.'
  };
 }
 return{trendExplanation,scenarioExplanation};
})();