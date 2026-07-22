window.BenitoAPIRequestBuilder=(function(){
  function build(query,state,results){
    const C=window.BENITO_IA_CONFIG;
    const limit=C.iag.maxContextChunks||5;
    const context=(results||[]).slice(0,limit).map(x=>({
      chunkId:x.chunk.chunkId,
      text:x.chunk.text,
      source:x.chunk.source?.location||'interno',
      sourceLabel:x.chunk.source?.label||'Fuente institucional',
      validated:x.chunk.validation==='validado',
      score:x.score
    }));

    return{
      query,
      profile:state.profile||state.inferredProfile||null,
      course:state.course||null,
      context,
      policy:{
        mustGround:true,
        mustCite:true,
        allowPersonalData:false,
        minimumConfidence:C.iag.minimumRagConfidence
      },
      client:{
        version:C.version,
        locale:'es-AR'
      }
    };
  }
  return{build};
})();