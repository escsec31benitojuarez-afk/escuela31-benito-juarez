window.BenitoRAGLocalProvider={
  async generate(query,state){
    const policy=window.BenitoPolicyEngine.inspect(query);
    if(!policy.allowed){
      return{meta:{policy:policy.type},messages:[{
        title:'Derivación responsable',
        icon:'🛡️',
        badge:'Privacidad y cuidado',
        response:policy.message,
        actions:[{label:'Contacto institucional',href:'contacto.html'}]
      }]};
    }

    const answer=window.BenitoGroundedAnswer.generate(query,state);
    return{meta:{mode:'rag-local',confidence:answer.confidence},messages:[answer]};
  }
};