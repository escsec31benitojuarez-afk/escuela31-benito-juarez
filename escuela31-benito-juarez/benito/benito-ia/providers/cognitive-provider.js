window.BenitoCognitiveProvider={
  async generate(query,state){
    const policy=window.BenitoPolicyEngine.inspect(query);
    if(!policy.allowed)return window.BenitoHybridProvider.generate(query,state);

    const workflow=window.BenitoWorkflowEngine.execute(query,state);
    const contributions=await window.BenitoAgentExecutor.execute(workflow,state);
    const integrated=window.BenitoIntegratedResponse.build(workflow,contributions);

    window.BenitoTelemetry?.add('multiagent',{
      query,
      profile:state.profile||state.inferredProfile,
      provider:'cognitive-multiagent',
      confidence:workflow.classification.confidence,
      success:true,
      sourceCount:integrated.evidenceSummary.length
    });

    return{
      meta:{
        mode:'cognitive-multiagent',
        workflow,
        agents:workflow.agents.map(a=>a.id)
      },
      messages:[integrated]
    };
  }
};