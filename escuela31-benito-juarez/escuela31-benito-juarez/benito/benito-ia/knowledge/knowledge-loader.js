window.BenitoKnowledgeStore=(function(){
  let data=null;
  async function load(){
    if(data)return data;
    try{
      const r=await fetch('benito-ia/knowledge/data/knowledge-base.json');
      if(!r.ok)throw new Error('No se pudo cargar la base');
      data=await r.json();
      return data;
    }catch(e){
      data={meta:{version:'fallback'},entities:window.BENITO_KNOWLEDGE||[]};
      return data;
    }
  }
  function get(){return data}
  function byId(id){return data?.entities?.find(x=>x.id===id)||null}
  function byModule(module){return (data?.entities||[]).filter(x=>x.module===module)}
  function pending(){return (data?.entities||[]).filter(x=>x.validation?.status!=='validado')}
  return{load,get,byId,byModule,pending};
})();