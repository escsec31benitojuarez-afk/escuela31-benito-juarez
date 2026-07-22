window.BenitoAgentExecutor=(function(){
  function contribution(agent,workflow,ragResults){
    const evidence=(ragResults||[]).filter(x=>x.chunk.validation==='validado').slice(0,2).map(x=>x.chunk.text);
    const common={agentId:agent.id,agentName:agent.name,icon:agent.icon};
    const type=workflow.classification.type;
    const texts={
      trayectorias:'Conviene priorizar la situación según cantidad de materias, asistencia, curso y apoyos disponibles. La intervención debe combinar seguimiento, acuerdos y acompañamiento pedagógico.',
      tutor:'El plan debe ser concreto, gradual y revisable. Es preferible comenzar con pocas metas, recuperación activa y seguimiento semanal.',
      rti:'Los recursos digitales deben simplificar el acceso, organizar materiales y sostener el acompañamiento; no reemplazan la mediación docente.',
      docente:'La propuesta debe alinear propósito, actividad, evaluación y diversidad de formas de participación.',
      secretaria:'La orientación debe utilizar canales institucionales confirmados y evitar afirmar requisitos no validados.',
      directivos:'La decisión requiere responsables, tiempos, indicadores y un mecanismo de revisión.',
      familias:'La comunicación debe ser clara, breve y señalar cuándo corresponde contactar a la escuela.',
      documentos:'El producto debe incluir propósito, destinatarios, responsables, cronograma y criterios de seguimiento.',
      orquestador:'La consulta se resolverá integrando conocimiento institucional validado y derivación responsable.'
    };
    return{
      ...common,
      title:`Aporte de ${agent.name}`,
      text:texts[agent.id]||texts.orquestador,
      evidence
    };
  }
  async function execute(workflow,state={}){
    const results=window.BenitoRAGRetriever.search(workflow.query,{profile:state.profile,limit:8});
    return workflow.agents.map(a=>contribution(a,workflow,results));
  }
  return{execute};
})();