window.BenitoLocalProvider={async generate(q,s){const r=window.BenitoIntentEngine.resolve(q,s),m=[];if(r.course){s.course=r.course;s.context='aula-digital';return{meta:r,messages:[window.BenitoResponseBuilder.course(r.course)]}}if(!s.profile&&r.inferredProfile&&s.inferredProfile!==r.inferredProfile){s.inferredProfile=r.inferredProfile;m.push(window.BenitoResponseBuilder.profile(r.inferredProfile))}if(r.entity){s.context=r.entity.id;m.push(window.BenitoResponseBuilder.entity(r.entity,window.BenitoRecommendationEngine.related(r.entity,s)))}else m.push(window.BenitoResponseBuilder.fallback());return{meta:r,messages:m}}};window.BenitoProvider={current(){
      const p=window.BENITO_IA_CONFIG.provider;
      if(p==='hybrid')return window.BenitoHybridProvider;
      if(p==='rag-local')return window.BenitoRAGLocalProvider;
      return window.BenitoLocalProvider;
    }};