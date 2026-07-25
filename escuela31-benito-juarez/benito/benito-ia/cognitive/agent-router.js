window.BenitoAgentRouter=(function(){
  const map={
    trajectory_support:['trayectorias','tutor','rti','familias'],
    teaching_design:['docente','rti','documentos'],
    institutional_planning:['directivos','documentos','rti'],
    digital_support:['rti','docente'],
    administrative_guidance:['secretaria','familias'],
    document_generation:['documentos','directivos'],
    study_support:['tutor','rti'],
    general:['orquestador']
  };
  function catalog(){
    return window.BENITO_AGENT_CATALOG?.agents||[];
  }
  function route(classification,query,state={}){
    const ids=map[classification.type]||map.general;
    const max=window.BENITO_IA_CONFIG.cognitive.maxAgentsPerTask||4;
    return ids.slice(0,max).map(id=>catalog().find(a=>a.id===id)).filter(Boolean);
  }
  return{route,catalog};
})();