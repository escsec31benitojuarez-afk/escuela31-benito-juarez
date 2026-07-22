window.BenitoRAGExport=(function(){
  function build(knowledge){
    return {
      meta:{
        generatedAt:new Date().toISOString(),
        sourceVersion:knowledge.meta?.version||'desconocida',
        institution:knowledge.meta?.institution||''
      },
      chunks:window.BenitoRAGChunker.all(knowledge.entities||[])
    };
  }
  return{build};
})();