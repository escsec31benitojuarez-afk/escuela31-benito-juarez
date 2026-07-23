window.BenitoTaskPlanner=(function(){
  const templates={
    trajectory_support:[
      ['Comprender la situación','trayectorias'],
      ['Identificar prioridades de acompañamiento','trayectorias'],
      ['Proponer un plan de estudio y seguimiento','tutor'],
      ['Vincular recursos institucionales y digitales','rti'],
      ['Definir cuándo intervenir humanamente','familias']
    ],
    teaching_design:[
      ['Precisar propósito, curso y contenido','docente'],
      ['Diseñar secuencia de aprendizaje','docente'],
      ['Incorporar metodología activa y DUA','docente'],
      ['Seleccionar recursos digitales','rti'],
      ['Construir evaluación y evidencias','documentos']
    ],
    institutional_planning:[
      ['Definir propósito y alcance','directivos'],
      ['Identificar responsables y destinatarios','directivos'],
      ['Construir cronograma','documentos'],
      ['Asignar recursos y canales digitales','rti'],
      ['Definir indicadores y seguimiento','directivos']
    ],
    digital_support:[
      ['Diagnosticar la necesidad','rti'],
      ['Elegir herramienta o recurso','rti'],
      ['Diseñar el flujo de uso','docente'],
      ['Preparar acompañamiento y contingencia','rti']
    ],
    administrative_guidance:[
      ['Identificar el trámite o necesidad','secretaria'],
      ['Verificar canal institucional','secretaria'],
      ['Explicar pasos y documentación','familias'],
      ['Derivar cuando corresponda','secretaria']
    ],
    document_generation:[
      ['Precisar tipo y destinatario','documentos'],
      ['Organizar estructura','documentos'],
      ['Redactar borrador institucional','documentos'],
      ['Revisar coherencia y datos','directivos']
    ],
    study_support:[
      ['Definir objetivo de estudio','tutor'],
      ['Organizar tiempo y materiales','tutor'],
      ['Aplicar recuperación activa','tutor'],
      ['Revisar resultados y ajustar','tutor']
    ],
    general:[
      ['Comprender la consulta','orquestador'],
      ['Buscar información institucional','orquestador'],
      ['Responder o derivar','orquestador']
    ]
  };
  function plan(classification,agents){
    const max=window.BENITO_IA_CONFIG.cognitive.maxPlanSteps||8;
    return (templates[classification.type]||templates.general).slice(0,max).map((x,i)=>({
      id:i+1,
      title:x[0],
      agentId:x[1],
      agentName:agents.find(a=>a.id===x[1])?.name||'Benito Orquestador',
      status:i===0?'ready':'pending'
    }));
  }
  return{plan};
})();