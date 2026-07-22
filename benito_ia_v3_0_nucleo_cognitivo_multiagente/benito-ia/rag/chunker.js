window.BenitoRAGChunker=(function(){
  function chunks(entity){
    const parts=[];
    if(entity.summary)parts.push(entity.summary);
    if(entity.details)parts.push(...entity.details);
    if(entity.steps)parts.push(...entity.steps);
    return parts.map((text,index)=>({
      chunkId:`${entity.id}-${index+1}`,
      entityId:entity.id,
      module:entity.module,
      title:entity.title,
      text,
      source:entity.sources?.[0]?.location||'interno',
      validated:entity.validation?.status==='validado'
    }));
  }
  function all(entities){return entities.flatMap(chunks)}
  return{chunks,all};
})();