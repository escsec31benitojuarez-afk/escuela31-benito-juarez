window.BenitoImpactEvaluator=(function(){
 function evaluate(intervention){
  const b=intervention.before,a=intervention.after;
  const changes={
   attendance:Number((a.attendance-b.attendance).toFixed(1)),
   failure_rate:Number((a.failure_rate-b.failure_rate).toFixed(1)),
   engagement:Number((a.engagement-b.engagement).toFixed(1))
  };
  let score=0;
  score+=Math.max(-10,Math.min(10,changes.attendance));
  score+=Math.max(-10,Math.min(10,-changes.failure_rate));
  score+=Math.max(-10,Math.min(10,changes.engagement));
  const assessment=score>=18?'impacto favorable alto':score>=8?'impacto favorable moderado':score>0?'impacto favorable leve':'sin evidencia favorable';
  return{
   id:intervention.id,name:intervention.name,target:intervention.target,
   changes,score,assessment,
   caveats:[
    'Comparación descriptiva, no causal.',
    'Datos sintéticos.',
    'Requiere triangulación con evidencias cualitativas.',
    'No permite atribuir por sí sola el cambio a la intervención.'
   ]
  };
 }
 function evaluateAll(data){return (data.interventions||[]).map(evaluate).sort((a,b)=>b.score-a.score)}
 return{evaluate,evaluateAll};
})();