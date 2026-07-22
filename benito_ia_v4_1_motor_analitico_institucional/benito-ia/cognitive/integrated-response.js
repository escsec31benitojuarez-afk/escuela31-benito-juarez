window.BenitoIntegratedResponse=(function(){
  function build(workflow,contributions){
    const evidence=[];
    contributions.forEach(c=>(c.evidence||[]).forEach(x=>{if(!evidence.includes(x))evidence.push(x)}));
    const steps=workflow.plan.map(s=>`${s.id}. ${s.title} — ${s.agentName}`);
    return{
      title:'Plan coordinado por Benito IA',
      icon:'🧭',
      badge:'Sistema Multiagente Institucional',
      response:`La consulta fue clasificada como “${workflow.classification.type.replaceAll('_',' ')}” y se coordinó mediante ${workflow.agents.length} agentes especializados.`,
      bullets:steps,
      agentContributions:contributions,
      evidenceSummary:evidence.slice(0,4),
      workflowId:workflow.id
    };
  }
  return{build};
})();