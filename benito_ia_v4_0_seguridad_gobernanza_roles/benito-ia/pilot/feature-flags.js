window.BenitoFeatureFlags=(function(){
  const KEY='benitoIA_v24_flags';
  const defaults={
    assistant:true,
    rag:true,
    iagSimulation:true,
    externalIAG:false,
    feedback:true,
    telemetry:true,
    discovery:true,
    knowledgeAdmin:true
  };
  function load(){
    try{return {...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch(e){return {...defaults}}
  }
  function save(flags){localStorage.setItem(KEY,JSON.stringify({...defaults,...flags}))}
  function enabled(name){return !!load()[name]}
  function reset(){localStorage.removeItem(KEY)}
  return{load,save,enabled,reset,defaults};
})();