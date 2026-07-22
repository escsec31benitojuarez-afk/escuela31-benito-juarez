window.BenitoWorkflowEngine=(function(){
  function execute(query,state={}){
    const classification=window.BenitoTaskClassifier.classify(query);
    const agents=window.BenitoAgentRouter.route(classification,query,state);
    const plan=window.BenitoTaskPlanner.plan(classification,agents);
    const memory=window.BenitoAuthorizedMemory.context();
    return{
      id:'wf-'+Date.now(),
      createdAt:new Date().toISOString(),
      query,
      classification,
      agents,
      plan,
      memory,
      status:'planned'
    };
  }
  return{execute};
})();