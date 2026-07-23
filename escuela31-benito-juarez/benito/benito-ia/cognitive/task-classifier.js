window.BenitoTaskClassifier=(function(){
  const rules=[
    {type:'trajectory_support',score:9,patterns:['materias desaprobadas','muchas materias','inasistencias','riesgo escolar','trayectoria','abandono','repetir']},
    {type:'teaching_design',score:8,patterns:['secuencia didactica','actividad','rubrica','evaluacion','clase','dua','gamificacion']},
    {type:'institutional_planning',score:8,patterns:['plan institucional','proyecto institucional','jornada','acto patrio','cronograma','responsables']},
    {type:'digital_support',score:7,patterns:['moodle','aula digital','drive','recurso digital','podcast','video','infografia','iag']},
    {type:'administrative_guidance',score:7,patterns:['constancia','tramite','sage','beca','correo','telefono','secretaria']},
    {type:'document_generation',score:7,patterns:['nota institucional','comunicado','acta','informe','documento','certificado']},
    {type:'study_support',score:6,patterns:['estudiar','organizarme','recuperacion activa','cornell','concentracion','plan de estudio']}
  ];
  const normalize=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  function classify(query){
    const q=normalize(query);
    const scores=rules.map(r=>({
      type:r.type,
      score:r.patterns.reduce((s,p)=>s+(q.includes(p)?r.score:0),0),
      matches:r.patterns.filter(p=>q.includes(p))
    })).sort((a,b)=>b.score-a.score);
    const top=scores[0];
    return top&&top.score>0?{...top,confidence:Math.min(1,.45+top.matches.length*.18)}:{type:'general',score:1,matches:[],confidence:.3};
  }
  return{classify};
})();