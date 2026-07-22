window.BenitoGroundedAnswer=(function(){
  function dedupe(results){
    const seen=new Set();
    return results.filter(x=>{
      const key=x.chunk.text.trim().toLowerCase();
      if(seen.has(key))return false;
      seen.add(key);return true;
    });
  }

  function generate(query,state={}){
    const results=window.BenitoRAGRetriever.search(query,{profile:state.profile,limit:6});
    const conf=window.BenitoRAGRetriever.confidence(results);
    const usable=dedupe(results).filter(x=>x.chunk.validation==='validado').slice(0,3);

    if(!usable.length){
      return {
        title:'No encontré información institucional validada',
        icon:'⚠️',
        badge:'Respuesta con trazabilidad',
        response:'La base disponible no contiene evidencia validada suficiente para responder con seguridad. Conviene revisar el Centro de Conocimiento o consultar directamente a la escuela.',
        confidence:conf,
        sources:[],
        suggestions:['Contacto','Centro de Conocimiento']
      };
    }

    const lead=usable[0].chunk;
    const paragraphs=usable.map(x=>x.chunk.text);
    const sources=[];
    usable.forEach(x=>{
      const s=x.chunk.source||{};
      const key=(s.label||'Fuente')+'|'+(s.location||'');
      if(!sources.some(y=>y.key===key))sources.push({key,label:s.label||'Fuente institucional',location:s.location||'interno'});
    });

    return {
      title:lead.title,
      icon:lead.icon||'📚',
      badge:'Respuesta fundamentada',
      response:paragraphs[0],
      bullets:paragraphs.slice(1),
      confidence:conf,
      sources,
      evidence:usable.map(x=>({chunkId:x.chunk.chunkId,score:x.score,validation:x.chunk.validation}))
    };
  }

  return{generate};
})();