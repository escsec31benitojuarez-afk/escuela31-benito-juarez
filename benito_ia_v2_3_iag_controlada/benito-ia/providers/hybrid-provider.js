window.BenitoHybridProvider={
  async generate(query,state){
    const policy=window.BenitoPolicyEngine.inspect(query);
    if(!policy.allowed){
      window.BenitoAuditLog.add({type:'policy',query,status:'blocked',warnings:[policy.type]});
      return{meta:{policy:policy.type},messages:[{
        title:'Derivación responsable',icon:'🛡️',badge:'Privacidad y cuidado',
        response:policy.message,
        actions:[{label:'Contacto institucional',href:'contacto.html'}]
      }]};
    }

    const results=window.BenitoRAGRetriever.search(query,{profile:state.profile,limit:6});
    const ragConfidence=window.BenitoRAGRetriever.confidence(results);
    const request=window.BenitoAPIRequestBuilder.build(query,state,results);
    const C=window.BENITO_IA_CONFIG;

    let raw;
    try{
      if(C.iag.enabled&&C.iag.mode==='external'){
        raw=await window.BenitoIAGExternalProvider.generate(request);
      }else{
        raw=await window.BenitoIAGSimulationProvider.generate(request);
      }

      const check=window.BenitoAPIResponseValidator.validate(raw,request);
      if(!check.valid)throw new Error(check.errors.join(' '));

      const sources=(raw.citations||[]).map(id=>{
        const item=request.context.find(x=>x.chunkId===id);
        return item?{label:item.sourceLabel,location:item.source}:null;
      }).filter(Boolean);

      window.BenitoAuditLog.add({
        query,type:'generated',provider:raw.provider,confidence:raw.confidence,
        citations:raw.citations,warnings:raw.warnings,status:'ok'
      });

      return{
        meta:{mode:'hybrid',provider:raw.provider,ragConfidence},
        messages:[{
          title:results[0]?.chunk?.title||'Respuesta institucional',
          icon:results[0]?.chunk?.icon||'🤖',
          badge:C.iag.enabled?'Respuesta generada con IAG':'Simulación controlada de IAG',
          response:raw.answer,
          confidence:{
            level:raw.confidence>=.75?'alta':raw.confidence>=.48?'media':'baja',
            value:Math.round(raw.confidence*100)
          },
          sources,
          warnings:raw.warnings||[],
          evidence:raw.citations
        }]
      };
    }catch(error){
      window.BenitoAuditLog.add({query,type:'provider-error',status:'error',warnings:[error.message]});
      return window.BenitoRAGLocalProvider.generate(query,state);
    }
  }
};